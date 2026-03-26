import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";

export interface GalleryItem {
  id: number;
  src: string;
  alt: string;
  caption: string;
}

interface LightboxProps {
  item: GalleryItem | null;
  onClose: () => void;
}

function Lightbox({ item, onClose }: LightboxProps) {
  useEffect(() => {
    if (!item) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [item, onClose]);

  return (
    <AnimatePresence>
      {item ? (
        <motion.div
          className="fixed inset-0 z-[120] flex items-center justify-center bg-void/95 px-4 backdrop-blur-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
          onClick={onClose}
        >
          <motion.button
            type="button"
            className="absolute right-5 top-5 z-[130] rounded-full border border-paper/60 px-4 py-2 text-xs uppercase tracking-[0.24em] text-paper"
            onClick={onClose}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
          >
            Close
          </motion.button>

          <motion.div
            className="relative z-[125] w-full max-w-5xl"
            initial={{ opacity: 0, scale: 0.94, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 30 }}
            transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
            onClick={(event) => event.stopPropagation()}
          >
            <motion.img
              src={item.src}
              alt={item.alt}
              className="max-h-[78vh] w-full cursor-grab rounded-3xl border border-paper/40 object-cover shadow-kufiya active:cursor-grabbing"
              layoutId={`gallery-${item.id}`}
              // Drag down to dismiss for mobile-friendly close behavior.
              drag
              dragElastic={0.15}
              dragConstraints={{ top: 0, left: 0, right: 0, bottom: 0 }}
              onDragEnd={(_, info) => {
                if (Math.abs(info.offset.y) > 140) {
                  onClose();
                }
              }}
            />
            <motion.div
              className="mt-4 rounded-xl border border-paper/20 bg-ink/70 px-5 py-4 text-center text-xs uppercase tracking-[0.22em] text-paper/80"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.4 }}
            >
              {item.caption}
            </motion.div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

export default Lightbox;
