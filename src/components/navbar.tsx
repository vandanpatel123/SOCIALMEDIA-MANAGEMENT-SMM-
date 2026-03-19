"use client";

import Image from "next/image";
import { useAppShell } from "@/components/app-provider";
import { notifications, userProfile } from "@/lib/mock-data";

export function Navbar({ onMenuClick }: { onMenuClick: () => void }) {
  const { theme, toggleTheme, pushToast } = useAppShell();

  return (
    <header className="border-b border-white/80 bg-white/75 px-4 py-4 backdrop-blur sm:px-6 lg:px-8">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onMenuClick}
            className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-700 lg:hidden"
            aria-label="Open navigation"
          >
            <span className="space-y-1.5">
              <span className="block h-0.5 w-5 rounded-full bg-current" />
              <span className="block h-0.5 w-5 rounded-full bg-current" />
              <span className="block h-0.5 w-5 rounded-full bg-current" />
            </span>
          </button>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-primary-600">
              InstaFlow AI
            </p>
            <h1 className="text-lg font-semibold text-slate-950">
              AI-powered Instagram operations
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden items-center gap-3 rounded-full border border-slate-200 bg-white px-4 py-2 shadow-sm lg:flex">
            <input
              className="w-56 border-none bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400"
              placeholder="Search posts, inbox, assets..."
            />
          </div>

          <button
            type="button"
            onClick={toggleTheme}
            className="inline-flex h-11 items-center justify-center rounded-2xl border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-700 shadow-sm"
          >
            {theme === "light" ? "Dark mode" : "Light mode"}
          </button>

          <button
            type="button"
            onClick={() =>
              pushToast({
                title: notifications[0].title,
                description: notifications[0].description,
              })
            }
            className="relative inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 bg-white text-sm font-semibold text-slate-700 shadow-sm"
          >
            N
            <span className="absolute right-2 top-2 h-2.5 w-2.5 rounded-full bg-primary-600" />
          </button>

          <div className="flex items-center gap-3 rounded-full border border-slate-200 bg-white px-3 py-2 shadow-sm">
            <div className="hidden text-right sm:block">
              <p className="text-sm font-semibold text-slate-900">{userProfile.name}</p>
              <p className="text-xs text-slate-500">{userProfile.role}</p>
            </div>
            <Image
              src={userProfile.avatar}
              alt={userProfile.name}
              width={40}
              height={40}
              className="rounded-full object-cover"
            />
          </div>
        </div>
      </div>
    </header>
  );
}
