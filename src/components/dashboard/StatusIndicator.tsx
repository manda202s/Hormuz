"use client";

import { cn } from "@/lib/utils/cn";
import { AlertTriangle, CheckCircle, AlertCircle } from "lucide-react";

interface StatusIndicatorProps {
  status: "critical" | "warning" | "normal";
  label: string;
  size?: "sm" | "md" | "lg";
  showPulse?: boolean;
  className?: string;
}

export default function StatusIndicator({
  status,
  label,
  size = "md",
  showPulse = true,
  className,
}: StatusIndicatorProps) {
  const Icon =
    status === "critical"
      ? AlertTriangle
      : status === "warning"
        ? AlertCircle
        : CheckCircle;

  const sizes = {
    sm: "px-2 py-0.5 text-xs gap-1.5",
    md: "px-3 py-1.5 text-sm gap-2",
    lg: "px-4 py-2 text-base gap-2.5",
  };

  const iconSizes = {
    sm: "h-3 w-3",
    md: "h-4 w-4",
    lg: "h-5 w-5",
  };

  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full font-semibold uppercase tracking-wider",
        sizes[size],
        status === "critical" && "status-critical",
        status === "warning" && "status-warning",
        status === "normal" && "status-normal",
        className
      )}
    >
      <Icon className={iconSizes[size]} />
      <span>{label}</span>
      {showPulse && (
        <span className="relative flex h-2 w-2">
          <span
            className={cn(
              "absolute inline-flex h-full w-full animate-ping rounded-full opacity-75",
              status === "critical" && "bg-critical",
              status === "warning" && "bg-warning",
              status === "normal" && "bg-normal"
            )}
          />
          <span
            className={cn(
              "relative inline-flex h-2 w-2 rounded-full",
              status === "critical" && "bg-critical",
              status === "warning" && "bg-warning",
              status === "normal" && "bg-normal"
            )}
          />
        </span>
      )}
    </div>
  );
}
