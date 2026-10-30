import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, Bot, Gauge, FlaskConical } from "lucide-react";
import { site } from "@/content/site";
import { diary, deepDives } from "@/content/posts";
import { navItems } from "@/components/site/nav";
import { formatDate } from "@/lib/content-utils";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Miltos Koniaris — QA Automation Engineer · Digital Garden" },
      { name: "description", content: "QA Automation Engineer working on performance testing and AI-driven test orchestration with Claude. Notes, deep dives, CV and music." },
      { property: "og:title", content: "Miltos Koniaris — QA Automation Engineer" },
      { property: "og:description", content: "Teetering in the unknown. A digital garden on QA, performance and agentic testing." },
    ],
  }),
  component: Index,
});

const expertise = [
  { icon: Bot, title: "AI Orchestration", body: "Multi-agent Claude workflows that generate, run and self-heal tests." },
  { icon: Gauge, title: "Performance", body: "k6 and NBomber load tests, isolated with containers and mocks." },
  { icon: FlaskConical, title: "QA Automation", body: "API and UI suites teams can trust — and actually run." },
];

const blurbs: Record<string, string> = {
  "/cv": "Work history, stack and achievements.",
  "/garden": "Quick notes and day-to-day logs.",
  "/deep-dives": "Long-form engineering write-ups.",
  "/music": "Albums and tracks on rotation.",
};

function Index() {
  const latest = [...diary.map((d) => ({ ...d, kind: "garden" as const })), ...deepDives.map((d) => ({ ...d, kind: "deep" as const }))]
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, 4);
  return (
    <div className="relative">
      <div className="grid-bg pointer-events-none absolute inset-x-0 -top-10 h-80" />
      <section className="animate-fade-up relative py-10 sm:py-16">
        <p className="mb-5 inline-flex items-center gap-2 rounded-full border bg-secondary/60 px-3 py-1 font-mono text-xs text-muted-foreground">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-melon" /> {site.role} · {site.location}
        </p>
        <h1 className="text-5xl font-semibold leading-[1.05] sm:text-7xl">
          {site.name}
          <br />
          <span className="text-gradient">{site.tagline}</span>
        </h1>
        <p className="mt-6 max-w-[60ch] text-lg text-muted-foreground">
          {site.intro}
        </p>
      </section>

      <section className="grid gap-4 sm:grid-cols-3">
        {expertise.map((e, i) => (
          <div key={e.title} className="lift animate-fade-up rounded-xl border bg-card p-5" style={{ animationDelay: `${i * 80}ms` }}>
            <e.icon className="h-5 w-5 text-primary" />
            <h3 className="mt-4 font-semibold">{e.title}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{e.body}</p>
          </div>
        ))}
      </section>

      <section className="mt-16 rounded-xl border bg-card p-6 sm:p-8">
        <p className="font-mono text-xs uppercase tracking-widest text-melon">What I'm working on</p>
        <p className="mt-3 max-w-[65ch] text-muted-foreground">{site.now}</p>
        <Link to="/deep-dives/$slug" params={{ slug: "agentic-testing-qa-councils" }} className="mt-4 inline-flex items-center gap-1 text-sm text-primary hover:underline">
          Read the Agentic Testing notes <ArrowUpRight className="h-4 w-4" />
        </Link>
      </section>

      <section className="mt-16 rounded-xl border bg-card/50 p-6 sm:p-8">
        <p className="font-mono text-xs uppercase tracking-widest text-melon">Philosophy</p>
        <blockquote className="mt-3 max-w-[55ch] font-display text-2xl leading-snug sm:text-3xl">
          Quality isn't a phase. It's the shape of the system — and the courage to say <span className="text-primary">“I don't know yet.”</span>
        </blockquote>
      </section>

      <section className="mt-16 grid gap-4 sm:grid-cols-2">
        {navItems.slice(1).map((n) => (
          <Link key={n.to} to={n.to} className="lift press group flex items-center justify-between rounded-xl border bg-card p-6">
            <div className="flex items-center gap-4">
              <span className="grid h-10 w-10 place-items-center rounded-lg bg-accent text-primary"><n.icon className="h-5 w-5" /></span>
              <div>
                <h3 className="font-semibold">{n.label}</h3>
                <p className="text-sm text-muted-foreground">{blurbs[n.to]}</p>
              </div>
            </div>
            <ArrowUpRight className="h-5 w-5 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-melon" />
          </Link>
        ))}
      </section>

      <section className="mt-16">
        <h2 className="mb-4 text-xl font-semibold">Recently planted</h2>
        <ul className="divide-y rounded-xl border">
          {latest.map((p) => (
            <li key={p.slug}>
              <Link
                to={p.kind === "deep" ? "/deep-dives/$slug" : "/garden/$slug"}
                params={{ slug: p.slug }}
                className="press flex items-center justify-between gap-4 px-5 py-4 hover:bg-secondary/50"
              >
                <span className="min-w-0 truncate">{p.title}</span>
                <span className="shrink-0 font-mono text-xs text-muted-foreground">{formatDate(p.date)}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
