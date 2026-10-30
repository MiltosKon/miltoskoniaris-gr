import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { deepDives } from "@/content/posts";
import { PageHeader, TagPill } from "@/components/site/Shell";
import { allTags, filterByTag, formatDate, readTime } from "@/lib/content-utils";

export const Route = createFileRoute("/deep-dives/")({
  validateSearch: (s: Record<string, unknown>): { tag?: string | undefined } => ({ tag: typeof s["tag"] === "string" ? s["tag"] : undefined }),
  head: () => ({
    meta: [
      { title: "Deep Dives — Miltos Koniaris" },
      { name: "description", content: "Long-form engineering articles on QA automation, data and DevOps." },
      { property: "og:title", content: "Deep Dives & Engineering" },
      { property: "og:description", content: "Long-form engineering articles on QA automation, data and DevOps." },
    ],
  }),
  component: DeepDives,
});

function DeepDives() {
  const { tag } = Route.useSearch();
  const navigate = Route.useNavigate();
  const items = filterByTag([...deepDives].sort((a, b) => b.date.localeCompare(a.date)), tag);
  return (
    <div>
      <PageHeader eyebrow="Deep Dives & Engineering" title="Long-form, hands-on" intro="Write-ups from the trenches — with code you can copy." />
      <div className="mb-8 flex flex-wrap gap-2">
        <TagPill tag="all" active={!tag} onClick={() => navigate({ search: { tag: undefined } })} />
        {allTags(deepDives).map((t) => <TagPill key={t} tag={t} active={tag === t} onClick={() => navigate({ search: { tag: t } })} />)}
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        {items.map((p) => (
          <Link key={p.slug} to="/deep-dives/$slug" params={{ slug: p.slug }} className="lift press group flex flex-col rounded-xl border bg-card p-6">
            <p className="font-mono text-xs text-muted-foreground">{formatDate(p.date)} · {readTime(p.body)} min read</p>
            <h3 className="mt-3 text-xl font-semibold">{p.title}</h3>
            <p className="mt-2 flex-1 text-sm text-muted-foreground">{p.summary}</p>
            <div className="mt-5 flex items-center justify-between">
              <div className="flex flex-wrap gap-1.5">{p.tags.map((t) => <TagPill key={t} tag={t} />)}</div>
              <ArrowUpRight className="h-4 w-4 text-muted-foreground group-hover:text-melon" />
            </div>
          </Link>
        ))}
      </div>
      {items.length === 0 && <p className="text-muted-foreground">No articles with that tag yet.</p>}
    </div>
  );
}
