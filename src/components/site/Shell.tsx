import { Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState, type ReactNode } from "react";
import { Command as CmdIcon, Search, PenSquare } from "lucide-react";
import {
  CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList,
} from "@/components/ui/command";
import { navItems } from "./nav";
import { site } from "@/content/site";
import { diary, deepDives, music } from "@/content/posts";

function Header({ onSearch }: { onSearch: () => void }) {
  return (
    <header className="glass sticky top-0 z-40 border-b">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link to="/" className="press flex items-center gap-2 font-display text-sm font-semibold">
          <span className="grid h-7 w-7 place-items-center rounded-md bg-primary font-mono text-xs text-primary-foreground glow">mk</span>
          <span className="hidden sm:inline">{site.name}</span>
        </Link>
        <nav className="hidden items-center gap-1 md:flex">
          {navItems.slice(1).map((n) => (
            <Link
              key={n.to}
              to={n.to}
              className="press rounded-md px-3 py-1.5 text-sm text-muted-foreground hover:bg-secondary hover:text-foreground"
              activeProps={{ className: "bg-secondary text-foreground" }}
            >
              {n.label}
            </Link>
          ))}
        </nav>
        <button
          onClick={onSearch}
          className="press flex items-center gap-2 rounded-md border bg-secondary/60 px-3 py-1.5 text-sm text-muted-foreground hover:text-foreground"
        >
          <Search className="h-4 w-4" />
          <span className="hidden sm:inline">Search</span>
          <kbd className="hidden items-center gap-0.5 rounded border px-1.5 font-mono text-[10px] sm:flex">
            <CmdIcon className="h-2.5 w-2.5" />K
          </kbd>
        </button>
      </div>
    </header>
  );
}

function BottomNav() {
  return (
    <nav className="glass fixed inset-x-0 bottom-0 z-40 border-t pb-[env(safe-area-inset-bottom)] md:hidden">
      <ul className="grid grid-cols-5">
        {navItems.map((n) => (
          <li key={n.to}>
            <Link
              to={n.to}
              activeOptions={{ exact: n.to === "/" }}
              className="press flex h-16 flex-col items-center justify-center gap-1 text-[11px] text-muted-foreground"
              activeProps={{ className: "text-primary" }}
            >
              <n.icon className="h-5 w-5" />
              {n.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

function Palette({ open, setOpen }: { open: boolean; setOpen: (o: boolean) => void }) {
  const navigate = useNavigate();
  const go = (fn: () => void) => { setOpen(false); fn(); };
  const tags = Array.from(new Set([...diary, ...deepDives].flatMap((p) => p.tags))).sort();
  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput placeholder="Search pages, notes, articles, tags…" />
      <CommandList>
        <CommandEmpty>Nothing found in the garden.</CommandEmpty>
        <CommandGroup heading="Pages">
          {navItems.map((n) => (
            <CommandItem key={n.to} onSelect={() => go(() => navigate({ to: n.to }))}>
              <n.icon className="mr-2 h-4 w-4" />{n.label}
            </CommandItem>
          ))}
          <CommandItem onSelect={() => go(() => navigate({ to: "/admin" }))}>
            <PenSquare className="mr-2 h-4 w-4" />Authoring hub
          </CommandItem>
        </CommandGroup>
        <CommandGroup heading="Deep Dives">
          {deepDives.map((p) => (
            <CommandItem key={p.slug} value={`${p.title} ${p.tags.join(" ")}`} onSelect={() => go(() => navigate({ to: "/deep-dives/$slug", params: { slug: p.slug } }))}>
              {p.title}
            </CommandItem>
          ))}
        </CommandGroup>
        <CommandGroup heading="Garden">
          {diary.map((p) => (
            <CommandItem key={p.slug} value={`${p.title} ${p.tags.join(" ")}`} onSelect={() => go(() => navigate({ to: "/garden/$slug", params: { slug: p.slug } }))}>
              <span className="mr-2">{p.mood}</span>{p.title}
            </CommandItem>
          ))}
        </CommandGroup>
        <CommandGroup heading="Music">
          {music.map((m) => (
            <CommandItem key={m.slug} value={`${m.title} ${m.artist}`} onSelect={() => go(() => navigate({ to: "/music" }))}>
              {m.title} <span className="ml-2 text-muted-foreground">— {m.artist}</span>
            </CommandItem>
          ))}
        </CommandGroup>
        <CommandGroup heading="Filter by tag">
          {tags.map((t) => (
            <CommandItem key={t} value={`tag ${t}`} onSelect={() => go(() => navigate({ to: "/deep-dives", search: { tag: t } }))}>
              <span className="font-mono text-melon">#</span>{t}
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}

export function Shell({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") { e.preventDefault(); setOpen((o) => !o); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);
  return (
    <div className="min-h-screen">
      <div className="no-print"><Header onSearch={() => setOpen(true)} /></div>
      <main className="mx-auto max-w-6xl px-4 pb-28 pt-10 sm:px-6 md:pb-20">{children}</main>
      <footer className="no-print mx-auto hidden max-w-6xl border-t px-6 py-8 font-mono text-xs text-muted-foreground md:flex md:justify-between">
        <span>© {site.name} — {site.tagline}</span>
        <span className="flex gap-4"><a href={`mailto:${site.email}`} className="hover:text-foreground">email</a><a href={site.linkedin} target="_blank" rel="noreferrer" className="hover:text-foreground">linkedin</a><Link to="/admin" className="hover:text-foreground">/admin</Link></span>
      </footer>
      <div className="no-print"><BottomNav /></div>
      <Palette open={open} setOpen={setOpen} />
    </div>
  );
}

export function TagPill({ tag, active, onClick }: { tag: string; active?: boolean; onClick?: () => void }) {
  const cls = `press inline-flex items-center rounded-full border px-2.5 py-0.5 font-mono text-xs ${active ? "border-melon/60 bg-melon/15 text-melon" : "text-muted-foreground hover:text-foreground"}`;
  return onClick ? <button type="button" onClick={onClick} className={cls}>#{tag}</button> : <span className={cls}>#{tag}</span>;
}

export function PageHeader({ eyebrow, title, intro }: { eyebrow: string; title: string; intro?: string }) {
  return (
    <div className="animate-fade-up mb-10">
      <p className="mb-3 font-mono text-xs uppercase tracking-widest text-melon">{eyebrow}</p>
      <h1 className="text-4xl font-semibold sm:text-5xl">{title}</h1>
      {intro && <p className="mt-4 max-w-[60ch] text-muted-foreground">{intro}</p>}
    </div>
  );
}
