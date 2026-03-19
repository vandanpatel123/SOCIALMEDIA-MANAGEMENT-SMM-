import type { HTMLAttributes } from "react";

export function Card({
  className = "",
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={`rounded-[30px] border border-white/80 bg-white/90 p-6 shadow-soft backdrop-blur ${className}`}
      {...props}
    />
  );
}
