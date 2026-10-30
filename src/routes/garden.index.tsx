import { createFileRoute, Link } from "@tanstack/react-router";
import { diary } from "@/content/posts";
import { PageHeader, TagPill } from "@/components/site/Shell";
import { allTags, filterByTag, formatDate, readTime } from "@/lib/content-utils";

export const Route = createFileRoute("/garden/")({
  validateSearch: (s: Record<string, unknown>): { tag?: string | undefined } => ({ tag: typeof s["tag"] === "string" ? s["tag"] : undefined }),
  head: () => ({
    meta: [
      { title: "Digital Garden — Miltos Koniaris" },
      { name: "description", content: "Quick notes, thoughts and day-to-day logs." },
      { property: "og:title", content: "Digital Garden — Miltos Koniaris" },
      { property: "og:description", content: "Quick notes, thoughts and day-to-day logs." },
    ],
  }),
  component: Garden,
});

function Garden() {
  const { tag } = Route.useSearch();
  const navigate = Route.useNavigate();
  const items = filterByTag([...diary].sort((a, b) => b.date.localeCompare(a.date)), tag);
  return (
    <div>
      <PageHeader eyebrow="Digital Garden" title="Notes from the edge" intro="Unpolished thoughts, small wins and daily logs." />
      <div className="mb-8 flex flex-wrap gap-2">
        <TagPill tag="all" active={!tag} onClick={() => navigate({ search: { tag: undefined } })} />
        {allTags(diary).map((t) => <TagPill key={t} tag={t} active={tag === t} onClick={() => navigate({ search: { tag: t } })} />)}
      </div>
      <ul className="space-y-3">
        {items.map((d) => (
          <li key={d.slug}>
            <Link to="/garden/$slug" params={{ slug: d.slug }} className="lift press flex gap-4 rounded-xl border bg-card p-5">
              <span className="text-2xl" aria-label="mood">{d.mood}</span>
              <div className="min-w-0">
                <p className="font-mono text-xs text-muted-foreground">{formatDate(d.date)} · {readTime(d.body)} min</p>
                <h3 className="mt-1 font-semibold">{d.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{d.summary}</p>
                <div className="mt-3 flex flex-wrap gap-1.5">{d.tags.map((t) => <TagPill key={t} tag={t} />)}</div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
