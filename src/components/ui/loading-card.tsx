export function LoadingCard({ label = "Loading data..." }: { label?: string }) {
  return (
    <div className="rounded-[30px] border border-white/80 bg-white/90 p-8 shadow-soft backdrop-blur">
      <div className="animate-pulse space-y-4">
        <div className="h-5 w-40 rounded-full bg-slate-200" />
        <div className="h-4 w-full rounded-full bg-slate-100" />
        <div className="h-4 w-4/5 rounded-full bg-slate-100" />
      </div>
      <p className="mt-5 text-sm text-slate-500">{label}</p>
    </div>
  );
}
