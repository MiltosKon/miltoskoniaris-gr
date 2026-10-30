import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { diary } from "@/content/posts";
import { Markdown } from "@/components/site/Markdown";
import { TagPill } from "@/components/site/Shell";
import { formatDate, readTime } from "@/lib/content-utils";

export const Route = createFileRoute("/garden/$slug")({
  loader: ({ params }) => {
    const entry = diary.find((d) => d.slug === params.slug);
    if (!entry) throw notFound();
    return entry;
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.title} — Garden` },
          { name: "description", content: loaderData.summary },
          { property: "og:title", content: loaderData.title },
          { property: "og:description", content: loaderData.summary },
          { property: "og:type", content: "article" },
        ]
      : [{ title: "Note not found" }, { name: "robots", content: "noindex" }],
  }),
  component: Entry,
});

function Entry() {
  const d = Route.useLoaderData();
  return (
    <article className="animate-fade-up mx-auto max-w-[65ch]">
      <Link to="/garden" search={{ tag: undefined }} className="press mb-8 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
        <ArrowLeft className="h-4 w-4" /> Garden
      </Link>
      <p className="font-mono text-xs text-muted-foreground">{d.mood} {formatDate(d.date)} · {readTime(d.body)} min read</p>
      <h1 className="mt-2 text-3xl font-semibold sm:text-4xl">{d.title}</h1>
      <div className="mt-4 mb-8 flex flex-wrap gap-1.5">{d.tags.map((t) => <TagPill key={t} tag={t} />)}</div>
      <Markdown source={d.body} />
    </article>
  );
}
