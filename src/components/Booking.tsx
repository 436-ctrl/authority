import { FormEvent, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { MasterConfig, MasterContactLink } from "../config/masters";

interface BookingProps {
  master: MasterConfig;
  telegramLink: string;
  xLink: string;
  instagramLink: string;
  storeHref: string;
}

const CONTACT_CARD_STYLES: Record<MasterContactLink["platform"], string> = {
  whatsapp: "linear-gradient(145deg, rgba(10, 44, 26, 0.98), rgba(40, 130, 84, 0.92))",
  instagram: "linear-gradient(145deg, rgba(255, 214, 230, 0.98), rgba(255, 241, 245, 0.96))",
  telegram: "linear-gradient(145deg, rgba(227, 238, 255, 0.98), rgba(241, 246, 255, 0.96))",
  x: "linear-gradient(145deg, rgba(230, 236, 247, 0.98), rgba(247, 249, 252, 0.96))",
  facebook: "linear-gradient(145deg, rgba(232, 240, 255, 0.98), rgba(245, 249, 255, 0.96))",
  snapchat: "linear-gradient(145deg, rgba(9, 9, 9, 1), rgba(28, 28, 28, 0.98))",
};

function ContactPlatformIcon({ platform }: { platform: MasterContactLink["platform"] }) {
  const iconClassName = `h-8 w-8 ${platform === "whatsapp" || platform === "snapchat" ? "text-paper" : "text-void"}`;

  switch (platform) {
    case "whatsapp":
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={iconClassName}>
          <path d="M19.05 4.94A9.87 9.87 0 0 0 12 2a9.94 9.94 0 0 0-8.52 15.08L2 22l5.09-1.33A9.95 9.95 0 1 0 19.05 4.94ZM12 20.08a8.1 8.1 0 0 1-4.14-1.14l-.3-.18-3.02.79.81-2.95-.2-.31A8.09 8.09 0 1 1 12 20.08Zm4.44-6.05c-.24-.12-1.42-.7-1.64-.78-.22-.08-.39-.12-.55.12-.16.24-.63.78-.77.94-.14.16-.28.18-.52.06-.24-.12-1.02-.38-1.95-1.2-.72-.64-1.21-1.43-1.35-1.67-.14-.24-.02-.37.1-.49.11-.11.24-.28.36-.42.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.55-1.32-.75-1.81-.2-.47-.4-.4-.55-.41h-.47c-.16 0-.42.06-.64.3-.22.24-.84.82-.84 2 0 1.18.86 2.32.98 2.48.12.16 1.7 2.6 4.12 3.64.58.25 1.04.4 1.39.51.58.18 1.1.16 1.51.1.46-.07 1.42-.58 1.62-1.14.2-.56.2-1.03.14-1.13-.06-.1-.22-.16-.46-.28Z" />
        </svg>
      );
    case "instagram":
      return (
        <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className={iconClassName}>
          <rect x="4.25" y="4.25" width="15.5" height="15.5" rx="4.5" stroke="currentColor" strokeWidth="1.8" />
          <circle cx="12" cy="12" r="3.65" stroke="currentColor" strokeWidth="1.8" />
          <circle cx="17.45" cy="6.55" r="1.15" fill="currentColor" />
        </svg>
      );
    case "telegram":
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={iconClassName}>
          <path d="M20.7 4.37 3.73 10.9c-1.16.47-1.15 1.12-.21 1.41l4.36 1.36 1.69 5.3c.2.56.1.79.69.79.46 0 .66-.21.92-.46l2.12-2.06 4.4 3.24c.8.44 1.38.21 1.58-.74l2.9-13.66c.3-1.17-.45-1.7-1.48-1.21ZM8.56 13.36l9.32-5.88c.47-.29.91-.13.56.18l-7.98 7.21-.31 3.31-1.59-4.82Z" />
        </svg>
      );
    case "x":
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={iconClassName}>
          <path d="M18.9 3H21l-4.58 5.24L21.8 21h-4.93l-3.86-5.06L8.58 21H6.46l4.9-5.6L2.2 3h5.06l3.49 4.59L14.72 3Zm-1.72 16.54h1.16L6.64 4.38H5.39Z" />
        </svg>
      );
    case "facebook":
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={iconClassName}>
          <path d="M13.63 21v-7.76h2.6l.39-3.03h-2.99V8.28c0-.88.25-1.48 1.5-1.48h1.6V4.09c-.28-.04-1.22-.12-2.31-.12-2.29 0-3.86 1.4-3.86 3.98v2.26H8.97v3.03h2.59V21h2.07Z" />
        </svg>
      );
    case "snapchat":
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={iconClassName}>
          <path d="M12 3.2c2.77 0 5.02 2.2 5.02 4.9v2.23c0 .54.24 1.08.66 1.48.3.3.78.54 1.48.68.2.04.33.23.29.43a.4.4 0 0 1-.16.25c-.51.36-1.12.63-1.79.77-.17.04-.28.2-.25.37.15 1.02.87 1.85 1.84 2.11.16.04.27.18.27.35 0 .17-.11.32-.28.36-.9.23-1.86.32-2.81.27-.37-.02-.72.19-.87.53-.41.95-1.34 1.55-2.4 1.55s-1.99-.6-2.4-1.55a.88.88 0 0 0-.87-.53c-.95.05-1.91-.04-2.81-.27a.37.37 0 0 1-.28-.36c0-.17.11-.31.27-.35.97-.26 1.69-1.09 1.84-2.11.03-.17-.08-.33-.25-.37a5.54 5.54 0 0 1-1.79-.77.4.4 0 0 1-.16-.25c-.04-.2.09-.39.29-.43.7-.14 1.18-.38 1.48-.68.42-.4.66-.94.66-1.48V8.1c0-2.7 2.25-4.9 5.02-4.9Z" />
        </svg>
      );
  }
}

