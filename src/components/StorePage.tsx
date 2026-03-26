import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { MasterConfig } from "../config/masters";
import { STORE_CATALOGS } from "../config/storeCatalog";

interface StorePageProps {
  master: MasterConfig;
  onOpenSelector: () => void;
}

const PAGE_SIZE = 6;

function StorePage({ master, onOpenSelector }: StorePageProps) {
  const [page, setPage] = useState(1);
  const [cart, setCart] = useState<Record<number, number>>({});
  const [activeProductId, setActiveProductId] = useState<number | null>(null);

  const products = STORE_CATALOGS[master.id];
  const totalPages = Math.max(1, Math.ceil(products.length / PAGE_SIZE));

  const currentProducts = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    return products.slice(start, start + PAGE_SIZE);
  }, [page, products]);

  const activeProduct = useMemo(
    () => products.find((product) => product.id === activeProductId) ?? null,
    [activeProductId, products],
  );

  const cartItems = useMemo(
    () =>
      products
        .filter((product) => cart[product.id])
        .map((product) => ({
          ...product,
          qty: cart[product.id],
          subtotal: product.price * cart[product.id],
        })),
    [cart, products],
  );

  const totalPrice = cartItems.reduce((sum, item) => sum + item.subtotal, 0);

  useEffect(() => {
    setPage(1);
    setCart({});
    setActiveProductId(null);
  }, [master.id]);

  const addToCart = (productId: number) => {
    setCart((prev) => ({ ...prev, [productId]: (prev[productId] || 0) + 1 }));
  };

  const removeFromCart = (productId: number) => {
    setCart((prev) => {
      const nextQty = (prev[productId] || 0) - 1;
      if (nextQty <= 0) {
        const { [productId]: _removed, ...rest } = prev;
        return rest;
      }
      return { ...prev, [productId]: nextQty };
    });
  };

  const handleBuyOnTelegram = () => {
    if (!cartItems.length) return;

    const lines = cartItems.map((item) => `- ${item.name} x${item.qty} = $${item.subtotal.toFixed(2)}`);
    const message = [
      `Assalamualaikum Master ${master.masterName}, I want to order from your store:`,
      ...lines,
      "",
      `Total: $${totalPrice.toFixed(2)}`,
    ].join("\n");

    const telegramLink = `https://t.me/${master.telegramUsername}?text=${encodeURIComponent(message)}`;
    window.open(telegramLink, "_blank", "noopener,noreferrer");
  };

  useEffect(() => {
    if (!activeProduct) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setActiveProductId(null);
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [activeProduct]);

  return (
    <div data-master-theme={master.id} className="min-h-screen bg-void px-6 pb-16 pt-24 text-paper md:px-10">
      <header className="mx-auto flex w-full max-w-[90rem] items-center justify-between border-b pb-6" style={{ borderColor: "var(--theme-border)" }}>
        <a href={`/?master=${master.id}`} className="font-display text-xl tracking-[0.1em] text-paper">
          Master {master.masterName} Store
        </a>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onOpenSelector}
            className="rounded-full border px-4 py-2 text-[10px] uppercase tracking-[0.22em] text-paper/80 transition-colors duration-300 hover:text-paper"
            style={{ borderColor: "var(--theme-border)" }}
          >
            Switch Master
          </button>
          <a
            href={`/?master=${master.id}`}
            className="rounded-full border px-5 py-2 text-xs uppercase tracking-[0.24em] text-paper/80 transition-colors duration-300 hover:text-paper"
            style={{ borderColor: "var(--theme-border)" }}
          >
            Back To Landing
          </a>
        </div>
      </header>

      <main className="mx-auto mt-10 w-full max-w-[90rem]">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <p className="text-xs uppercase tracking-[0.3em] text-paper/60">Store / {page}</p>
          <h1 className="font-display mt-3 text-4xl md:text-5xl">Private Items</h1>
          <p className="mt-4 max-w-2xl text-sm text-paper/75 md:text-base">
            Browse and add items, then use Telegram checkout with your full list and total price prefilled.
          </p>
        </motion.div>

        <div className="mt-10 grid gap-8 lg:grid-cols-[minmax(0,1fr)_330px]">
          <section className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {currentProducts.map((product, index) => (
              <motion.article
                key={product.id}
                className="group relative cursor-zoom-in overflow-hidden rounded-2xl border bg-ink/80"
                style={{ borderColor: "var(--theme-border)" }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.06, ease: [0.25, 0.46, 0.45, 0.94] }}
                onClick={() => setActiveProductId(product.id)}
              >
                <motion.img
                  src={product.image}
                  alt={product.name}
                  className="h-56 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  layoutId={`store-${product.id}`}
                  loading="lazy"
                  onError={(event) => {
                    if (event.currentTarget.src.includes("/store/alpha/used-socks-01.jpg")) return;
                    event.currentTarget.src = "/store/alpha/used-socks-01.jpg";
                  }}
                />
                <div className="p-5">
                  <h2 className="font-display text-2xl text-paper">{product.name}</h2>
                  <p className="mt-3 text-sm text-paper/75">{product.description}</p>
                  <p className="mt-4 text-sm uppercase tracking-[0.2em] text-paper/75">
                    ${product.price.toFixed(2)}
                  </p>
                  <div className="mt-5 flex items-center gap-2">
                    <button
                      type="button"
                      onClick={(event) => {
                        event.stopPropagation();
                        removeFromCart(product.id);
                      }}
                      className="rounded-lg border px-3 py-2 text-xs uppercase tracking-[0.14em] text-paper/80"
                      style={{ borderColor: "var(--theme-border)" }}
                    >
                      -
                    </button>
                    <button
                      type="button"
                      onClick={(event) => {
                        event.stopPropagation();
                        addToCart(product.id);
                      }}
                      className="rounded-lg border px-4 py-2 text-xs uppercase tracking-[0.14em] text-paper"
                      style={{ borderColor: "var(--theme-border-strong)" }}
                    >
                      Add
                    </button>
                    <span className="ml-auto text-xs uppercase tracking-[0.18em] text-paper/60">
                      Qty: {cart[product.id] || 0}
                    </span>
                  </div>
                </div>
              </motion.article>
            ))}
          </section>

          <aside className="space-y-6 lg:sticky lg:top-24 lg:w-[330px]">
            <div className="rounded-2xl border bg-ink/85 p-6" style={{ borderColor: "var(--theme-border)" }}>
              <h2 className="font-display text-2xl text-paper">Order Summary</h2>
              <div className="mt-4 space-y-3">
                {cartItems.length ? (
                  cartItems.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between rounded-lg border bg-char/50 px-4 py-3 text-xs uppercase tracking-[0.14em] text-paper/80"
                      style={{ borderColor: "var(--theme-border)" }}
                    >
                      <span>
                        {item.name} x{item.qty}
                      </span>
                      <span>${item.subtotal.toFixed(2)}</span>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-paper/55">No items selected yet.</p>
                )}
              </div>
              <div className="mt-5 border-t pt-4" style={{ borderColor: "var(--theme-border)" }}>
                <p className="text-xs uppercase tracking-[0.2em] text-paper/60">Total</p>
                <p className="mt-2 font-display text-3xl text-paper">${totalPrice.toFixed(2)}</p>
              </div>
              <button
                type="button"
                onClick={handleBuyOnTelegram}
                disabled={!cartItems.length}
                className="mt-6 w-full rounded-xl border px-5 py-3 text-xs uppercase tracking-[0.24em] text-paper disabled:cursor-not-allowed disabled:opacity-40"
                style={{ borderColor: "var(--theme-border-strong)" }}
              >
                Buy On Telegram
              </button>
            </div>

            <div className="flex items-center justify-center gap-2 rounded-2xl border bg-void/60 p-4" style={{ borderColor: "var(--theme-border)" }}>
              <button
                type="button"
                onClick={() => setPage((prev) => Math.max(1, prev - 1))}
                disabled={page === 1}
                className="rounded-lg border px-4 py-2 text-xs uppercase tracking-[0.18em] text-paper/80 disabled:opacity-40"
                style={{ borderColor: "var(--theme-border)" }}
              >
                Prev
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
                <button
                  key={num}
                  type="button"
                  onClick={() => setPage(num)}
                  className={`rounded-lg border px-3 py-2 text-xs uppercase tracking-[0.18em] ${
                    page === num ? "text-void" : "text-paper/80"
                  }`}
                  style={{
                    borderColor: page === num ? "var(--theme-border-strong)" : "var(--theme-border)",
                    backgroundColor: page === num ? "var(--theme-accent)" : "transparent",
                  }}
                >
                  {num}
                </button>
              ))}
              <button
                type="button"
                onClick={() => setPage((prev) => Math.min(totalPages, prev + 1))}
                disabled={page === totalPages}
                className="rounded-lg border px-4 py-2 text-xs uppercase tracking-[0.18em] text-paper/80 disabled:opacity-40"
                style={{ borderColor: "var(--theme-border)" }}
              >
                Next
              </button>
            </div>
          </aside>
        </div>
      </main>

      <AnimatePresence>
        {activeProduct ? (
          <motion.div
            className="fixed inset-0 z-[140] flex items-center justify-center bg-void/95 px-4 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setActiveProductId(null)}
          >
            <motion.button
              type="button"
              className="absolute right-5 top-5 z-[150] rounded-full border px-4 py-2 text-xs uppercase tracking-[0.24em] text-paper"
              style={{ borderColor: "var(--theme-border-strong)" }}
              onClick={() => setActiveProductId(null)}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
            >
              Close
            </motion.button>

            <motion.div
              className="relative z-[145] w-full max-w-5xl"
              initial={{ opacity: 0, scale: 0.94, y: 28 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 28 }}
              transition={{ duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}
              onClick={(event) => event.stopPropagation()}
            >
              <motion.img
                src={activeProduct.image}
                alt={activeProduct.name}
                className="max-h-[75vh] w-full cursor-grab rounded-3xl border object-contain bg-ink/60 active:cursor-grabbing"
                style={{
                  borderColor: "var(--theme-border-strong)",
                  boxShadow: "0 0 0 1px var(--theme-border-strong), 0 0 30px var(--theme-glow)",
                }}
                layoutId={`store-${activeProduct.id}`}
                drag
                dragElastic={0.15}
                dragConstraints={{ top: 0, left: 0, right: 0, bottom: 0 }}
                onDragEnd={(_, info) => {
                  if (Math.abs(info.offset.y) > 140) {
                    setActiveProductId(null);
                  }
                }}
              />
              <motion.div
                className="mt-4 rounded-xl border bg-ink/80 px-5 py-4"
                style={{ borderColor: "var(--theme-border)" }}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.08, duration: 0.35 }}
              >
                <h3 className="font-display text-2xl text-paper">{activeProduct.name}</h3>
                <p className="mt-2 text-sm text-paper/75">{activeProduct.description}</p>
                <p className="mt-4 text-xs uppercase tracking-[0.2em] text-paper/70">
                  ${activeProduct.price.toFixed(2)}
                </p>
              </motion.div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

export default StorePage;
