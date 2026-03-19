"use client";

import { useAppShell } from "./app-provider";

export function ToastCenter() {
  const { toasts, dismissToast } = useAppShell();

  return (
    <div className="pointer-events-none fixed bottom-6 right-6 z-[60] flex w-full max-w-sm flex-col gap-3">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="pointer-events-auto rounded-[24px] border border-white/80 bg-white/95 p-4 shadow-soft backdrop-blur"
        >
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-sm font-semibold text-slate-950">{toast.title}</p>
              <p className="mt-1 text-sm leading-6 text-slate-500">{toast.description}</p>
            </div>
            <button
              type="button"
              onClick={() => dismissToast(toast.id)}
              className="text-xs font-semibold text-slate-400"
            >
              Close
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
