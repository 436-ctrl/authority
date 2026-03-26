import type { MasterConfig } from "../config/masters";
import MonoFlag from "./MonoFlag";

interface FooterProps {
  master: MasterConfig;
  xLink: string;
  instagramLink: string;
}

function Footer({ master, xLink, instagramLink }: FooterProps) {
  return (
    <footer className="relative border-t px-6 py-10 md:px-10" style={{ borderColor: "var(--theme-border)" }}>
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-left">
        <div className="flex items-center gap-4">
          {master.id === "alpha" ? (
            <MonoFlag className="h-4 w-12 opacity-100" />
          ) : (
            <span className="inline-flex rounded-full border border-[#ff3b3b]/70 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-[#ff6a6a]">
              Wolf
            </span>
          )}
          <p className="font-arabic text-sm text-paper/90">{master.originLabel}</p>
        </div>
        <div>
          <p className="font-display text-lg tracking-[0.12em] text-paper">Master {master.masterName}</p>
          <p className="mt-1 text-xs uppercase tracking-[0.18em] text-paper/55">
            {"Master Presence • Private Telegram / Instagram Booking"}
          </p>
          <div className="mt-2 flex items-center justify-center gap-3 sm:justify-start">
            <a
              href={xLink}
              target="_blank"
              rel="noreferrer"
              className="text-xs uppercase tracking-[0.18em] text-paper/70 transition-colors duration-300 hover:text-paper"
            >
              X @{master.xHandle}
            </a>
            <a
              href={instagramLink}
              target="_blank"
              rel="noreferrer"
              className="text-xs uppercase tracking-[0.18em] text-paper/70 transition-colors duration-300 hover:text-paper"
            >
              Instagram @{master.instagramHandle}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
