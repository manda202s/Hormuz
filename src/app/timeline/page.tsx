"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Clock, Search, Download, Filter } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { timelineEvents, getEventsByCategory, searchEvents } from "@/lib/constants/timeline";
import EventCard from "@/components/timeline/EventCard";

const categories = [
  { value: "all", label: "All Events", color: "text-text-primary" },
  { value: "military", label: "Military", color: "text-critical" },
  { value: "diplomatic", label: "Diplomatic", color: "text-info" },
  { value: "economic", label: "Economic", color: "text-warning" },
  { value: "incident", label: "Incidents", color: "text-text-secondary" },
  { value: "deescalation", label: "De-escalation", color: "text-normal" },
];

export default function TimelinePage() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [query, setQuery] = useState("");
  const [showCount, setShowCount] = useState(15);

  const filteredEvents = useMemo(() => {
    let events = query
      ? searchEvents(query)
      : getEventsByCategory(selectedCategory);
    return events.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
  }, [selectedCategory, query]);

  const visibleEvents = filteredEvents.slice(0, showCount);

  const handleExport = () => {
    const json = JSON.stringify(timelineEvents, null, 2);
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "hormuz-timeline.json";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex items-center gap-3 mb-3">
          <Clock className="h-8 w-8 text-accent" />
          <h1 className="text-3xl font-bold text-text-primary">
            Crisis Timeline
          </h1>
        </div>
        <p className="text-text-secondary max-w-2xl">
          Chronological record of key events in the Strait of Hormuz crisis.
          {" "}
          <span className="font-mono text-accent">
            {timelineEvents.length}
          </span>{" "}
          events documented.
        </p>
      </motion.div>

      {/* Filters */}
      <div className="glass-card-static p-4 mb-8">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-muted" />
            <input
              type="text"
              placeholder="Search events..."
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setShowCount(15);
              }}
              className="w-full pl-9 pr-3 py-2 rounded-lg bg-bg-tertiary/50 border border-border text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent transition-colors"
            />
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap gap-1.5">
            {categories.map((cat) => (
              <button
                key={cat.value}
                onClick={() => {
                  setSelectedCategory(cat.value);
                  setQuery("");
                  setShowCount(15);
                }}
                className={cn(
                  "px-3 py-1.5 rounded-lg text-xs font-medium transition-all",
                  selectedCategory === cat.value
                    ? "bg-accent/10 text-accent border border-accent/30"
                    : "text-text-secondary hover:bg-bg-tertiary/50 border border-transparent"
                )}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Export */}
          <button
            onClick={handleExport}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-text-secondary hover:bg-bg-tertiary/50 border border-border transition-colors flex-shrink-0"
          >
            <Download className="h-3.5 w-3.5" />
            Export
          </button>
        </div>
      </div>

      {/* Results count */}
      <div className="flex items-center gap-2 mb-6 text-sm text-text-muted">
        <Filter className="h-4 w-4" />
        Showing {visibleEvents.length} of {filteredEvents.length} events
      </div>

      {/* Timeline */}
      <div className="relative">
        {visibleEvents.map((event, i) => (
          <EventCard key={event.id} event={event} index={i} />
        ))}

        {/* Load More */}
        {showCount < filteredEvents.length && (
          <div className="flex justify-center py-8">
            <button
              onClick={() => setShowCount((c) => c + 10)}
              className="px-6 py-2.5 rounded-lg bg-bg-tertiary/50 text-text-primary text-sm font-medium hover:bg-bg-tertiary border border-border transition-colors"
            >
              Load More Events ({filteredEvents.length - showCount} remaining)
            </button>
          </div>
        )}

        {filteredEvents.length === 0 && (
          <div className="text-center py-12">
            <p className="text-text-muted">
              No events found matching your criteria.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
