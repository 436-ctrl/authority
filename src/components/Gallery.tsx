import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import type { MasterId } from "../config/masters";
import { assetPath } from "../utils/appPaths";
import Lightbox, { type GalleryItem } from "./Lightbox";

const ALPHA_GALLERY_ITEMS: GalleryItem[] = [
  { id: 1, src: assetPath("/place/gallery-01.jpg"), alt: "Foot session by Master", caption: "Stronger Than You" },
  { id: 2, src: assetPath("/place/gallery-02.jpg"), alt: "Foot session by Master", caption: "Kneel, Then Breathe" },
  //{ id: 3, src: assetPath("/place/gallery-03.jpg"), alt: "Foot session by Master", caption: "Step Into Silence" },
  { id: 4, src: assetPath("/place/gallery-04.jpg"), alt: "Foot session by Master", caption: "Obey Without Questions" },
  { id: 5, src: assetPath("/place/gallery-05.jpg"), alt: "Foot session by Master", caption: "My Pace, Your Prayer" },
  { id: 6, src: assetPath("/place/gallery-06.jpg"), alt: "Foot session by Master", caption: "Earn Every Glance" },
  { id: 7, src: assetPath("/place/gallery-07.jpg"), alt: "Foot session by Master", caption: "Shoe Dust Above Bloodlines" },
  { id: 8, src: assetPath("/place/hov.jpg"), alt: "Foot session by Master", caption: "Worth More Than You" },
  { id: 9, src: assetPath("/place/gallery-08.jpg"), alt: "Foot session by Master", caption: "You Follow, I Lead" },
 
  { id: 10, src: assetPath("/place/gallery-09.jpg"), alt: "Foot session by Master", caption: "Stay Low, Stay Loyal" },
];

const WOLF_GALLERY_ITEMS: GalleryItem[] = [
  { id: 201, src: assetPath("/place/wolf-gallery-01.jpg"), alt: "Wolf session frame", caption: "The Den Is Not A Democracy" },
  { id: 202, src: assetPath("/place/wolf-gallery-02.jpg"), alt: "Wolf session frame", caption: "You Enter On My Terms" },
  { id: 203, src: assetPath("/place/wolf-gallery-03.jpg"), alt: "Wolf session frame", caption: "Silence. Focus. Obey." },
  { id: 204, src: assetPath("/place/wolf-gallery-08.jpg"), alt: "Wolf session frame", caption: "Look Up Only When Told" },

  { id: 205, src: assetPath("/place/wolf-gallery-05.jpg"), alt: "Wolf session frame", caption: "Every Step Is Command" },
  { id: 206, src: assetPath("/place/wolf-gallery-04.jpg"), alt: "Wolf session frame", caption: "No Bargains In The Den" },
  { id: 207, src: assetPath("/place/wolf-gallery-06.jpg"), alt: "Wolf session frame", caption: "Stay Sharp, Stay Useful" },
  { id: 208, src: assetPath("/place/wolf-gallery-07.jpg"), alt: "Wolf session frame", caption: "Red Line. Black Rules." },
  { id: 209, src: assetPath("/place/wolf-gallery-09.jpg"), alt: "Wolf session frame", caption: "Your Place Is Under The Wolf" },
  { id: 210, src: assetPath("/place/wolf-gallery-10.jpg"), alt: "Wolf session frame", caption: "I Decide The Pace" },
];

interface GalleryProps {
  masterId: MasterId;
}

function Gallery({ masterId }: GalleryProps) {
  const [activeItem, setActiveItem] = useState<GalleryItem | null>(null);
  const fallbackGalleryImage = assetPath("/place/gallery-01.jpg");

  const galleryItems = useMemo(
    () => (masterId === "wolf" ? WOLF_GALLERY_ITEMS : ALPHA_GALLERY_ITEMS),
    [masterId],
  );

  return (
    <section id="gallery" className="relative px-6 py-24 md:px-10">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <p className="text-xs uppercase tracking-[0.34em] text-paper/60">Gallery</p>
          <h2 className="font-display mt-3 text-4xl text-paper md:text-5xl">
            {masterId === "wolf" ? "Wolf Archive" : "Ritual Archive"}
          </h2>
          <p className="mt-5 max-w-2xl text-sm leading-relaxed text-paper/72 md:text-base">
            {masterId === "wolf"
              ? "A red-black sequence of command and pressure. Click any frame to enter the full view."
              : "A monochrome sequence of control, presence, and curated tension. Click any frame to enter the full view."}
          </p>
        </motion.div>

        <motion.div
          className="mt-12 columns-2 gap-4 lg:columns-4"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          variants={{
            hidden: { opacity: 0 },
            show: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
          }}
        >
          {/* CSS columns create a lightweight masonry layout without extra JS layout work. */}
          {galleryItems.map((item) => (
            <motion.button
              key={item.id}
              type="button"
              className="group relative mb-4 block w-full break-inside-avoid overflow-hidden rounded-2xl border border-paper/20 bg-char/25 text-left"
              variants={{
                hidden: { opacity: 0, y: 20 },
                show: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] },
                },
              }}
              whileHover={{
                y: -8,
                scale: 1.01,
                transition: { duration: 0.35, ease: [0.34, 1.56, 0.64, 1] },
              }}
              onClick={() => setActiveItem(item)}
            >
              <motion.img
                src={item.src}
                alt={item.alt}
                className={`h-full w-full rounded-2xl object-cover transition-transform duration-500 group-hover:scale-105 ${
                  masterId === "alpha" ? "" : ""
                }`}
                layoutId={`gallery-${item.id}`}
                loading="lazy"
                onError={(event) => {
                  if (event.currentTarget.src.includes("/place/gallery-01.jpg")) return;
                  event.currentTarget.src = fallbackGalleryImage;
                }}
              />
              <div className="pointer-events-none absolute inset-0 bg-kufiya opacity-0 mix-blend-screen transition-opacity duration-500 group-hover:opacity-20" />
              <div
                className="pointer-events-none absolute inset-0 rounded-2xl border border-transparent transition-all duration-300 group-hover:shadow-kufiya"
                style={{ borderColor: "var(--theme-border-strong)" }}
              />
              <div className="pointer-events-none absolute inset-x-3 bottom-3 translate-y-4 rounded-lg border border-paper/30 bg-void/80 px-3 py-2 text-[11px] uppercase tracking-[0.2em] text-paper/90 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                {item.caption}
              </div>
            </motion.button>
          ))}
        </motion.div>
      </div>

      <Lightbox item={activeItem} onClose={() => setActiveItem(null)} />
    </section>
  );
}

export default Gallery;
