import Link from "next/link";

export function AuthLayout({
  title,
  subtitle,
  children,
  footerText,
  footerLink,
  footerLabel,
}: {
  title: string;
  subtitle: string;
  children: React.ReactNode;
  footerText: string;
  footerLink: string;
  footerLabel: string;
}) {
  return (
    <main className="grid min-h-screen lg:grid-cols-[1.05fr_0.95fr]">
      <section className="grid-surface relative hidden overflow-hidden px-10 py-12 lg:flex lg:flex-col lg:justify-between">
        <div className="absolute inset-0 bg-grid-fade bg-[size:32px_32px] opacity-70" />
        <div className="relative z-10 flex items-center gap-3 text-sm font-semibold text-slate-700">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary-600 text-white shadow-soft">
            IF
          </div>
          InstaFlow AI
        </div>
        <div className="relative z-10 max-w-xl space-y-6">
          <div className="inline-flex rounded-full border border-primary-100 bg-white/80 px-4 py-1 text-xs font-semibold uppercase tracking-[0.32em] text-primary-600">
            Social Automation Dashboard
          </div>
          <h1 className="text-5xl font-semibold leading-tight text-slate-950">
            Plan, generate, and manage Instagram content from one clean workspace.
          </h1>
          <p className="max-w-lg text-lg leading-8 text-slate-600">
            Monitor performance, draft captions with AI, manage conversations, and keep your posting calendar under control.
          </p>
        </div>
        <div className="relative z-10 grid max-w-xl grid-cols-3 gap-4">
          {[
            { label: "Posts created", value: "2.4k" },
            { label: "Saved time", value: "19h" },
            { label: "Response rate", value: "94%" },
          ].map((item) => (
            <div key={item.label} className="rounded-3xl border border-white/70 bg-white/75 p-5 shadow-soft">
              <div className="text-2xl font-semibold text-slate-950">{item.value}</div>
              <div className="mt-2 text-sm text-slate-500">{item.label}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="flex items-center justify-center px-6 py-10 sm:px-10">
        <div className="w-full max-w-md rounded-[32px] border border-white/80 bg-white/90 p-8 shadow-soft backdrop-blur">
          <div className="mb-8 lg:hidden">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary-600 text-sm font-semibold text-white shadow-soft">
              IF
            </div>
          </div>
          <div className="space-y-2">
            <h2 className="text-3xl font-semibold text-slate-950">{title}</h2>
            <p className="text-sm leading-6 text-slate-500">{subtitle}</p>
          </div>
          <div className="mt-8">{children}</div>
          <p className="mt-8 text-sm text-slate-500">
            {footerText}{" "}
            <Link href={footerLink} className="font-semibold text-primary-600">
              {footerLabel}
            </Link>
          </p>
        </div>
      </section>
    </main>
  );
}
