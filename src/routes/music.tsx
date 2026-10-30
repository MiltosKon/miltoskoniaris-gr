import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Play, X } from "lucide-react";
import { music } from "@/content/posts";
import { PageHeader, TagPill } from "@/components/site/Shell";
import { allTags, filterByTag } from "@/lib/content-utils";

export const Route = createFileRoute("/music")({
  head: () => ({
    meta: [
      { title: "Music Corner — Miltos Koniaris" },
      { name: "description", content: "Curated albums and tracks on rotation, with players." },
      { property: "og:title", content: "Music Corner" },
      { property: "og:description", content: "Curated albums and tracks on rotation." },
    ],
  }),
  component: Music,
});

function Music() {
  const [tag, setTag] = useState<string | null>(null);
  const [playing, setPlaying] = useState<string | null>(null);
  const items = filterByTag(music, tag);
  return (
    <div>
      <PageHeader eyebrow="Music Corner" title="On rotation" intro="What's playing while the tests run. Coming soon: an automatic sync with my YouTube Music history." />
      <div className="mb-8 flex flex-wrap gap-2">
        <TagPill tag="all" active={!tag} onClick={() => setTag(null)} />
        {allTags(music).map((t) => <TagPill key={t} tag={t} active={tag === t} onClick={() => setTag(t)} />)}
      </div>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((m) => (
          <div key={m.slug} className="lift group overflow-hidden rounded-xl border bg-card">
            <div className="relative aspect-square overflow-hidden bg-muted">
              <img src={m.cover} alt={`${m.title} cover`} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <span className="absolute left-3 top-3 rounded-full bg-background/80 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider backdrop-blur">{m.kind} · {m.year}</span>
              {m.embed && (
                <button
                  onClick={() => setPlaying(playing === m.slug ? null : m.slug)}
                  aria-label={playing === m.slug ? "Close player" : `Play ${m.title}`}
                  className="press glow absolute bottom-3 right-3 grid h-11 w-11 place-items-center rounded-full bg-primary text-primary-foreground"
                >
                  {playing === m.slug ? <X className="h-5 w-5" /> : <Play className="h-5 w-5 translate-x-px" />}
                </button>
              )}
            </div>
            <div className="p-4">
              <h3 className="font-semibold">{m.title}</h3>
              <p className="text-sm text-melon">{m.artist}</p>
              <p className="mt-2 text-sm text-muted-foreground">{m.note}</p>
              {playing === m.slug && m.embed && (
                <iframe
                  title={`${m.title} player`}
                  src={m.embed}
                  className="mt-4 h-[152px] w-full rounded-lg border-0"
                  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                  loading="lazy"
                />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
