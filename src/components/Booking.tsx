import { FormEvent, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { MasterConfig } from "../config/masters";

interface BookingProps {
  master: MasterConfig;
  telegramLink: string;
  xLink: string;
  instagramLink: string;
  storeHref: string;
}

function Booking({ master, telegramLink, xLink, instagramLink, storeHref }: BookingProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [date, setDate] = useState("");
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    if (!showToast) return;
    const timer = window.setTimeout(() => setShowToast(false), 2600);
    return () => window.clearTimeout(timer);
  }, [showToast]);

  const openTelegram = (message: string) => {
    // Build a deep link with prefilled text so users land directly in chat.
    const username = telegramLink.replace("https://t.me/", "").split("?")[0] || master.telegramUsername;
    const url = `https://t.me/${username}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const draftMessage = [
      master.telegramPrefill,
      name ? `Name: ${name}` : "",
      email ? `Email: ${email}` : "",
      date ? `Preferred date: ${date}` : "",
    ]
      .filter(Boolean)
      .join("\n");

    openTelegram(draftMessage);
    setShowToast(true);
    setName("");
    setEmail("");
    setDate("");
  };

  return (
    <section id="booking" className="relative px-6 pb-28 pt-24 md:px-10">
      <div className="mx-auto max-w-6xl overflow-hidden rounded-3xl border bg-ink/80 p-8 md:p-12" style={{ borderColor: "var(--theme-border)" }}>
        <div className="pointer-events-none absolute inset-0 bg-kufiya opacity-[0.15]" />
        <motion.div
          className="relative z-10 grid gap-10 lg:grid-cols-[1.05fr_1fr]"
          initial={{ opacity: 0, y: 26 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <div>
            <p className="text-xs uppercase tracking-[0.34em] text-paper/60">Book A Session</p>
            <h2 className="font-display mt-3 text-4xl text-paper md:text-5xl">Enter The Master&apos;s Chat</h2>
            <p className="mt-5 max-w-xl text-sm leading-relaxed text-paper/80 md:text-base">
              All bookings happen directly on Telegram or Instagram. No payment gateway, no checkout, no delay.
              Click once and speak to Master {master.masterName} privately.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <motion.a
                href={telegramLink}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center rounded-full px-8 py-4 text-xs uppercase tracking-[0.3em]"
                style={{
                  backgroundColor: "var(--theme-accent)",
                  color: "var(--theme-accent-ink)",
                  boxShadow: "0 0 0 1px var(--theme-border-strong), 0 0 24px var(--theme-glow)",
                }}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                transition={{ duration: 0.35, ease: [0.34, 1.56, 0.64, 1] }}
              >
                Message On Telegram
              </motion.a>
              <motion.a
                href={xLink}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center rounded-full border px-6 py-4 text-xs uppercase tracking-[0.24em] text-paper"
                style={{ borderColor: "var(--theme-border-strong)" }}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                transition={{ duration: 0.35, ease: [0.34, 1.56, 0.64, 1] }}
              >
                X @{master.xHandle}
              </motion.a>
              <motion.a
                href={instagramLink}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center rounded-full border px-6 py-4 text-xs uppercase tracking-[0.24em] text-paper"
                style={{ borderColor: "var(--theme-border-strong)" }}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                transition={{ duration: 0.35, ease: [0.34, 1.56, 0.64, 1] }}
              >
                Instagram @{master.instagramHandle}
              </motion.a>
              <motion.a
                href={storeHref}
                className="inline-flex items-center justify-center rounded-full border px-6 py-4 text-xs uppercase tracking-[0.24em] text-paper"
                style={{ borderColor: "var(--theme-border-strong)" }}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                transition={{ duration: 0.35, ease: [0.34, 1.56, 0.64, 1] }}
              >
                Visit Store
              </motion.a>
            </div>
          </div>

          <form
            className="relative space-y-4 rounded-2xl border bg-void/75 p-6"
            style={{ borderColor: "var(--theme-border)" }}
            onSubmit={handleSubmit}
          >
            <p className="text-xs uppercase tracking-[0.2em] text-paper/65">Optional quick details</p>
            <input
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="Name"
              className="input-shell"
            />
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="Email"
              className="input-shell"
            />
            <input
              type="date"
              value={date}
              onChange={(event) => setDate(event.target.value)}
              className="input-shell"
            />
            <motion.button
              type="submit"
              className="w-full rounded-xl border px-5 py-3 text-xs uppercase tracking-[0.24em] text-paper"
              style={{ borderColor: "var(--theme-border-strong)" }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Send To Telegram
            </motion.button>
          </form>
        </motion.div>
      </div>

      <AnimatePresence>
        {showToast ? (
          <motion.div
            className="fixed bottom-28 left-1/2 z-[130] -translate-x-1/2 rounded-full border bg-ink/95 px-6 py-3 text-xs uppercase tracking-[0.22em] text-paper"
            style={{ borderColor: "var(--theme-border-strong)" }}
            initial={{ opacity: 0, y: 16, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.35 }}
            role="status"
            aria-live="polite"
          >
            Message sent to Telegram
          </motion.div>
        ) : null}
      </AnimatePresence>
    </section>
  );
}

export default Booking;
