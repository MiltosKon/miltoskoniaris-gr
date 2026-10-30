import GithubSlugger from "github-slugger";

export function readTime(markdown: string, wpm = 220): number {
  const words = markdown.replace(/```[\s\S]*?```/g, " ").trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / wpm));
}

export function filterByTag<T extends { tags: string[] }>(items: T[], tag: string | null | undefined): T[] {
  if (!tag) return items;
  return items.filter((i) => i.tags.includes(tag));
}

export function allTags<T extends { tags: string[] }>(items: T[]): string[] {
  return Array.from(new Set(items.flatMap((i) => i.tags))).sort();
}

export type Heading = { depth: number; text: string; id: string };

export function extractHeadings(markdown: string): Heading[] {
  const slugger = new GithubSlugger();
  const out: Heading[] = [];
  const noCode = markdown.replace(/```[\s\S]*?```/g, "");
  for (const line of noCode.split("\n")) {
    const m = /^(#{2,3})\s+(.+)$/.exec(line);
    if (m) { const t = (m[2] ?? "").trim(); out.push({ depth: (m[1] ?? "").length, text: t, id: slugger.slug(t) }); };
  }
  return out;
}

export function formatDate(iso: string): string {
  return new Date(iso + "T00:00:00Z").toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric", timeZone: "UTC" });
}

export function slugify(s: string): string {
  return s.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

export function downloadBlob(content: string, filename: string, type: string) {
  const url = URL.createObjectURL(new Blob([content], { type }));
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 30_000);
}
