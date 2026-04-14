"use client";

import {
  ResponsiveContainer,
  AreaChart,
  Area,
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

interface LiveChartProps {
  data: Record<string, unknown>[];
  type?: "area" | "line" | "bar";
  dataKey: string;
  xKey?: string;
  color?: string;
  gradientId?: string;
  height?: number;
  showGrid?: boolean;
  showAxis?: boolean;
  showTooltip?: boolean;
  strokeWidth?: number;
}

export default function LiveChart({
  data,
  type = "area",
  dataKey,
  xKey = "date",
  color = "#06B6D4",
  gradientId,
  height = 200,
  showGrid = true,
  showAxis = true,
  showTooltip = true,
  strokeWidth = 2,
}: LiveChartProps) {
  const id = gradientId || `gradient-${dataKey}-${color.replace("#", "")}`;

  const commonProps = {
    data,
    margin: { top: 5, right: 5, bottom: 5, left: showAxis ? 40 : 5 },
  };

  const tooltipStyle = {
    contentStyle: {
      background: "var(--bg-secondary)",
      border: "1px solid var(--border)",
      borderRadius: "8px",
      boxShadow: "var(--shadow-lg)",
      color: "var(--text-primary)",
      fontSize: "12px",
    },
    labelStyle: { color: "var(--text-secondary)" },
  };

  const axisProps = showAxis
    ? {
        tick: { fill: "var(--text-muted)", fontSize: 11 },
        axisLine: { stroke: "var(--border)" },
        tickLine: false,
      }
    : { hide: true };

  return (
    <ResponsiveContainer width="100%" height={height}>
      {type === "area" ? (
        <AreaChart {...commonProps}>
          <defs>
            <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={color} stopOpacity={0.3} />
              <stop offset="100%" stopColor={color} stopOpacity={0} />
            </linearGradient>
          </defs>
          {showGrid && (
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="var(--border)"
              opacity={0.3}
              vertical={false}
            />
          )}
          <XAxis dataKey={xKey} {...axisProps} />
          <YAxis {...axisProps} />
          {showTooltip && <Tooltip {...tooltipStyle} />}
          <Area
            type="monotone"
            dataKey={dataKey}
            stroke={color}
            strokeWidth={strokeWidth}
            fill={`url(#${id})`}
            animationDuration={1000}
          />
        </AreaChart>
      ) : type === "line" ? (
        <LineChart {...commonProps}>
          {showGrid && (
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="var(--border)"
              opacity={0.3}
              vertical={false}
            />
          )}
          <XAxis dataKey={xKey} {...axisProps} />
          <YAxis {...axisProps} />
          {showTooltip && <Tooltip {...tooltipStyle} />}
          <Line
            type="monotone"
            dataKey={dataKey}
            stroke={color}
            strokeWidth={strokeWidth}
            dot={false}
            animationDuration={1000}
          />
        </LineChart>
      ) : (
        <BarChart {...commonProps}>
          {showGrid && (
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="var(--border)"
              opacity={0.3}
              vertical={false}
            />
          )}
          <XAxis dataKey={xKey} {...axisProps} />
          <YAxis {...axisProps} />
          {showTooltip && <Tooltip {...tooltipStyle} />}
          <Bar
            dataKey={dataKey}
            fill={color}
            radius={[4, 4, 0, 0]}
            animationDuration={1000}
          />
        </BarChart>
      )}
    </ResponsiveContainer>
  );
}

/**
 * Mini sparkline chart for use inside metric cards
 */
export function SparklineChart({
  data,
  dataKey,
  color = "#06B6D4",
  height = 40,
}: {
  data: Record<string, unknown>[];
  dataKey: string;
  color?: string;
  height?: number;
}) {
  const id = `sparkline-${dataKey}-${color.replace("#", "")}`;

  return (
    <ResponsiveContainer width="100%" height={height}>
      <AreaChart data={data} margin={{ top: 2, right: 2, bottom: 2, left: 2 }}>
        <defs>
          <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity={0.25} />
            <stop offset="100%" stopColor={color} stopOpacity={0} />
          </linearGradient>
        </defs>
        <Area
          type="monotone"
          dataKey={dataKey}
          stroke={color}
          strokeWidth={1.5}
          fill={`url(#${id})`}
          animationDuration={800}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
