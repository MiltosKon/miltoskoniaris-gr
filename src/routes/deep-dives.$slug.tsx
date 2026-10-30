import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { useEffect, useState } from "react";
import { deepDives } from "@/content/posts";
import { Markdown } from "@/components/site/Markdown";
import { TagPill } from "@/components/site/Shell";
import { extractHeadings, formatDate, readTime } from "@/lib/content-utils";

export const Route = createFileRoute("/deep-dives/$slug")({
  loader: ({ params }) => {
    const post = deepDives.find((d) => d.slug === params.slug);
    if (!post) throw notFound();
    return post;
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.title} — Deep Dives` },
          { name: "description", content: loaderData.summary },
          { property: "og:title", content: loaderData.title },
          { property: "og:description", content: loaderData.summary },
          { property: "og:type", content: "article" },
        ]
      : [{ title: "Article not found" }, { name: "robots", content: "noindex" }],
  }),
  component: Article,
});

function Article() {
  const p = Route.useLoaderData();
  const headings = extractHeadings(p.body);
  const [active, setActive] = useState<string | null>(null);
  useEffect(() => {
    const obs = new IntersectionObserver(
      (es) => es.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-80px 0px -70% 0px" },
    );
    headings.forEach((h) => { const el = document.getElementById(h.id); if (el) obs.observe(el); });
    return () => obs.disconnect();
  }, [p.slug]);

  return (
    <div className="grid gap-12 lg:grid-cols-[minmax(0,65ch)_220px] lg:justify-between">
      <article className="animate-fade-up min-w-0">
        <Link to="/deep-dives" search={{ tag: undefined }} className="press mb-8 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="h-4 w-4" /> Deep Dives
        </Link>
        <p className="font-mono text-xs text-muted-foreground">{formatDate(p.date)} · {readTime(p.body)} min read</p>
        <h1 className="mt-2 text-3xl font-semibold sm:text-5xl">{p.title}</h1>
        <p className="mt-4 text-lg text-muted-foreground">{p.summary}</p>
        <div className="mt-4 mb-10 flex flex-wrap gap-1.5">{p.tags.map((t) => <TagPill key={t} tag={t} />)}</div>
        <Markdown source={p.body} />
      </article>
      <aside className="hidden lg:block">
        <nav className="sticky top-24">
          <p className="mb-3 font-mono text-xs uppercase tracking-widest text-muted-foreground">On this page</p>
          <ul className="space-y-2 border-l text-sm">
            {headings.map((h) => (
              <li key={h.id} style={{ paddingLeft: h.depth === 3 ? 24 : 12 }}>
                <a href={`#${h.id}`} className={`block -ml-px border-l pl-0 transition-colors ${active === h.id ? "border-primary text-foreground" : "border-transparent text-muted-foreground hover:text-foreground"}`}>
                  <span className="pl-3">{h.text}</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
    </div>
  );
}
