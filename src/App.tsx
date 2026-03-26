import { motion, useScroll, useSpring } from "framer-motion";
import Hero from "./components/Hero";
import Gallery from "./components/Gallery";
import About from "./components/About";
import Services from "./components/Services";
import Booking from "./components/Booking";
import Footer from "./components/Footer";
import FloatingTelegramButton from "./components/FloatingTelegramButton";
import type { MasterConfig } from "./config/masters";
import { buildAppHref } from "./utils/appPaths";

const NAV_ITEMS = [
  { href: "#gallery", label: "Gallery" },
  { href: "#about", label: "About" },
  { href: "#services", label: "Services" },
  { href: "#booking", label: "Contact" },
];

interface AppProps {
  master: MasterConfig;
  onOpenSelector: () => void;
}

function App({ master, onOpenSelector }: AppProps) {
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    mass: 0.2,
  });

  const telegramLink = `https://t.me/${master.telegramUsername}?text=${encodeURIComponent(master.telegramPrefill)}`;
  const xLink = master.xLink ?? `https://x.com/${master.xHandle}`;
  const instagramLink = master.instagramLink ?? `https://instagram.com/${master.instagramHandle}`;
  const storeHref = buildAppHref("/", { master: master.id, view: "store" });

  const handleEnter = () => {
    document.getElementById("gallery")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <motion.div
      data-master-theme={master.id}
      className="relative min-h-screen overflow-x-clip bg-void text-paper"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      <motion.div
        className="fixed left-0 right-0 top-0 z-[90] h-[2px] origin-left"
        style={{ scaleX: progress, backgroundColor: "var(--theme-accent)" }}
      />

      <motion.header
        className="fixed left-0 right-0 top-0 z-[80] border-b bg-void/70 backdrop-blur-md"
        style={{ borderColor: "var(--theme-border)" }}
        initial={{ y: -64, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
      >
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4 md:px-10">
          <a href="#home" className="font-display text-lg tracking-[0.12em] text-paper md:text-xl">
            Master {master.masterName}
          </a>
          <div className="flex items-center gap-3 sm:gap-4">
            <nav className="hidden items-center gap-6 sm:flex">
              {NAV_ITEMS.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="text-xs uppercase tracking-[0.2em] text-paper/70 transition-colors duration-300 hover:text-paper"
                >
                  {item.label}
                </a>
              ))}
              <a
                href={storeHref}
                className="text-xs uppercase tracking-[0.2em] text-paper/70 transition-colors duration-300 hover:text-paper"
              >
                Store
              </a>
              <a
                href={xLink}
                target="_blank"
                rel="noreferrer"
                className="text-xs uppercase tracking-[0.2em] text-paper/70 transition-colors duration-300 hover:text-paper"
              >
                X
              </a>
              <a
                href={instagramLink}
                target="_blank"
                rel="noreferrer"
                className="text-xs uppercase tracking-[0.2em] text-paper/70 transition-colors duration-300 hover:text-paper"
              >
                Instagram
              </a>
            </nav>
            <button
              type="button"
              onClick={onOpenSelector}
              className="rounded-full border px-4 py-2 text-[10px] uppercase tracking-[0.22em] text-paper/85 transition-colors duration-300 hover:text-paper"
              style={{ borderColor: "var(--theme-border)" }}
            >
              Switch
            </button>
          </div>
        </div>
      </motion.header>

      <Hero onEnter={handleEnter} master={master} storeHref={storeHref} />

      <main className="relative z-10">
        <Gallery masterId={master.id} />
        <About master={master} />
        <Services master={master} />
        <Booking
          master={master}
          telegramLink={telegramLink}
          xLink={xLink}
          instagramLink={instagramLink}
          storeHref={storeHref}
        />
      </main>

      <Footer master={master} xLink={xLink} instagramLink={instagramLink} />
      <FloatingTelegramButton telegramLink={telegramLink} masterId={master.id} />
    </motion.div>
  );
}

export default App;
