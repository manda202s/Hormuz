"use client";

import { type ReactNode } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils/cn";
import { TrendingUp, TrendingDown, Minus, type LucideIcon } from "lucide-react";

interface MetricCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  change?: number;
  changeLabel?: string;
  icon?: LucideIcon;
  trend?: "up" | "down" | "flat";
  trendColor?: "positive" | "negative" | "neutral";
  onClick?: () => void;
  className?: string;
  children?: ReactNode;
  delay?: number;
}

export default function MetricCard({
  title,
  value,
  subtitle,
  change,
  changeLabel,
  icon: Icon,
  trend,
  trendColor = "neutral",
  onClick,
  className,
  children,
  delay = 0,
}: MetricCardProps) {
  const TrendIcon =
    trend === "up" ? TrendingUp : trend === "down" ? TrendingDown : Minus;

  const trendColors = {
    positive: "text-normal",
    negative: "text-critical",
    neutral: "text-text-secondary",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: delay * 0.1 }}
      onClick={onClick}
      className={cn(
        "glass-card p-5",
        onClick && "cursor-pointer",
        className
      )}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          {Icon && (
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent/10 text-accent">
              <Icon className="h-4.5 w-4.5" />
            </div>
          )}
          <span className="text-sm font-medium text-text-secondary">
            {title}
          </span>
        </div>
        {trend && change !== undefined && (
          <div
            className={cn(
              "flex items-center gap-1 text-xs font-semibold",
              trendColors[trendColor]
            )}
          >
            <TrendIcon className="h-3.5 w-3.5" />
            <span>
              {change > 0 ? "+" : ""}
              {typeof change === "number" ? change.toFixed(1) : change}%
            </span>
          </div>
        )}
      </div>

      <div className="mb-1">
        <span className="text-2xl font-bold font-mono tracking-tight text-text-primary">
          {value}
        </span>
        {changeLabel && (
          <span className="text-xs text-text-muted ml-2">{changeLabel}</span>
        )}
      </div>

      {subtitle && (
        <p className="text-xs text-text-muted">{subtitle}</p>
      )}

      {children && <div className="mt-3">{children}</div>}
    </motion.div>
  );
}
