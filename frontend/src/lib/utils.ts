import { Match, FilterType, MapPerformance } from './types';

/**
 * Filters matches based on result type
 * Section 12: Client-side filtering (instant, no API calls)
 */
export function filterMatches(matches: Match[], filter: FilterType): Match[] {
  if (filter === "All") return matches;
  return matches.filter(match => match.result === filter);
}

/**
 * Aggregates ACS performance by map
 * Section 9: Minimum 3 matches per map to display
 */
export function getMapPerformance(matches: Match[]): MapPerformance[] {
  const mapStats = new Map<string, { totalACS: number; count: number }>();

  matches.forEach(match => {
    const current = mapStats.get(match.map) || { totalACS: 0, count: 0 };
    mapStats.set(match.map, {
      totalACS: current.totalACS + match.ACS,
      count: current.count + 1
    });
  });

  const performance: MapPerformance[] = [];
  mapStats.forEach((stats, map) => {
    // Section 9: Minimum 3 matches per map to avoid outliers
    if (stats.count >= 3) {
      performance.push({
        map,
        acs: Math.round(stats.totalACS / stats.count),
        matchCount: stats.count
      });
    }
  });

  // Sort by ACS descending
  return performance.sort((a, b) => b.acs - a.acs);
}

/**
 * Formats date for display
 */
export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  
  if (diffHours < 24) {
    return `${diffHours}h ago`;
  }
  
  const diffDays = Math.floor(diffHours / 24);
  if (diffDays < 7) {
    return `${diffDays}d ago`;
  }
  
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

/**
 * Calculates K/D ratio
 */
export function calculateKD(kills: number, deaths: number): number {
  if (deaths === 0) return kills;
  return Math.round((kills / deaths) * 100) / 100;
}
