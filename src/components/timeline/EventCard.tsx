"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils/cn";
import { formatDate } from "@/lib/utils/formatters";
import { getCategoryColor } from "@/lib/utils/formatters";
import { ExternalLink } from "lucide-react";
import type { TimelineEvent } from "@/lib/constants/timeline";

interface EventCardProps {
  event: TimelineEvent;
  index?: number;
}

const categoryIcons: Record<string, string> = {
  military: "🔴",
  diplomatic: "🔵",
  economic: "🟡",
  incident: "⚪",
  deescalation: "🟢",
};

const categoryLabels: Record<string, string> = {
  military: "Military",
  diplomatic: "Diplomatic",
  economic: "Economic",
  incident: "Incident",
  deescalation: "De-escalation",
};

const severityStyles: Record<string, string> = {
  critical: "border-l-critical",
  high: "border-l-warning",
  medium: "border-l-info",
  low: "border-l-normal",
};

export default function EventCard({ event, index = 0 }: EventCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="relative flex gap-4 md:gap-8"
    >
      {/* Date column */}
      <div className="hidden md:flex flex-col items-end w-32 flex-shrink-0 pt-1">
        <span className="text-sm font-semibold text-text-primary">
          {formatDate(event.date, "MMM dd")}
        </span>
        <span className="text-xs text-text-muted">
          {formatDate(event.date, "yyyy")}
        </span>
      </div>

      {/* Timeline dot + line */}
      <div className="flex flex-col items-center flex-shrink-0">
        <div
          className="w-4 h-4 rounded-full border-2 border-bg-primary z-10 flex-shrink-0"
          style={{
            backgroundColor: getCategoryColor(event.category),
            boxShadow: `0 0 8px ${getCategoryColor(event.category)}66`,
          }}
        />
        <div className="w-0.5 flex-1 bg-border -mt-0.5" />
      </div>

      {/* Content card */}
      <div
        className={cn(
          "glass-card p-4 mb-6 flex-1 border-l-4",
          severityStyles[event.severity]
        )}
      >
        {/* Mobile date */}
        <div className="md:hidden text-xs text-text-muted mb-2">
          {formatDate(event.date, "MMM dd, yyyy")}
        </div>

        {/* Header */}
        <div className="flex items-start justify-between gap-3 mb-2">
          <div className="flex items-center gap-2">
            <span className="text-base">{categoryIcons[event.category]}</span>
            <span
              className="text-xs font-semibold uppercase tracking-wider"
              style={{ color: getCategoryColor(event.category) }}
            >
              {categoryLabels[event.category]}
            </span>
          </div>
          <span
            className={cn(
              "text-xs font-semibold px-2 py-0.5 rounded-full uppercase",
              event.severity === "critical" && "status-critical",
              event.severity === "high" && "status-warning",
              event.severity === "medium" && "bg-info/15 text-info border border-info/30",
              event.severity === "low" && "status-normal"
            )}
          >
            {event.severity}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-base font-semibold text-text-primary mb-2 leading-snug">
          {event.title}
        </h3>

        {/* Description */}
        <p className="text-sm text-text-secondary leading-relaxed mb-3">
          {event.description}
        </p>

        {/* Footer */}
        <div className="flex items-center justify-between">
          <div className="flex flex-wrap gap-1">
            {event.relatedCountries.slice(0, 4).map((code) => (
              <span
                key={code}
                className="text-xs px-1.5 py-0.5 rounded bg-bg-tertiary/50 text-text-muted"
              >
                {code}
              </span>
            ))}
          </div>
          <div className="flex items-center gap-1 text-xs text-text-muted">
            <span>{event.source}</span>
            {event.sourceUrl && (
              <a
                href={event.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent hover:text-accent-hover transition-colors"
              >
                <ExternalLink className="h-3 w-3" />
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
