"use client";

import { motion } from "framer-motion";
import { ExternalLink, Clock, Tag } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { formatRelativeTime } from "@/lib/utils/formatters";
import type { NewsArticle } from "@/lib/api/newsParser";

interface NewsCardProps {
  article: NewsArticle;
  index?: number;
  compact?: boolean;
}

const categoryColors: Record<string, string> = {
  military: "bg-critical/15 text-critical border-critical/30",
  economics: "bg-warning/15 text-warning border-warning/30",
  shipping: "bg-accent/15 text-accent border-accent/30",
  diplomacy: "bg-info/15 text-info border-info/30",
  general: "bg-bg-tertiary text-text-secondary border-border",
};

const categoryLabels: Record<string, string> = {
  military: "Military",
  economics: "Economics",
  shipping: "Shipping",
  diplomacy: "Diplomacy",
  general: "General",
};

export default function NewsCard({ article, index = 0, compact = false }: NewsCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className={cn(
        "glass-card overflow-hidden group",
        compact ? "p-3" : "p-5"
      )}
    >
      {/* Breaking badge */}
      {article.isBreaking && (
        <div className="flex items-center gap-2 mb-3">
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-critical/20 text-critical text-xs font-bold uppercase tracking-wider">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-critical opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-critical" />
            </span>
            Breaking
          </span>
          <span className="text-xs text-text-muted flex items-center gap-1">
            <Clock className="h-3 w-3" />
            {formatRelativeTime(article.pubDate)}
          </span>
        </div>
      )}

      {/* Category + Time (non-breaking) */}
      {!article.isBreaking && (
        <div className="flex items-center gap-2 mb-3">
          <span
            className={cn(
              "inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium border",
              categoryColors[article.category]
            )}
          >
            <Tag className="h-3 w-3" />
            {categoryLabels[article.category]}
          </span>
          <span className="text-xs text-text-muted flex items-center gap-1">
            <Clock className="h-3 w-3" />
            {formatRelativeTime(article.pubDate)}
          </span>
        </div>
      )}

      {/* Title */}
      <h3
        className={cn(
          "font-semibold text-text-primary group-hover:text-accent transition-colors leading-snug",
          compact ? "text-sm mb-2" : "text-base mb-3"
        )}
      >
        {article.title}
      </h3>

      {/* Excerpt */}
      {!compact && article.excerpt && (
        <p className="text-sm text-text-secondary leading-relaxed mb-4 line-clamp-3">
          {article.excerpt}
        </p>
      )}

      {/* Footer */}
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium text-text-muted">
          {article.source}
        </span>
        <a
          href={article.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-xs font-medium text-accent hover:text-accent-hover transition-colors"
        >
          Read More
          <ExternalLink className="h-3 w-3" />
        </a>
      </div>
    </motion.article>
  );
}