function Booking({ master, telegramLink, xLink, instagramLink, storeHref }: BookingProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [date, setDate] = useState("");
  const [showToast, setShowToast] = useState(false);
  const contactLinks = master.contactLinks ?? [];

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
          className="relative z-10 space-y-10"
          initial={{ opacity: 0, y: 26 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <div className="grid gap-10 lg:grid-cols-[1.05fr_1fr]">
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
          </div>

          {contactLinks.length > 0 ? (
            <div className="rounded-[2rem] border border-paper/10 bg-paper/[0.03] p-5 md:p-7">
              <div className="max-w-2xl">
                <p className="text-xs uppercase tracking-[0.32em] text-paper/55">Get In Touch With Your Master</p>
                <h3 className="font-display mt-3 text-3xl text-paper md:text-4xl">Every direct line in one place</h3>
                <p className="mt-4 text-sm leading-relaxed text-paper/72 md:text-base">
                  For Master {master.masterName}, you can reach him on every platform below. Telegram and WhatsApp are the
                  fastest options for a quick reply.
                </p>
              </div>

              <div className="mt-8 grid gap-4 lg:grid-cols-2">
                {contactLinks.map((contact) => (
                  <motion.a
                    key={contact.platform}
                    href={contact.href}
                    target="_blank"
                    rel="noreferrer"
                    className="group flex min-h-[7rem] items-center overflow-hidden rounded-[1.6rem] border border-paper/15 bg-paper text-void shadow-[0_18px_60px_rgba(0,0,0,0.18)]"
                    whileHover={{ y: -6, scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    transition={{ duration: 0.28, ease: [0.34, 1.56, 0.64, 1] }}
                  >
                    <div
                      className="flex h-full w-28 shrink-0 items-center justify-center self-stretch"
                      style={{ background: CONTACT_CARD_STYLES[contact.platform] }}
                    >
                      <ContactPlatformIcon platform={contact.platform} />
                    </div>
                    <div className="min-w-0 flex-1 px-5 py-4">
                      <p className="text-[11px] uppercase tracking-[0.28em] text-void/45">{contact.label}</p>
                      <p className="mt-2 truncate font-display text-2xl leading-none text-void md:text-[2rem]">
                        {contact.value}
                      </p>
                    </div>
                    <div className="pr-5 text-xl text-void/35 transition-transform duration-300 group-hover:translate-x-1">
                      -&gt;
                    </div>
                  </motion.a>
                ))}
              </div>
            </div>
          ) : null}
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
