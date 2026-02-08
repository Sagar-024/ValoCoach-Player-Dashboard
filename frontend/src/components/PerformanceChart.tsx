"use client";

import { Match } from "@/lib/types";
import { getMapPerformance } from "@/lib/utils";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { useState, useEffect, useMemo } from "react";

interface PerformanceChartProps {
  matches: Match[];
}

export default function PerformanceChart({ matches }: PerformanceChartProps) {
  const [isClient, setIsClient] = useState(false);
  const mapPerformance = useMemo(() => getMapPerformance(matches), [matches]);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return <ChartSkeleton />;
  }

  if (mapPerformance.length === 0) {
    return (
      <div className="w-full h-[300px] flex items-center justify-center rounded-2xl bg-white dark:bg-[#1a1f2e] shadow-lg">
        <p className="font-mono text-sm text-[var(--valo-text-secondary)] uppercase tracking-widest">
          Insufficient tactical data
        </p>
      </div>
    );
  }

  // Custom high-end tooltip
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="px-6 py-4 rounded-xl bg-white/95 dark:bg-[#1a1f2e]/95 backdrop-blur-md shadow-2xl border border-black/5 dark:border-white/5 animate-in fade-in zoom-in duration-200">
          <p className="font-display font-bold text-xl text-black dark:text-white mb-2 tracking-tight">
            {data.map}
          </p>
          <div className="flex items-center gap-3">
            <div className="w-1.5 h-1.5 rounded-full bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.6)]" />
            <p className="font-mono text-base font-bold text-black dark:text-white tracking-tighter">
              {data.acs} ACS
            </p>
          </div>
          <p className="text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-black/40 dark:text-white/40 mt-3 border-t border-black/5 dark:border-white/5 pt-2">
            {data.matchCount} TOTAL MATCHES
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-full animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex items-center gap-4 mb-12">
        <div className="w-12 h-[2px] bg-rose-500 rounded-full" />
        <h3 className="font-display text-3xl font-bold text-black dark:text-white tracking-tight">
          Tactical Map Performance
        </h3>
      </div>

      <div className="relative w-full h-[400px] p-8 md:p-12 rounded-3xl bg-white dark:bg-[#1a1f2e] shadow-[0_8px_32px_-4px_rgba(0,0,0,0.1)] dark:shadow-[0_8px_32px_-4px_rgba(0,0,0,0.5)] overflow-hidden">
        {/* Magazine Texture Layer */}
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          }}
        />

        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={mapPerformance}
            margin={{ top: 20, right: 10, left: 0, bottom: 20 }}
            barSize={32}
            barGap={24}
          >
            <XAxis
              dataKey="map"
              stroke="transparent"
              fontSize={11}
              fontFamily="DM Mono, monospace"
              tick={{
                fill: "var(--valo-text-tertiary)",
                fontWeight: 700,
                letterSpacing: "0.1em",
              }}
              dy={20}
            />
            <YAxis
              stroke="transparent"
              fontSize={10}
              fontFamily="DM Mono, monospace"
              tick={{ fill: "var(--valo-text-tertiary)", opacity: 0.5 }}
              tickLine={false}
              axisLine={false}
              domain={[0, "dataMax + 50"]}
            />
            <Tooltip
              content={<CustomTooltip />}
              cursor={{ fill: "rgba(0, 0, 0, 0.02)", radius: 8 }}
              wrapperStyle={{ outline: "none" }}
            />

            {/* Main Data Bar */}
            <Bar
              dataKey="acs"
              radius={[8, 8, 2, 2]}
              animationDuration={1500}
              animationEasing="cubic-bezier(0.23, 1, 0.32, 1)"
            >
              {mapPerformance.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill="url(#premiumRedGradient)"
                  className="hover:opacity-90 transition-opacity duration-300"
                />
              ))}
            </Bar>

            <defs>
              <linearGradient
                id="premiumRedGradient"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop offset="0%" stopColor="#ff4655" stopOpacity={1} />
                <stop offset="60%" stopColor="#8d1b26" stopOpacity={1} />
                <stop offset="100%" stopColor="#2c0a0d" stopOpacity={1} />
              </linearGradient>

              {/* Glow filter for bars */}
              <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="4" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

function ChartSkeleton() {
  return (
    <div className="w-full">
      <div className="h-10 w-64 bg-slate-200 dark:bg-slate-800 rounded-lg mb-8 animate-pulse" />
      <div className="w-full h-[400px] p-12 rounded-3xl bg-white dark:bg-[#1a1f2e] shadow-xl animate-pulse">
        <div className="w-full h-full flex items-end justify-around gap-12">
          {[1, 2, 3, 4, 5].map((i) => (
            <div
              key={i}
              className="w-10 bg-slate-100 dark:bg-slate-800 rounded-t-xl"
              style={{
                height: `${[45, 75, 55, 80, 60][i - 1]}%`,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
