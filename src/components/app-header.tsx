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

function isActivePath(pathname: string, href: string) {
  if (href === "/") {
    return pathname === "/";
  }

  return pathname === href || pathname.startsWith(`${href}/`);
}

export function AppHeader() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/90 backdrop-blur">
      <div className="mx-auto w-full max-w-6xl px-4 py-3 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <Link href="/" className="flex items-center gap-3 transition hover:opacity-90">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-950 text-sm font-semibold text-white">
              PS
            </span>
            <span className="flex flex-col leading-tight">
              <span className="font-display text-lg text-foreground">PlantSoc</span>
              <span className="text-xs text-slate-500">Community allotment</span>
            </span>
          </Link>

          <nav className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm font-medium text-slate-600">
            {primaryNavigation.map((link) => {
              const active = isActivePath(pathname, link.href);

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`transition ${
                    active
                      ? "text-foreground underline decoration-emerald-950/20 underline-offset-4"
                      : "hover:text-foreground"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href="/admin"
              className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-foreground transition hover:border-slate-300"
            >
              Admin
            </Link>

            <details className="relative">
              <summary className="cursor-pointer list-none rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-foreground transition hover:border-slate-300">
                More
              </summary>
              <div className="absolute right-0 mt-2 w-56 rounded-2xl border border-slate-200 bg-white p-2 shadow-lg shadow-slate-200/60">
                {secondaryNavigation.map((link) => {
                  const active = isActivePath(pathname, link.href);

                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={`block rounded-xl px-3 py-2 text-sm transition ${
                        active ? "bg-emerald-50 text-foreground" : "text-slate-600 hover:bg-slate-50 hover:text-foreground"
                      }`}
                    >
                      {link.label}
                    </Link>
                  );
                })}
              </div>
            </details>
          </div>
        </div>
      </div>
    </header>
  );
}