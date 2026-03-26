import { useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useParallax } from "../hooks/useParallax";
import type { MasterConfig } from "../config/masters";
import MonoFlag from "./MonoFlag";

interface HeroProps {
  onEnter: () => void;
  master: MasterConfig;
  storeHref: string;
}

function Hero({ onEnter, master, storeHref }: HeroProps) {
  const { scrollYProgress } = useScroll();
  const coverY = useParallax(scrollYProgress, -96);
  const glowY = useParallax(scrollYProgress, -56);
  const coverScale = useTransform(scrollYProgress, [0, 1], [1.08, 1]);

  const [isHovering, setIsHovering] = useState(false);
  const [coverSrc, setCoverSrc] = useState(master.heroCover);
  const [floatingSrc, setFloatingSrc] = useState(master.floatingImage);
  const [showFloating, setShowFloating] = useState(true);

  useEffect(() => {
    setCoverSrc(master.heroCover);
    setFloatingSrc(master.floatingImage);
    setShowFloating(true);
  }, [master.id, master.heroCover, master.floatingImage]);

  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 pb-16 pt-24 md:px-10"
    >
      {/* Cover image keeps the hero cinematic while using transform-only parallax for smooth motion. */}
      <motion.div
        className="absolute inset-[-2%] bg-cover bg-center"
        style={{
          y: coverY,
          scale: coverScale,
          backgroundImage: `url('${coverSrc}')`,
        }}
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-void/35" aria-hidden="true" />
      <motion.div
        className="absolute inset-0"
        style={{
          y: glowY,
          background:
            master.id === "wolf"
              ? "radial-gradient(circle at 50% 0%, rgba(255,34,34,0.18), transparent 58%)"
              : "radial-gradient(circle at 50% 0%, rgba(255,255,255,0.14), transparent 58%)",
        }}
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-void/30 via-void/72 to-void" aria-hidden="true" />

      <motion.div
        className="relative z-10 mx-auto max-w-3xl text-center"
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.1, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        {master.id === "alpha" ? (
          <MonoFlag className="mx-auto mb-8 h-4 w-12 opacity-95" />
        ) : (
          <div className="mb-8 text-center">
            <span className="inline-flex items-center rounded-full border border-[#ff3b3b]/70 px-4 py-1 text-xs uppercase tracking-[0.28em] text-[#ff6a6a]">
              Wolf Den
            </span>
          </div>
        )}
        <motion.p
          className="mb-4 text-xs uppercase tracking-[0.35em] text-paper/65"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.7 }}
        >
          Exclusive Experience
        </motion.p>
        <motion.h1
          className="font-display text-5xl leading-none tracking-[0.06em] text-paper sm:text-6xl md:text-7xl"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.9 }}
        >
          Master {master.masterName}
        </motion.h1>
        <motion.p
          className="mt-5 text-sm uppercase tracking-[0.28em] md:text-base"
          style={{ color: master.id === "wolf" ? "#ff6666" : "rgba(255,255,255,0.75)" }}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45, duration: 0.8 }}
        >
          {master.masterTitle}
        </motion.p>
        <motion.p
          className="mt-3 text-xs uppercase tracking-[0.22em] text-paper/60 md:text-sm"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55, duration: 0.8 }}
        >
          {"Based in "}
          {master.location}
          {master.age ? (
            <>
              {" • "}
              {master.age}
              {" y/o"}
            </>
          ) : null}
        </motion.p>
        <motion.p
          className="mt-8 text-sm text-paper/80 md:text-lg"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          {master.heroSubline}
        </motion.p>

        <div className="mt-12 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <motion.button
            type="button"
            onClick={onEnter}
            onHoverStart={() => setIsHovering(true)}
            onHoverEnd={() => setIsHovering(false)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            transition={{ duration: 0.35, ease: [0.34, 1.56, 0.64, 1] }}
            className="relative overflow-hidden rounded-full border px-10 py-4 text-xs uppercase tracking-[0.35em] text-paper"
            style={{ borderColor: "var(--theme-border-strong)" }}
          >
            <span className="relative z-10">Enter</span>
            <motion.span
              className="pointer-events-none absolute inset-0 rounded-full border"
              style={{ borderColor: "var(--theme-border-strong)" }}
              animate={
                isHovering
                  ? { scale: [1, 1.45], opacity: [0.45, 0] }
                  : { scale: 1, opacity: 0 }
              }
              transition={
                isHovering
                  ? { duration: 1.1, repeat: Number.POSITIVE_INFINITY, ease: "easeOut" }
                  : { duration: 0.2 }
              }
            />
            <motion.span
              className="pointer-events-none absolute inset-0 rounded-full border"
              style={{ borderColor: "var(--theme-border)" }}
              animate={
                isHovering
                  ? { scale: [1, 1.8], opacity: [0.35, 0] }
                  : { scale: 1, opacity: 0 }
              }
              transition={
                isHovering
                  ? {
                      duration: 1.2,
                      delay: 0.2,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "easeOut",
                    }
                  : { duration: 0.2 }
              }
            />
          </motion.button>

          <motion.a
            href={storeHref}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            transition={{ duration: 0.35, ease: [0.34, 1.56, 0.64, 1] }}
            className="rounded-full px-8 py-4 text-xs uppercase tracking-[0.26em]"
            style={{
              backgroundColor: "var(--theme-accent)",
              color: "var(--theme-accent-ink)",
              boxShadow: "0 0 0 1px var(--theme-border-strong), 0 0 24px var(--theme-glow)",
            }}
          >
            Buy In Store
          </motion.a>
        </div>
      </motion.div>

      {showFloating ? (
        <motion.div
          className="pointer-events-none absolute bottom-12 right-8 hidden md:block"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 0.6 }}
        >
          <motion.img
            src={floatingSrc}
            alt="Floating hero visual"
            className="h-[220px] w-[150px] object-contain opacity-85"
            style={{ filter: "drop-shadow(0 0 22px var(--theme-glow))" }}
            animate={{ y: [-10, 10, -10], rotate: [-2, 2, -2] }}
            transition={{
              duration: 8,
              repeat: Number.POSITIVE_INFINITY,
              ease: [0.76, 0, 0.24, 1],
            }}
            onError={() => {
              if (floatingSrc !== "/place/hero-floating-foot.png") {
                setFloatingSrc("/place/hero-floating-foot.png");
                return;
              }
              setShowFloating(false);
            }}
          />
        </motion.div>
      ) : null}

      <img
        src={coverSrc}
        alt=""
        className="hidden"
        onError={() => {
          if (coverSrc !== "/place/hero-cover.png") {
            setCoverSrc("/place/hero-cover.png");
          }
        }}
      />
    </section>
  );
}

export default Hero;
