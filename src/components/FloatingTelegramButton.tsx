import { motion } from "framer-motion";

interface FloatingTelegramButtonProps {
  telegramLink: string;
  masterId: "alpha" | "wolf";
}

function FloatingTelegramButton({ telegramLink, masterId }: FloatingTelegramButtonProps) {
  return (
    <motion.a
      href={telegramLink}
      target="_blank"
      rel="noreferrer"
      className="fixed bottom-6 right-6 z-[100] inline-flex items-center gap-2 rounded-full border px-5 py-3 text-xs uppercase tracking-[0.2em]"
      style={{
        borderColor: "var(--theme-border-strong)",
        backgroundColor: "var(--theme-accent)",
        color: "var(--theme-accent-ink)",
        boxShadow: "0 0 0 1px var(--theme-border-strong), 0 0 24px var(--theme-glow)",
      }}
      whileHover={{ scale: 1.05, y: -2 }}
      whileTap={{ scale: 0.95 }}
      transition={{ duration: 0.3, ease: [0.34, 1.56, 0.64, 1] }}
    >
      <span
        className="inline-block h-2 w-2 rounded-full"
        style={{ backgroundColor: masterId === "wolf" ? "#0d0d0d" : "#000000" }}
      />
      Book Now
    </motion.a>
  );
}

export default FloatingTelegramButton;
