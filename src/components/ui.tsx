import type { ComponentPropsWithoutRef, ReactNode } from "react";

type BadgeTone = "emerald" | "amber" | "slate" | "rose";

export function Card({
  children,
  className = "",
  ...rest
}: ComponentPropsWithoutRef<"div">) {
  return (
    <div
      {...rest}
      className={`border-b border-black pb-4 mb-4 ${className ?? ""}`.trim()}
    >
      {children}
    </div>
  );
}

export function Badge({
  children,
  tone = "emerald",
}: {
  children: ReactNode;
  tone?: BadgeTone;
}) {
  return (
    <span
      className={`inline-block border border-black px-1 text-xs`}
    >
      {children}
    </span>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  action,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  action?: ReactNode;
}) {
  return (
    <div className="mb-4">
      {eyebrow ? (
        <p className="text-xs uppercase">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="text-xl font-bold">{title}</h2>
      {description ? (
        <p className="text-sm">{description}</p>
      ) : null}
      {action ? <div className="mt-2 text-sm">{action}</div> : null}
    </div>
  );
}

export function StatCard({
  label,
  value,
  detail,
}: {
  label: string;
  value: string;
  detail: string;
}) {
  return (
    <div className="border border-black p-2 bg-[#fffdf2]">
      <p className="text-xs uppercase border-b border-black pb-1 mb-1">
        {label}
      </p>
      <p className="text-xl font-bold text-center">{value}</p>
      <p className="text-xs mt-1 text-center italic">{detail}</p>
    </div>
  );
}

export function EmptyState({
  title,
  description,
  action,
}: {
  title: string;
  description: string;
  action?: ReactNode;
}) {
  return (
    <div className="border border-black p-4 text-center">
      <p className="text-xl font-bold">{title}</p>
      <p className="mt-2 text-sm">
        {description}
      </p>
      {action ? <div className="mt-4">{action}</div> : null}
    </div>
  );
}