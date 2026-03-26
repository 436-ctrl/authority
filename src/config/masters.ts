export type MasterId = "alpha" | "wolf";

export interface MasterConfig {
  id: MasterId;
  masterName: string;
  location: string;
  age?: number;
  masterTitle: string;
  heroSubline: string;
  originLabel: string;
  aboutLineOne: string;
  aboutLineTwo: string;
  heroCover: string;
  floatingImage: string;
  aboutImage: string;
  servicesImage: string;
  telegramUsername: string;
  xHandle: string;
  xLink?: string;
  instagramHandle: string;
  instagramLink?: string;
  telegramPrefill: string;
}

export const MASTER_SELECTION_KEY = "selected_master_id";

export const MASTER_CONFIGS: Record<MasterId, MasterConfig> = {
  alpha: {
    id: "alpha",
    masterName: "Alpha Phalastine",
    location: "Lebanon",
    age: 24,
    masterTitle: "Palestinian Foot Master",
    heroSubline: "\u0627\u0644\u0633\u064A\u0637\u0631\u0629 \u0639\u0644\u0649 \u0643\u0644 \u062E\u0637\u0648\u0629 \u2022 I control every step",
    originLabel: "\u0645\u0646 \u0641\u0644\u0633\u0637\u064A\u0646",
    aboutLineOne:
      "Master Alpha Phalastine is rooted in Palestinian identity and disciplined dominance. The kufiya is not decoration, it is inheritance. Each session is built with composure, control, and attention to ritual detail.",
    aboutLineTwo:
      "In silence, every movement carries weight. In command, every boundary is clear. You arrive, you surrender your pace, and you follow the direction set by the Master.",
    heroCover: "/place/hero-cover.png",
    floatingImage: "/place/hero-floating-foot.png",
    aboutImage: "/place/master-portrait.jpg",
    servicesImage: "/place/hov.jpg",
    telegramUsername: "Alphafalastini",
    xHandle: "AlphaFalastini",
    xLink: "https://x.com/AlphaFalastini",
    instagramHandle: "alpha.falastini",
    instagramLink: "https://instagram.com/alpha.falastini?igsh=YjlnZXlrMHI4ZG9y",
    telegramPrefill: "Assalamualaikum Master, I want to book a session \uD83D\uDC63",
  },
  wolf: {
    id: "wolf",
    masterName: "Wolf",
    location: "Syria",
    age: 30,
    masterTitle: "Syrian Wolf Master",
    heroSubline: "\u0633\u064A\u062F \u0627\u0644\u0630\u0626\u0628 \u0645\u0646 \u0633\u0648\u0631\u064A\u0627 \u2022 Obey the Wolf",
    originLabel: "\u0645\u0646 \u0633\u0648\u0631\u064A\u0627",
    aboutLineOne:
      "Master Wolf moves with a colder tempo: direct command, tighter control, and clean red-black authority. Every session is measured, deliberate, and fully on his terms.",
    aboutLineTwo:
      "You enter the den to follow instructions, not negotiate them. Respect the rules, keep your focus, and earn every second under the Wolf's attention.",
    heroCover: "/wolf.png",
    floatingImage: "/place/wolf-floating-foot.png",
    aboutImage: "/place/wolf-portrait.jpg",
    servicesImage: "/place/wolf-services.jpg",
    telegramUsername: "Directact90",
    xHandle: "DirectAct",
    xLink: "https://x.com/DirectAct",
    instagramHandle: "Directact90",
    instagramLink: "https://www.instagram.com/Directact90",
    telegramPrefill: "Assalamualaikum Master Wolf, I want to book a session \uD83D\uDC3A",
  },
};

export const isMasterId = (value: string | null): value is MasterId =>
  value === "alpha" || value === "wolf";
