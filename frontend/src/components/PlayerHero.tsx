"use client";

import { PlayerData } from "@/lib/types";
import Image from "next/image";
import { useState } from "react";
import Container from "@/components/Container";
import StatCard from "@/components/StatCard";

interface PlayerHeroProps {
  data: PlayerData;
}

export default function PlayerHero({ data }: PlayerHeroProps) {
  const { displayName, displayTag } = parsePlayerName(data.player_name);

  return (
    <section
      className="
        w-full relative transition-theme 
        border-b border-[var(--valo-border)]
        mt-32 md:mt-40
        pt-24 pb-24 
        md:pt-40 md:pb-40
      "
      style={{
        background:
          "radial-gradient(ellipse at top, rgba(255, 70, 85, 0.05) 0%, transparent 50%), linear-gradient(180deg, rgba(18, 23, 29, 0) 0%, rgba(255, 70, 85, 0.02) 100%)",
      }}
    >
      <Container>
        <div className="flex flex-col xl:flex-row items-start xl:items-center justify-between gap-10 xl:gap-16">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-8 flex-1 w-full max-w-3xl">
            <PlayerAvatar
              imageUrl={data.player_card_link}
              playerName={data.player_name}
              fallbackInitial={displayName.substring(0, 1).toUpperCase()}
            />

            <div className="flex flex-col items-center md:items-start pt-4 gap-4 md:gap-6 text-center md:text-left w-full">
              <PlayerName name={displayName} tag={displayTag} />

              <PlayerRankInfo
                currentRank={data.current_rank}
                peakRank={data.peak_rank}
                leaderboardPlacement={data.leaderboard_placement || undefined}
              />
            </div>
          </div>

          <PlayerStats
            kdRatio={data.overall_kd_ratio}
            headshotPercentage={data.overall_headshot_percentage}
            acs={data.overall_ACS}
            winPercentage={data.overall_win_percent}
          />
        </div>
      </Container>
    </section>
  );
}

function parsePlayerName(fullName: string) {
  const nameParts = fullName.split("#");
  return {
    displayName: nameParts[0],
    displayTag: nameParts.length > 1 ? `#${nameParts[1]}` : "",
  };
}

interface PlayerAvatarProps {
  imageUrl: string;
  playerName: string;
  fallbackInitial: string;
}

function PlayerAvatar({
  imageUrl,
  playerName,
  fallbackInitial,
}: PlayerAvatarProps) {
  const [imgError, setImgError] = useState(false);

  return (
    <div className="relative shrink-0 group">
      <div className="w-[120px] h-[120px] rounded-full overflow-hidden border-2 border-[var(--valo-bg-elevated)] ring-1 ring-[var(--valo-border)] shadow-xl relative z-10 transition-transform duration-500 hover:scale-105">
        {!imgError ? (
          <Image
            src={imageUrl}
            alt={playerName}
            width={120}
            height={120}
            priority
            onError={() => setImgError(true)}
            className="object-cover w-full h-full"
          />
        ) : (
          <div
            className="w-full h-full flex items-center justify-center"
            style={{
              background:
                "linear-gradient(135deg, var(--valo-bg-elevated) 0%, var(--valo-bg-deep) 100%)",
            }}
          >
            <span className="font-display font-medium text-3xl text-[var(--valo-text-tertiary)] opacity-40">
              {fallbackInitial}
            </span>
          </div>
        )}
      </div>
      <div className="absolute inset-0 bg-[var(--valo-primary)] opacity-20 blur-3xl -z-10 rounded-full transform scale-90 group-hover:scale-110 transition-transform duration-500" />
    </div>
  );
}

interface PlayerNameProps {
  name: string;
  tag: string;
}

function PlayerName({ name, tag }: PlayerNameProps) {
  return (
    <div>
      <h1 className="flex flex-wrap items-baseline justify-center md:justify-start gap-x-3 leading-none">
        <span
          className="font-display font-bold text-[var(--valo-text-primary)] text-5xl md:text-7xl tracking-tight drop-shadow-lg"
          style={{
            letterSpacing: "-0.03em",
            textShadow: "0 4px 12px rgba(0, 0, 0, 0.3)",
          }}
        >
          {name}
        </span>
        {tag && (
          <span className="font-sans text-xl md:text-2xl text-[var(--valo-text-tertiary)] font-normal opacity-50 translate-y-[-2px]">
            {tag}
          </span>
        )}
      </h1>
    </div>
  );
}

interface PlayerRankInfoProps {
  currentRank: string;
  peakRank: string;
  leaderboardPlacement?: string | number;
}

function PlayerRankInfo({
  currentRank,
  peakRank,
  leaderboardPlacement,
}: PlayerRankInfoProps) {
  return (
    <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 md:gap-6 mt-1">
      <div className="flex items-center gap-3">
        <div className="w-2.5 h-2.5 rounded-[1px] bg-[var(--valo-primary)] shadow-[0_0_8px_rgba(255,70,85,0.6)]" />
        <span className="font-display font-medium text-[var(--valo-text-primary)] text-lg tracking-wide uppercase">
          {currentRank}
        </span>
      </div>

      <Divider />

      <div className="flex items-center gap-2">
        <span className="text-xs uppercase tracking-wider font-bold text-[var(--valo-text-tertiary)]">
          Peak
        </span>
        <span className="font-mono text-sm font-medium text-[var(--valo-text-secondary)]">
          {peakRank}
        </span>
      </div>

      <Divider />

      {leaderboardPlacement && (
        <>
          <div className="px-2 py-0.5 rounded bg-[rgba(255,70,85,0.1)] border border-[rgba(255,70,85,0.2)]">
            <span className="font-mono text-xs text-[var(--valo-primary)] font-bold">
              #{String(leaderboardPlacement).replace("#", "")}
            </span>
          </div>
          <Divider />
        </>
      )}

      <div className="flex items-center gap-2 group cursor-default">
        <span className="relative flex h-2.5 w-2.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--valo-success)] opacity-60" />
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[var(--valo-success)] shadow-[0_0_8px_rgba(0,214,163,0.6)]" />
        </span>
        <span className="text-xs uppercase tracking-widest font-bold text-[var(--valo-text-tertiary)] group-hover:text-[var(--valo-success)] transition-colors duration-200">
          Active
        </span>
      </div>
    </div>
  );
}

function Divider() {
  return (
    <div className="hidden md:block w-[1px] h-4 bg-[var(--valo-border)]" />
  );
}

interface PlayerStatsProps {
  kdRatio: number;
  headshotPercentage: number;
  acs: number;
  winPercentage: number;
}

function PlayerStats({
  kdRatio,
  headshotPercentage,
  acs,
  winPercentage,
}: PlayerStatsProps) {
  return (
    <div className="w-full xl:w-auto xl:min-w-[500px]">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 md:gap-4 p-0 md:p-4 rounded-2xl md:bg-[var(--valo-bg-surface)]/30 border-0 md:border md:border-[var(--valo-border)]/50 backdrop-blur-sm">
        <StatCard label="K/D Ratio" value={kdRatio} decimals={2} />
        <StatCard
          label="HS %"
          value={headshotPercentage}
          decimals={1}
          suffix="%"
        />
        <StatCard label="ACS" value={acs} decimals={0} />
        <StatCard label="Win %" value={winPercentage} decimals={1} suffix="%" />
      </div>
    </div>
  );
}
