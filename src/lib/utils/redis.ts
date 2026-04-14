/**
 * Redis caching utility with in-memory fallback
 * Uses Upstash Redis when configured, falls back to a simple Map cache
 */

// In-memory cache fallback
const memoryCache = new Map<string, { value: string; expiresAt: number }>();

function getFromMemory(key: string): string | null {
  const entry = memoryCache.get(key);
  if (!entry) return null;
  if (Date.now() > entry.expiresAt) {
    memoryCache.delete(key);
    return null;
  }
  return entry.value;
}

function setInMemory(key: string, value: string, ttlSeconds: number): void {
  memoryCache.set(key, {
    value,
    expiresAt: Date.now() + ttlSeconds * 1000,
  });
}

let redisClient: {
  get: (key: string) => Promise<string | null>;
  setex: (key: string, seconds: number, value: string) => Promise<string>;
} | null = null;

async function getRedisClient() {
  if (redisClient) return redisClient;

  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;

  if (url && token) {
    try {
      const { Redis } = await import("@upstash/redis");
      const redis = new Redis({ url, token });
      redisClient = {
        get: (key: string) => redis.get(key) as Promise<string | null>,
        setex: (key: string, seconds: number, value: string) =>
          redis.setex(key, seconds, value) as Promise<string>,
      };
      return redisClient;
    } catch {
      console.warn("Failed to initialize Redis, using in-memory cache");
    }
  }

  return null;
}

/**
 * Get a cached value
 */
export async function cacheGet<T>(key: string): Promise<T | null> {
  try {
    const redis = await getRedisClient();
    if (redis) {
      const value = await redis.get(key);
      if (value) {
        return typeof value === "string" ? JSON.parse(value) : (value as T);
      }
      return null;
    }
  } catch {
    // Fall through to memory cache
  }

  const memValue = getFromMemory(key);
  if (memValue) {
    return JSON.parse(memValue) as T;
  }
  return null;
}

/**
 * Set a cached value with TTL
 */
export async function cacheSet(
  key: string,
  value: unknown,
  ttlSeconds: number
): Promise<void> {
  const serialized = JSON.stringify(value);

  try {
    const redis = await getRedisClient();
    if (redis) {
      await redis.setex(key, ttlSeconds, serialized);
      return;
    }
  } catch {
    // Fall through to memory cache
  }

  setInMemory(key, serialized, ttlSeconds);
}
