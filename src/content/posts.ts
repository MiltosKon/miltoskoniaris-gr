export type DiaryEntry = { slug: string; title: string; date: string; mood: string; tags: string[]; summary: string; body: string };
export type DeepDive = { slug: string; title: string; date: string; tags: string[]; summary: string; body: string };
export type MusicPick = { slug: string; title: string; artist: string; kind: "Album" | "Track"; year: number; tags: string[]; note: string; cover: string; embed?: string };

export const diary: DiaryEntry[] = [
  {
    slug: "teaching-agents-to-test",
    title: "Teaching agents to test",
    date: "2026-10-30",
    mood: "🌀",
    tags: ["ai", "qa", "claude"],
    summary: "Notes from building QA Councils with Claude Code.",
    body: "Spent the week designing custom skills so agents can own a full testing loop: read the code, mock what's upstream, write the test, run it, and fix it when it breaks.\n\nThe hard part isn't generation. It's teaching an agent **when it doesn't know yet**.",
  },
];

export const deepDives: DeepDive[] = [
  {
    slug: "agentic-testing-qa-councils",
    title: "Agentic Testing: building autonomous QA Councils with Claude",
    date: "2026-10-30",
    tags: ["ai", "qa", "claude", "performance"],
    summary: "A meta-architecture where specialized AI agents collaborate to generate, execute and self-heal test suites.",
    body: `A QA Council is a group of specialized agents, each owning one part of the testing lifecycle, coordinated by Claude Code.

## The council

| Agent | Responsibility |
| --- | --- |
| Analyzer | Reads a microservice codebase and proposes candidate test scenarios |
| Mocker | Finds upstream dependencies and generates stubs (WireMock) |
| Developer | Writes the load / API tests (NBomber, k6) |
| SLO agent | Connects to Grafana MCP to set and validate Service Level Objectives |

## The loop

\`\`\`text
analyze → mock → generate → execute → compare → self-heal
\`\`\`

Each run is isolated with Testcontainers and Toxiproxy, so results don't depend on shared environments.

## Reporting

A reporting agent compares artifacts between service versions (e.g. v1.49 vs v1.50) and produces a PDF summary for non-technical stakeholders: improvements, regressions and points of concern.

## Takeaways

- Small, specialized agents beat one giant prompt
- Custom skills make agent behaviour repeatable
- Keep humans in the loop for judgement calls`,
  },
];

export const music: MusicPick[] = [
  { slug: "in-rainbows", title: "In Rainbows", artist: "Radiohead", kind: "Album", year: 2007, tags: ["alt", "focus"], note: "The album I reach for when a deploy goes sideways.", cover: "https://upload.wikimedia.org/wikipedia/en/1/14/Inrainbowscover.png", embed: "https://open.spotify.com/embed/album/5vkqYmiPBYLaalcmjujWxK" },
  { slug: "music-for-airports", title: "Music for Airports", artist: "Brian Eno", kind: "Album", year: 1978, tags: ["ambient", "focus"], note: "Deep-work fuel. Ambient in the truest sense.", cover: "https://upload.wikimedia.org/wikipedia/en/6/68/Ambient1_cover.jpg", embed: "https://open.spotify.com/embed/album/5PVAVEN7P6Fiu1VAdaOGbe" },
  { slug: "kid-a", title: "Kid A", artist: "Radiohead", kind: "Album", year: 2000, tags: ["alt", "electronic"], note: "Teetering in the unknown, sonically.", cover: "https://upload.wikimedia.org/wikipedia/en/b/b5/Radiohead.kida.albumart.jpg" },
  { slug: "selected-ambient-works", title: "Selected Ambient Works 85–92", artist: "Aphex Twin", kind: "Album", year: 1992, tags: ["electronic", "ambient"], note: "Refactoring soundtrack.", cover: "https://upload.wikimedia.org/wikipedia/en/8/82/Selected_Ambient_Works_85-92.png" },
  { slug: "teardrop", title: "Teardrop", artist: "Massive Attack", kind: "Track", year: 1998, tags: ["trip-hop"], note: "Late-night on-call companion.", cover: "https://upload.wikimedia.org/wikipedia/en/8/81/Massive_Attack_-_Mezzanine.png", embed: "https://open.spotify.com/embed/track/67Hna13dNDkZvBpTXRIaOJ" },
  { slug: "nuvole-bianche", title: "Nuvole Bianche", artist: "Ludovico Einaudi", kind: "Track", year: 2004, tags: ["piano", "focus"], note: "For writing prose instead of code.", cover: "https://upload.wikimedia.org/wikipedia/en/2/2d/Ludovico_Einaudi_-_Una_Mattina.jpg" },
];
