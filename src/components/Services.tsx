import { motion } from "framer-motion";
import type { MasterConfig } from "../config/masters";

interface ServiceItem {
  title: string;
  detail: string;
  note: string;
}

const SERVICES_BY_MASTER: Record<MasterConfig["id"], ServiceItem[]> = {
  alpha: [
    {
      title: "Virtual Command Session",
      detail: "Private one-to-one guidance with focused control and ritual pacing.",
      note: "Telegram or Instagram video and voice arranged directly in chat.",
    },
    {
      title: "Custom Photo Request",
      detail: "A tailored monochrome set based on your requested mood and framing.",
      note: "Delivered only after direct Telegram or Instagram agreement.",
    },
    {
      title: "In-Person Meeting",
      detail: "For select cases and locations when possible.",
      note: "Availability is discussed privately with the Master.",
    },
    {
      title: "Aftercare Check-In",
      detail: "A short grounding follow-up after an intense session.",
      note: "Scheduled and confirmed in Telegram or Instagram chat.",
    },
    {
      title: "Worn Shoes & Socks",
      detail: "The Master also offers selected old shoes and socks from past sessions.",
      note: "Get in touch directly and receive a good price.",
    },
  ],
  wolf: [
    {
      title: "Wolf Virtual Session",
      detail: "Direct one-on-one control session with strict pacing and structure.",
      note: "Arranged privately in Telegram and delivered on schedule.",
    },
    {
      title: "Custom Media Order",
      detail: "Personalized clips and images based on your role and requested scenario.",
      note: "Only confirmed in direct chat with Master Wolf.",
    },
    {
      title: "Voice Command Drop",
      detail: "Short audio command sets for daily discipline and obedience routines.",
      note: "Available as single drops or weekly bundles.",
    },
    {
      title: "In-Person Option",
      detail: "When possible, selective in-person meetings are discussed privately.",
      note: "Rules and location are always set by the Master.",
    },
    {
      title: "Used Gear Sales",
      detail: "Selected shoes, socks, and private items from the Wolf collection.",
      note: "Chat directly to check stock and receive pricing.",
    },
  ],
};

interface ServicesProps {
  master: MasterConfig;
}

function Services({ master }: ServicesProps) {
  const services = SERVICES_BY_MASTER[master.id];

  return (
    <section id="services" className="relative px-6 py-24 md:px-10">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 26 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <p className="text-xs uppercase tracking-[0.34em] text-paper/60">Services</p>
          <h2 className="font-display mt-3 text-4xl text-paper md:text-5xl">Session Paths</h2>
          <p className="mt-5 max-w-2xl text-sm leading-relaxed text-paper/76 md:text-base">
            No payment gateway is needed. All arrangements happen directly with the Master through Telegram
            or Instagram.
          </p>
        </motion.div>

        <div className="mt-12 grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
          <div className="space-y-6">
            {services.map((service, index) => (
              <motion.article
                key={service.title}
                className={`group relative overflow-hidden rounded-2xl border bg-ink/75 p-7 backdrop-blur-sm ${
                  index === 0 ? "lg:mt-0 lg:mb-10" : "lg:my-10"
                }`}
                style={{ borderColor: "var(--theme-border)" }}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.16 }}
                transition={{ duration: 0.65, delay: index * 0.08, ease: [0.25, 0.46, 0.45, 0.94] }}
                whileHover={{
                  y: -6,
                  scale: 1.02,
                  transition: { duration: 0.3, ease: [0.34, 1.56, 0.64, 1] },
                }}
              >
                <div className="pointer-events-none absolute inset-0 bg-kufiya opacity-0 transition-opacity duration-300 group-hover:opacity-20" />
                <div
                  className="pointer-events-none absolute inset-0 border border-transparent transition-all duration-300 group-hover:shadow-kufiya"
                  style={{ borderColor: "var(--theme-border)" }}
                />
                <h3 className="font-display relative text-2xl text-paper">{service.title}</h3>
                <p className="relative mt-4 text-sm leading-relaxed text-paper/75">{service.detail}</p>
                <p className="relative mt-5 text-xs uppercase tracking-[0.22em] text-paper/60">
                  {service.note}
                </p>
              </motion.article>
            ))}
          </div>

          <motion.figure
            className="group relative overflow-hidden rounded-3xl border bg-char/50 lg:sticky lg:top-24"
            style={{ borderColor: "var(--theme-border)" }}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.75, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <img
              src={master.servicesImage}
              alt="Service showcase"
              className="h-full min-h-[420px] w-full object-cover transition-transform duration-700 group-hover:scale-105"
              loading="lazy"
              onError={(event) => {
                if (event.currentTarget.src.includes("/place/hov.jpg")) return;
                event.currentTarget.src = "/place/hov.jpg";
              }}
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-void/85 via-transparent to-void/20" />
            <div className="pointer-events-none absolute inset-0 bg-kufiya opacity-[0.1]" />
            <figcaption
              className="absolute bottom-5 left-5 right-5 rounded-xl border bg-void/60 px-4 py-3 text-xs uppercase tracking-[0.2em] text-paper/85 backdrop-blur-sm"
              style={{ borderColor: "var(--theme-border)" }}
            >
              Private Telegram / Instagram Booking
            </figcaption>
          </motion.figure>
        </div>
      </div>
    </section>
  );
}

export default Services;
