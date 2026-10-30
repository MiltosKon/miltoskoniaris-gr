import { createFileRoute, useRouter } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useState } from "react";
import { toast } from "sonner";
import { Copy, FileJson, FileText, Lock } from "lucide-react";
import { getAdminStatus, lockAdmin, unlockAdmin } from "@/lib/gate.functions";
import { Markdown } from "@/components/site/Markdown";
import { PageHeader, TagPill } from "@/components/site/Shell";
import { downloadBlob, readTime, slugify } from "@/lib/content-utils";

export const Route = createFileRoute("/admin")({
  loader: () => getAdminStatus(),
  head: () => ({
    meta: [
      { title: "Authoring Hub — Miltos Koniaris" },
      { name: "description", content: "Private authoring hub." },
      { property: "og:title", content: "Authoring Hub" },
      { property: "og:description", content: "Private authoring hub." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: Admin,
});

function Admin() {
  const { unlocked } = Route.useLoaderData();
  return unlocked ? <Editor /> : <Unlock />;
}

const inputCls = "w-full rounded-lg border bg-secondary/50 px-3 py-2.5 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-ring/30";

function Unlock() {
  const router = useRouter();
  const unlock = useServerFn(unlockAdmin);
  const [error, setError] = useState(false);
  const [busy, setBusy] = useState(false);
  return (
    <form
      className="animate-fade-up mx-auto mt-10 max-w-sm rounded-2xl border bg-card p-8"
      onSubmit={async (e) => {
        e.preventDefault();
        setBusy(true);
        const password = new FormData(e.currentTarget).get("password") as string;
        const { ok } = await unlock({ data: { password } });
        setBusy(false);
        if (ok) router.invalidate(); else setError(true);
      }}
    >
      <Lock className="h-6 w-6 text-primary" />
      <h1 className="mt-4 text-2xl font-semibold">Authoring hub</h1>
      <p className="mt-1 text-sm text-muted-foreground">Enter the password to continue.</p>
      <input name="password" type="password" autoComplete="current-password" aria-label="Password" className={`${inputCls} mt-6`} autoFocus />
      {error && <p className="mt-2 text-sm text-destructive">Incorrect password.</p>}
      <button disabled={busy} className="press glow mt-4 w-full rounded-lg bg-primary py-2.5 text-sm font-medium text-primary-foreground disabled:opacity-60">
        {busy ? "Checking…" : "Unlock"}
      </button>
    </form>
  );
}

const sections = ["CV", "Diary", "Deep Dive", "Music"] as const;
type Section = (typeof sections)[number];
const moods = ["☕", "🌧️", "🌀", "🔥", "🌱", "🎧"];

function Editor() {
  const router = useRouter();
  const lock = useServerFn(lockAdmin);
  const [section, setSection] = useState<Section>("Deep Dive");
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [tags, setTags] = useState("");
  const [mood, setMood] = useState(moods[0]);
  const [artist, setArtist] = useState("");
  const [body, setBody] = useState("## Introduction\n\nStart writing in **markdown**…\n\n```ts\nconst hello = 'world';\n```");

  const tagList = tags.split(",").map((t) => t.trim()).filter(Boolean);
  const date = new Date().toISOString().slice(0, 10);
  const slug = slugify(title || "untitled");
  const entry = {
    section, slug, title, summary, tags: tagList, date,
    ...(section === "Diary" ? { mood } : {}),
    ...(section === "Music" ? { artist } : {}),
    body,
  };
  const frontmatter = `---\n${Object.entries(entry).filter(([k]) => k !== "body").map(([k, v]) => `${k}: ${JSON.stringify(v)}`).join("\n")}\n---\n\n${body}\n`;

  return (
    <div>
      <div className="flex items-end justify-between gap-4">
        <PageHeader eyebrow="Authoring hub" title="Write something" />
        <button
          onClick={async () => { await lock(); router.invalidate(); }}
          className="press mb-10 rounded-lg border px-3 py-2 text-sm text-muted-foreground hover:text-foreground"
        >
          Lock
        </button>
      </div>

      <div className="mb-6 flex flex-wrap gap-2">
        {sections.map((s) => (
          <button key={s} onClick={() => setSection(s)} className={`press rounded-lg border px-4 py-2 text-sm ${section === s ? "border-primary bg-primary/15 text-foreground" : "text-muted-foreground hover:text-foreground"}`}>
            {s}
          </button>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="space-y-4">
          <input className={inputCls} placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
          <input className={inputCls} placeholder="Summary" value={summary} onChange={(e) => setSummary(e.target.value)} />
          <input className={inputCls} placeholder="Tags, comma separated" value={tags} onChange={(e) => setTags(e.target.value)} />
          {section === "Diary" && (
            <div className="flex gap-2">
              {moods.map((m) => (
                <button key={m} onClick={() => setMood(m)} className={`press h-11 w-11 rounded-lg border text-xl ${mood === m ? "border-melon bg-melon/15" : ""}`}>{m}</button>
              ))}
            </div>
          )}
          {section === "Music" && <input className={inputCls} placeholder="Artist" value={artist} onChange={(e) => setArtist(e.target.value)} />}
          <textarea className={`${inputCls} min-h-[420px] font-mono leading-relaxed`} value={body} onChange={(e) => setBody(e.target.value)} aria-label="Markdown content" />
          <div className="flex flex-wrap gap-2">
            <button onClick={() => { downloadBlob(JSON.stringify(entry, null, 2), `${slug}.json`, "application/json"); toast.success("JSON exported"); }} className="press glow inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground">
              <FileJson className="h-4 w-4" /> Publish · Export JSON
            </button>
            <button onClick={() => { downloadBlob(frontmatter, `${slug}.md`, "text/markdown;charset=utf-8"); toast.success("Markdown exported"); }} className="press inline-flex items-center gap-2 rounded-lg border px-4 py-2.5 text-sm">
              <FileText className="h-4 w-4" /> Export Markdown
            </button>
            <button onClick={() => { navigator.clipboard.writeText(JSON.stringify(entry, null, 2)); toast("Copied to clipboard"); }} className="press inline-flex items-center gap-2 rounded-lg border px-3 py-2.5 text-sm text-muted-foreground" aria-label="Copy JSON">
              <Copy className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="rounded-xl border bg-card p-6 lg:sticky lg:top-20 lg:max-h-[calc(100vh-6rem)] lg:overflow-auto">
          <p className="font-mono text-xs uppercase tracking-widest text-melon">Preview · {section}</p>
          <p className="mt-3 font-mono text-xs text-muted-foreground">{section === "Diary" && `${mood} `}{date} · {readTime(body)} min read</p>
          <h2 className="mt-1 text-3xl font-semibold">{title || "Untitled"}</h2>
          {section === "Music" && artist && <p className="text-melon">{artist}</p>}
          {summary && <p className="mt-2 text-muted-foreground">{summary}</p>}
          <div className="mt-3 mb-6 flex flex-wrap gap-1.5">{tagList.map((t) => <TagPill key={t} tag={t} />)}</div>
          <Markdown source={body} />
        </div>
      </div>
    </div>
  );
}
