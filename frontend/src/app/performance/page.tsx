import { PlayerData } from "@/lib/types";
import PerformanceChart from "@/components/PerformanceChart";
import Container from "@/components/Container";
import fs from "fs";
import path from "path";

/**
 * Performance Page - Showcases detailed map performance metrics
 */
export default function PerformancePage() {
  // Read player.json from public directory
  const filePath = path.join(process.cwd(), "public", "player.json");
  const fileContents = fs.readFileSync(filePath, "utf8");
  const playerData: PlayerData = JSON.parse(fileContents);

  // Ensure data is serializable
  const serializedData = JSON.parse(JSON.stringify(playerData));

  return (
    <main className="min-h-screen bg-[var(--valo-bg-deep)] transition-theme py-16">
      <Container>
        <div className="mb-12">
          <h1 className="font-display text-5xl md:text-7xl font-bold text-[var(--valo-text-primary)] tracking-tight mb-4">
            Performance<span className="text-[var(--valo-primary)]">.</span>
          </h1>
          <p className="text-[var(--valo-text-secondary)] text-lg max-w-2xl font-sans">
            Detailed map analytics and performance breakdown based on your
            recent competitive history.
          </p>
        </div>

        <section className="w-full relative">
          <PerformanceChart matches={serializedData.matches} />
        </section>
      </Container>
    </main>
  );
}
