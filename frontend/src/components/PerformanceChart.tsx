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
        <div className="px-6 py-4 rounded-xl bg-[var(--valo-bg-elevated)] backdrop-blur-md shadow-2xl border border-[var(--valo-border)] animate-in fade-in zoom-in duration-200">
          <p className="font-display font-bold text-xl text-[var(--valo-text-primary)] mb-2 tracking-tight">
            {data.map}
          </p>
          <div className="flex items-center gap-3">
            <div className="w-1.5 h-1.5 rounded-full bg-[var(--valo-primary)] shadow-[0_0_8px_rgba(255,70,85,0.6)]" />
            <p className="font-mono text-base font-bold text-[var(--valo-text-primary)] tracking-tighter">
              {data.acs} ACS
            </p>
          </div>
          <p className="text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-[var(--valo-text-tertiary)] mt-3 border-t border-[var(--valo-border)] pt-2">
            {data.matchCount} TOTAL MATCHES
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-full animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex items-center gap-4 mb-8 md:mb-12">
        <div className="w-12 h-[2px] bg-[var(--valo-primary)] rounded-full" />
        <h3 className="font-display text-2xl md:text-3xl font-bold text-[var(--valo-text-primary)] tracking-tight">
          Tactical Map Performance
        </h3>
      </div>

      <div className="relative w-full h-[320px] md:h-[450px] p-4 md:p-12 rounded-3xl bg-[var(--valo-bg-surface)] border border-[var(--valo-border)] shadow-[var(--shadow-card-rest)] overflow-hidden">
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
            margin={{ top: 20, right: 10, left: -20, bottom: 20 }}
            barGap={16}
          >
            <XAxis
              dataKey="map"
              stroke="transparent"
              fontSize={10}
              fontFamily="var(--font-mono)"
              tick={{
                fill: "var(--valo-text-secondary)",
                fontWeight: 600,
                letterSpacing: "0.05em",
              }}
              dy={15}
            />
            <YAxis
              stroke="transparent"
              fontSize={10}
              fontFamily="var(--font-mono)"
              tick={{ fill: "var(--valo-text-tertiary)", opacity: 0.5 }}
              tickLine={false}
              axisLine={false}
              domain={[0, "dataMax + 50"]}
            />
            <Tooltip
              content={<CustomTooltip />}
              cursor={{ fill: "var(--valo-primary)", opacity: 0.05, radius: 8 }}
              wrapperStyle={{ outline: "none" }}
            />

            {/* Main Data Bar */}
            <Bar
              dataKey="acs"
              radius={[6, 6, 2, 2]}
              barSize={24}
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
                <stop
                  offset="0%"
                  stopColor="var(--valo-primary)"
                  stopOpacity={1}
                />
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
      <div className="h-10 w-64 bg-[var(--valo-bg-elevated)] rounded-lg mb-8 animate-pulse" />
      <div className="w-full h-[320px] md:h-[450px] p-12 rounded-3xl bg-[var(--valo-bg-surface)] border border-[var(--valo-border)] shadow-xl animate-pulse">
        <div className="w-full h-full flex items-end justify-around gap-12">
          {[1, 2, 3, 4, 5].map((i) => (
            <div
              key={i}
              className="w-10 bg-[var(--valo-bg-elevated)] rounded-t-xl"
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
