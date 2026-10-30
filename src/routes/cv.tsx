import { createFileRoute } from "@tanstack/react-router";
import { Download, FileJson } from "lucide-react";
import { certifications, jobs, projects, skills, site } from "@/content/site";
import { PageHeader } from "@/components/site/Shell";
import { downloadBlob } from "@/lib/content-utils";

export const Route = createFileRoute("/cv")({
  head: () => ({
    meta: [
      { title: "CV — Miltos Koniaris, QA Automation Engineer" },
      { name: "description", content: "Work history, technical stack and key achievements of Miltos Koniaris." },
      { property: "og:title", content: "CV — Miltos Koniaris" },
      { property: "og:description", content: "QA Automation Engineer — performance testing, API automation and AI test orchestration." },
    ],
  }),
  component: CV,
});

function CV() {
  return (
    <div className="print-plain">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <div><PageHeader eyebrow="Curriculum vitae" title={site.name} intro={`${site.role} · ${site.location}`} />
          <p className="-mt-8 mb-10 flex flex-wrap gap-4 text-sm"><a className="text-primary hover:underline" href={`mailto:${site.email}`}>{site.email}</a><a className="text-primary hover:underline" href={site.linkedin} target="_blank" rel="noreferrer">LinkedIn</a></p></div>
        <div className="no-print mb-10 flex gap-2">
          <button onClick={() => window.print()} className="press glow inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground">
            <Download className="h-4 w-4" /> Download CV
          </button>
          <button
            onClick={() => downloadBlob(JSON.stringify({ ...site, jobs, skills }, null, 2), "miltos-koniaris-cv.json", "application/json")}
            className="press inline-flex items-center gap-2 rounded-lg border px-3 py-2.5 text-sm text-muted-foreground hover:text-foreground"
            aria-label="Download CV as JSON"
          >
            <FileJson className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="grid gap-12 lg:grid-cols-[1fr_280px]">
        <ol className="relative border-l pl-6">
          {jobs.map((j) => (
            <li key={j.company + j.period} className="group relative mb-10">
              <span className="absolute -left-[29px] top-1.5 h-2.5 w-2.5 rounded-full border-2 border-primary bg-background transition-colors group-hover:bg-primary" />
              <p className="font-mono text-xs text-melon">{j.period}</p>
              <h3 className="mt-1 text-lg font-semibold">{j.role} <span className="text-muted-foreground">· {j.company}</span></h3>
              <p className="font-mono text-xs text-muted-foreground">{j.team}</p>
              <p className="mt-2 text-muted-foreground">{j.summary}</p>
              <ul className="mt-3 space-y-1.5 text-sm">
                {j.achievements.map((a) => (
                  <li key={a} className="flex gap-2"><span className="text-primary">→</span>{a}</li>
                ))}
              </ul>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {j.stack.map((s) => <span key={s} className="rounded-md border bg-secondary px-2 py-0.5 font-mono text-xs">{s}</span>)}
              </div>
            </li>
          ))}
        </ol>
        <aside className="space-y-6 lg:sticky lg:top-20 lg:self-start">
          {Object.entries(skills).map(([group, list]) => (
            <div key={group} className="rounded-xl border bg-card p-4">
              <h4 className="mb-3 font-mono text-xs uppercase tracking-widest text-muted-foreground">{group}</h4>
              <div className="flex flex-wrap gap-1.5">
                {list.map((s) => <span key={s} className="rounded-md bg-accent px-2 py-1 text-xs text-accent-foreground">{s}</span>)}
              </div>
            </div>
          ))}
          <div className="rounded-xl border bg-card p-4">
            <h4 className="mb-3 font-mono text-xs uppercase tracking-widest text-muted-foreground">Certifications</h4>
            <ul className="space-y-1 text-sm">{certifications.map((c) => <li key={c}>{c}</li>)}</ul>
          </div>
        </aside>
      </div>

      <section className="mt-16">
        <h2 className="mb-4 text-xl font-semibold">Projects</h2>
        <div className="grid gap-4 sm:grid-cols-3">
          {projects.map((p) => (
            <div key={p.title} className="rounded-xl border bg-card p-5">
              <h3 className="font-semibold">{p.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{p.body}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
