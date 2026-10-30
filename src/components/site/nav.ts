import { Home, FileText, Sprout, Cpu, Music } from "lucide-react";

export const navItems = [
  { to: "/", label: "Home", icon: Home },
  { to: "/cv", label: "CV", icon: FileText },
  { to: "/garden", label: "Garden", icon: Sprout },
  { to: "/deep-dives", label: "Deep Dives", icon: Cpu },
  { to: "/music", label: "Music", icon: Music },
] as const;
