"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { navigation } from "@/lib/mock-data";

export function Sidebar({
  mobileOpen,
  onClose,
}: {
  mobileOpen: boolean;
  onClose: () => void;
}) {
  const pathname = usePathname();

  return (
    <>
      {mobileOpen ? (
        <button
          type="button"
          className="fixed inset-0 z-30 bg-slate-950/35 lg:hidden"
          onClick={onClose}
          aria-label="Close navigation"
        />
      ) : null}

      <aside
        className={`fixed inset-y-4 left-4 z-40 w-[292px] rounded-[30px] border border-white/80 bg-slate-950 px-5 py-6 text-slate-200 shadow-soft transition duration-200 lg:static lg:inset-auto lg:translate-x-0 ${
          mobileOpen ? "translate-x-0" : "-translate-x-[120%]"
        }`}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-sm font-semibold text-white">
              IF
            </div>
            <div>
              <p className="font-semibold text-white">InstaFlow AI</p>
              <p className="text-sm text-slate-400">Social command center</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 text-slate-300 lg:hidden"
            aria-label="Close navigation"
          >
            X
          </button>
        </div>

        <nav className="mt-8 max-h-[55vh] space-y-2 overflow-y-auto pr-1">
          {navigation.map((item) => {
            const active = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className={`flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition ${
                  active
                    ? "bg-white text-slate-950 shadow-sm"
                    : "text-slate-300 hover:bg-white/10 hover:text-white"
                }`}
              >
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-xl bg-white/10 text-[11px] font-semibold">
                  {item.icon}
                </span>
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="mt-8 rounded-[28px] bg-white/10 p-5">
          <p className="text-sm font-semibold text-white">Automation ready</p>
          <p className="mt-2 text-sm leading-6 text-slate-300">
            Draft captions, monitor replies, and keep your publishing queue moving.
          </p>
          <div className="mt-4 rounded-2xl bg-white/10 px-3 py-2 text-xs uppercase tracking-[0.24em] text-slate-300">
            3 workflows active
          </div>
        </div>
      </aside>
    </>
  );
}
