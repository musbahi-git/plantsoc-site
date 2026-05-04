import Link from "next/link";
import { Badge, Card, SectionHeading, StatCard } from "@/components/ui";
import { formatDate, quickTodos } from "@/lib/site-data";
import { getHarvestQueue, listPlantRecords } from "@/lib/plant-store";

export const dynamic = "force-dynamic";

export default function Home() {
  const plantRecords = listPlantRecords();
  const harvestQueue = getHarvestQueue(plantRecords);
  const openTasks = quickTodos.filter((task) => task.status !== "Done").length;

  return (
    <div className="w-full font-serif pb-10">
      <section className="mb-8 border-b border-black pb-4">
        <Badge>Solar Powered Dashboard</Badge>
        <h1 className="text-4xl font-bold mt-4 mb-2">PlantSoc & Community Allotment</h1>
        <p className="mb-4">
          A static, low-bandwidth overview of the live plant codex, upcoming harvests, and the work that still needs attention.
        </p>
        <div className="flex gap-4 font-mono text-sm">
          <Link href="/plant-codex">[ Open Codex ]</Link>
          <Link href="/admin#plant-manager">[ Add Plant ]</Link>
          <Link href="/suggestions">[ Suggestion Box ]</Link>
        </div>
      </section>

      <section className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <StatCard label="Records" value={plantRecords.length.toString()} detail="Active" />
        <StatCard label="Harvest" value={harvestQueue.length.toString()} detail="Due this week" />
        <StatCard label="Tasks" value={openTasks.toString()} detail="Open" />
        <StatCard label="Sites" value="5" detail="Locations" />
      </section>

      <section className="grid md:grid-cols-2 gap-8">
        <div>
          <SectionHeading
            eyebrow="Action Items"
            title="Harvesting Queue"
            action={<Link href="/harvesting" className="font-mono text-sm">[ full list ]</Link>}
          />
          <table className="mt-4 font-mono text-sm">
            <thead>
              <tr>
                <th>Item</th>
                <th>Location</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {harvestQueue.slice(0, 3).map((plant) => (
                <tr key={plant.slug}>
                  <td>{plant.name}</td>
                  <td>{plant.location}</td>
                  <td>{formatDate(plant.estimatedHarvestTrimDate)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div>
          <SectionHeading
            eyebrow="Directory"
            title="Essential Surfaces"
          />
          <ul className="mt-4 font-mono text-sm leading-loose list-square pl-4">
            <li><Link href="/locations">Campus Growing Locations</Link></li>
            <li><Link href="/suggestions">Submit Anonymous Suggestion</Link></li>
            <li><Link href="/admin">Administrative Terminal</Link></li>
            <li><Link href="/health-safety">Health & Safety Protocol (Required reading)</Link></li>
          </ul>
        </div>
      </section>
    </div>
  );
}
