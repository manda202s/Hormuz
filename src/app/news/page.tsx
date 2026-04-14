"use client";

import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { motion } from "framer-motion";
import { Newspaper, RefreshCw } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import NewsCard from "@/components/news/NewsCard";

const categoryFilters = [
  { value: "all", label: "All" },
  { value: "military", label: "Military" },
  { value: "economics", label: "Economics" },
  { value: "shipping", label: "Shipping" },
  { value: "diplomacy", label: "Diplomacy" },
];

interface NewsResponse {
  articles: Array<{
    id: string;
    title: string;
    excerpt: string;
    url: string;
    source: string;
    category: "military" | "economics" | "shipping" | "diplomacy" | "general";
    pubDate: string;
    isBreaking: boolean;
  }>;
}

export default function NewsPage() {
  const [selectedCategory, setSelectedCategory] = useState("all");

  const {
    data,
    isLoading,
    isFetching,
    refetch,
  } = useQuery<NewsResponse>({
    queryKey: ["news"],
    queryFn: () => fetch("/api/news").then((r) => r.json()),
  });

  const articles = data?.articles || [];
  const filtered =
    selectedCategory === "all"
      ? articles
      : articles.filter((a) => a.category === selectedCategory);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <Newspaper className="h-8 w-8 text-accent" />
              <h1 className="text-3xl font-bold text-text-primary">
                News Feed
              </h1>
            </div>
            <p className="text-text-secondary">
              Aggregated from Reuters, Bloomberg, AP News, and maritime sources.
              Auto-updated every 60 seconds.
            </p>
          </div>
          <button
            onClick={() => refetch()}
            disabled={isFetching}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-bg-tertiary/50 text-text-secondary text-sm font-medium hover:bg-bg-tertiary border border-border transition-colors disabled:opacity-50"
          >
            <RefreshCw
              className={cn("h-4 w-4", isFetching && "animate-spin")}
            />
            Refresh
          </button>
        </div>
      </motion.div>

      {/* Category Filters */}
      <div className="flex flex-wrap gap-2 mb-8">
        {categoryFilters.map((cat) => (
          <button
            key={cat.value}
            onClick={() => setSelectedCategory(cat.value)}
            className={cn(
              "px-4 py-2 rounded-lg text-sm font-medium transition-all",
              selectedCategory === cat.value
                ? "bg-accent/10 text-accent border border-accent/30"
                : "text-text-secondary hover:bg-bg-tertiary/50 border border-transparent"
            )}
          >
            {cat.label}
            {cat.value !== "all" && (
              <span className="ml-1.5 text-xs text-text-muted font-mono">
                {articles.filter((a) => a.category === cat.value).length}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="glass-card-static p-5">
              <div className="skeleton h-4 w-20 mb-3" />
              <div className="skeleton h-5 w-full mb-2" />
              <div className="skeleton h-5 w-3/4 mb-3" />
              <div className="skeleton h-16 w-full mb-4" />
              <div className="flex justify-between">
                <div className="skeleton h-3 w-16" />
                <div className="skeleton h-3 w-20" />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* News Grid */}
      {!isLoading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((article, i) => (
            <NewsCard key={article.id} article={article} index={i} />
          ))}
        </div>
      )}

      {/* No results */}
      {!isLoading && filtered.length === 0 && (
        <div className="text-center py-12">
          <p className="text-text-muted text-lg">
            No articles found in this category.
          </p>
        </div>
      )}
    </div>
  );
}
