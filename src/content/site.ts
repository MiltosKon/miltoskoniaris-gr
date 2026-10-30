export const site = {
  name: "Miltos Koniaris",
  fullName: "Miltiadis Koniaris",
  role: "QA Automation Engineer",
  tagline: "Teetering in the unknown.",
  location: "Chalkida, Greece",
  email: "koniaris.miltos@gmail.com",
  linkedin: "https://gr.linkedin.com/in/miltiadis-koniaris",
  intro:
    "QA Automation Engineer working across performance testing, API automation and AI-driven test orchestration. Expert Claude user. This is my garden: half portfolio, half lab notebook.",
  now: "Right now, I'm deep in the trenches of advanced AI orchestration. I'm leveraging Claude Code to build autonomous \"QA Councils\" — meta-architectures where specialized AI agents collaborate to generate, execute, and self-heal test automation suites. I design custom skills, integrate them into local development loops, and teach agents how to handle end-to-end testing lifecycles autonomously.",
};

export type Job = { company: string; role: string; team: string; period: string; summary: string; achievements: string[]; stack: string[] };

export const jobs: Job[] = [
  {
    company: "Novibet",
    role: "QA Automation Engineer",
    team: "Sportsbook team · Heraklion",
    period: "Mar 2026 — Present",
    summary: "Backend quality ownership, isolated performance testing and AI-driven test generation for Sportsbook microservices.",
    achievements: [
      "Sole owner of daily API regression triage from nightly runs — separating real defects from automation bugs fast.",
      "Built a containerized load-testing framework with system architects (NBomber, Testcontainers, Docker, WireMock, Toxiproxy); authored 40+ isolated performance tests for Betslips and Cache services.",
      "Designed a multi-agent Claude framework: Analyzer, Mocker, Developer and an SLO agent wired to Grafana MCP to set and validate Service Level Objectives.",
      "Automated version-to-version load test comparison (e.g. Betslips v1.49 vs v1.50) into PDF dashboards for non-technical stakeholders.",
    ],
    stack: ["C#", "NBomber", "Testcontainers", "WireMock", "Toxiproxy", "Claude", "Grafana MCP"],
  },
  {
    company: "Novibet",
    role: "QA Engineer",
    team: "Sportsbook team · Heraklion",
    period: "Sep 2024 — Mar 2026",
    summary: "Lead contributor for Sportsbook load testing and API automation.",
    achievements: [
      "Refactored 80 failing legacy CRM API tests (Selenium.NET, RestSharp) into 150 valuable, working tests.",
      "Ran k6 scalability tests during the AKS migration, monitored in Grafana, and trained the whole Sportsbook QA chapter on the process.",
      "Wrote complex k6 scripts simulating realistic end-to-end user behaviour and high-volume transactions.",
      "Built a Report Portal API utility producing a single-glance daily Excel report, cutting morning triage time for the QA team.",
      "Owned backend QA for my scrum team: test plans and structured cycles in Jira/Xray.",
    ],
    stack: ["k6", "Selenium.NET", "RestSharp", "AKS", "Grafana", "Report Portal", "Jira/Xray"],
  },
  {
    company: "Vodafone",
    role: "QA Engineer",
    team: "Payments & Web team · Heraklion",
    period: "Feb 2023 — Sep 2024",
    summary: "Automation, integration testing and production support for payments and web.",
    achievements: [
      "Ensured every released feature had automation coverage (Selenium, Karate) plus Splunk monitors.",
      "Led a team of four QA engineers building the first automation suite for the TOBI chatbot.",
      "Performed SIT and reviewed High-Level Designs against technical and functional requirements.",
      "First point of contact for 3rd-level support on production incidents.",
      "Built an internal Vodafone TV tool measuring promotion effectiveness for marketing.",
    ],
    stack: ["Selenium", "Karate", "Splunk", "Python"],
  },
  {
    company: "Vodafone",
    role: "QA Engineer Intern",
    team: "QA Chapter · Heraklion",
    period: "Jul 2022 — Jan 2023",
    summary: "Internship extended for performance; first intern offered a full-time role.",
    achievements: [
      "Revitalized outdated payment scenarios with Selenium + Behave (Python).",
      "API testing with Karate and Insomnia collections with macros.",
    ],
    stack: ["Python", "Behave", "Karate", "Insomnia"],
  },
  {
    company: "Self-employed",
    role: "Math & Science Tutor",
    team: "Remote",
    period: "2021 — 2023",
    summary: "Planned lessons months ahead and made remote sessions interactive, improving students' exam results.",
    achievements: [],
    stack: [],
  },
];

export const skills: Record<string, string[]> = {
  "AI Orchestration": ["Claude Code (expert)", "Multi-agent systems", "Custom skills", "MCP", "Prompt engineering", "RAG"],
  Performance: ["k6", "NBomber", "Testcontainers", "WireMock", "Toxiproxy"],
  Automation: ["Selenium (Python/.NET)", "Karate", "RestSharp", "Behave", "Django"],
  Observability: ["Grafana", "Kibana", "Splunk", "Instana", "Report Portal"],
  Tools: ["Jira & Xray", "Postman", "Insomnia", "Docker", "Caddy"],
  Languages: ["Python", "C#", "JavaScript"],
};

export const certifications = ["ISTQB Foundation Level", "English Proficiency (C2)"];

export const projects = [
  { title: "Applied AI & RAG systems", body: "Explored vector-space retrieval to enrich language models with context-aware knowledge bases for deterministic validation." },
  { title: "Multi-node test & automation infrastructure", body: "Dual-node private setup with a Dockerized Caddy edge gateway (reverse proxy, automated SSL) routing to n8n, PostgreSQL and RStudio — tracked via GitOps." },
  { title: "Smart Beekeeper Management Hub", body: "Prototype platform for managing multi-location beehives with local weather, health histories and colony logs." },
];
