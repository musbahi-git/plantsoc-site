"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const primaryNavigation = [
  { href: "/", label: "Dashboard" },
  { href: "/plant-codex", label: "Plant Codex" },
  { href: "/suggestions", label: "Suggestions" },
];

const secondaryNavigation = [
  { href: "/harvesting", label: "Harvesting this week" },
  { href: "/locations", label: "Locations" },
  { href: "/health-safety", label: "Health & Safety" },
  { href: "/quick-to-do-list", label: "Quick To Do List" },
  { href: "/projects-big-to-dos", label: "Projects & Big To Dos" },
  { href: "/committee", label: "PlantSoc Committee" },
];

export function AppHeader() {
  const pathname = usePathname();

  return (
    <header className="border-b border-black bg-[#fffdf2] py-2 mb-4">
      <div className="mx-auto w-full max-w-4xl px-4">
        <div className="flex flex-col gap-2">
          <div className="flex justify-between items-baseline border-b border-black pb-2 mb-2">
            <Link href="/" className="text-xl font-bold italic">
              PlantSoc: Community Allotment
            </Link>
            <span className="text-xs font-mono">BATTERY: 62%</span>
          </div>

          <nav className="text-sm font-mono flex flex-wrap gap-4">
            <ul className="flex flex-wrap gap-4 m-0 p-0 list-none">
              {primaryNavigation.map((link) => (
                <li key={link.href}>
                  <Link href={link.href}>
                    {link.label}
                  </Link>
                </li>
              ))}
              <li><Link href="/admin">Admin</Link></li>
              <li>
                <details className="relative inline-block cursor-pointer">
                  <summary className="font-bold underline decoration-dotted">More Links...</summary>
                  <ul className="absolute top-full left-0 border border-black bg-[#fffdf2] mt-1 p-2 w-48 z-50 m-0 list-none shadow-sm">
                    {secondaryNavigation.map((link) => (
                      <li key={link.href} className="mb-1 last:mb-0">
                        <Link href={link.href} className="block whitespace-nowrap overflow-hidden text-ellipsis">
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </details>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}