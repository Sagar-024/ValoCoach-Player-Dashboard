import { PlayerData } from "@/lib/types";
import PlayerHero from "@/components/PlayerHero";
import Dashboard from "@/components/Dashboard";
import fs from "fs";
import path from "path";

/**
 * Main Dashboard Page - Server Component
 * Fetches player.json and passes data to client components
 */
export default function Home() {
  // Read player.json from public directory
  const filePath = path.join(process.cwd(), "public", "player.json");
  const fileContents = fs.readFileSync(filePath, "utf8");
  const playerData: PlayerData = JSON.parse(fileContents);

  // Ensure data is serializable (already is from JSON.parse)
  const serializedData = JSON.parse(JSON.stringify(playerData));

  return (
    <main className="min-h-screen bg-[var(--valo-bg-deep)] transition-theme flex flex-col gap-32 md:gap-40 pb-32">
      <PlayerHero data={serializedData} />

      {/* Dashboard with Stats, Matches, and Chart */}
      <Dashboard data={serializedData} />
    </main>
  );
}
