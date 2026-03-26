import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import type { MasterConfig } from "../config/masters";
import { assetPath } from "../utils/appPaths";
import MonoFlag from "./MonoFlag";

interface AboutProps {
  master: MasterConfig;
}

function About({ master }: AboutProps) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const inView = useInView(sectionRef, { once: true, amount: 0.28 });
  const [aboutImage, setAboutImage] = useState(master.aboutImage);
  const fallbackAboutImage = assetPath("/place/master-portrait.jpg");

  useEffect(() => {
    setAboutImage(master.aboutImage);
  }, [master.aboutImage]);

  return (
    <section id="about" ref={sectionRef} className="relative px-6 py-24 md:px-10">
      <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-center">
        <motion.div
          className="relative overflow-hidden rounded-3xl border bg-ink"
          style={{ borderColor: "var(--theme-border)" }}
          initial={{ opacity: 0, x: -26 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.85, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <img
            src={aboutImage}
            alt={`Master ${master.masterName} portrait`}
            className="h-[480px] w-full object-cover"
            loading="lazy"
            onError={() => {
              if (aboutImage !== fallbackAboutImage) {
                setAboutImage(fallbackAboutImage);
              }
            }}
          />
          <div className="pointer-events-none absolute inset-0 bg-kufiya opacity-[0.18]" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-void to-transparent" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 26 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.85, delay: 0.12, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          {master.id === "alpha" ? (
            <MonoFlag className="mb-6 h-4 w-14 opacity-95" />
          ) : (
            <span className="mb-6 inline-flex rounded-full border border-[#ff3b3b]/65 px-4 py-1 text-xs uppercase tracking-[0.22em] text-[#ff6a6a]">
              Wolf Profile
            </span>
          )}
          <p className="text-xs uppercase tracking-[0.34em] text-paper/60">About The Master</p>
          <h2 className="font-display mt-3 text-4xl text-paper md:text-5xl">Authority in Every Step</h2>
          <p className="mt-4 text-xs uppercase tracking-[0.24em] text-paper/60">
            {"Based in "}
            {master.location}
            {master.age ? (
              <>
                {" • "}
                {master.age}
                {" years old"}
              </>
            ) : null}
          </p>
          <p className="mt-6 text-sm leading-relaxed text-paper/78 md:text-base">{master.aboutLineOne}</p>
          <p className="mt-4 text-sm leading-relaxed text-paper/72 md:text-base">{master.aboutLineTwo}</p>
          <div
            className="mt-8 rounded-2xl border p-5"
            style={{ borderColor: "var(--theme-border)", backgroundColor: "var(--theme-surface)" }}
          >
            <p className="font-arabic text-sm text-paper/90">{master.originLabel}</p>
            <p className="mt-2 text-xs uppercase tracking-[0.22em] text-paper/65">
              {"Legacy • Precision • Presence"}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default About;
