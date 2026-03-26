import { AnimatePresence, motion } from "framer-motion";
import { MASTER_CONFIGS, type MasterId } from "../config/masters";
import MonoFlag from "./MonoFlag";

interface MasterSelectorModalProps {
  open: boolean;
  selectedMasterId: MasterId;
  onSelectMaster: (masterId: MasterId) => void;
}

function MasterSelectorModal({
  open,
  selectedMasterId,
  onSelectMaster,
}: MasterSelectorModalProps) {
  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          className="fixed inset-0 z-[170] flex items-center justify-center bg-void/90 px-4 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div
            className="w-full max-w-3xl rounded-3xl border border-paper/20 bg-ink/95 p-6 sm:p-8"
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.98 }}
            transition={{ duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}
            role="dialog"
            aria-modal="true"
            aria-labelledby="master-selector-title"
          >
            <p className="text-xs uppercase tracking-[0.3em] text-paper/60">Choose Access</p>
            <h2 id="master-selector-title" className="font-display mt-3 text-3xl text-paper sm:text-4xl">
              Select Your Master
            </h2>
            <p className="mt-4 text-sm text-paper/75">
              Pick one profile to enter. You can switch anytime from the top menu.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <button
                type="button"
                onClick={() => onSelectMaster("alpha")}
                className={`group rounded-2xl border p-5 text-left transition-all duration-300 ${
                  selectedMasterId === "alpha"
                    ? "border-paper/85 bg-char/70"
                    : "border-paper/25 bg-char/30 hover:border-paper/55"
                }`}
              >
                <div className="flex items-center justify-between">
                  <p className="font-display text-2xl text-paper">Master {MASTER_CONFIGS.alpha.masterName}</p>
                  <MonoFlag className="h-4 w-12 shrink-0 opacity-100" />
                </div>
                <p className="mt-3 text-xs uppercase tracking-[0.22em] text-paper/60">
                  {MASTER_CONFIGS.alpha.masterTitle}
                </p>
                <p className="mt-3 text-sm text-paper/72">
                  {MASTER_CONFIGS.alpha.location}
                  {MASTER_CONFIGS.alpha.age ? ` - ${MASTER_CONFIGS.alpha.age} y/o` : ""}
                </p>
              </button>

              <button
                type="button"
                onClick={() => onSelectMaster("wolf")}
                className={`group rounded-2xl border p-5 text-left transition-all duration-300 ${
                  selectedMasterId === "wolf"
                    ? "border-[#ff2a2a]/90 bg-[#2a0a0a]"
                    : "border-[#ff2a2a]/35 bg-[#1a0808] hover:border-[#ff2a2a]/70"
                }`}
              >
                <div className="flex items-center justify-between">
                  <p className="font-display text-2xl text-paper">Master {MASTER_CONFIGS.wolf.masterName}</p>
                  <span className="rounded-full border border-[#ff3b3b]/65 px-2 py-1 text-[10px] uppercase tracking-[0.14em] text-[#ff6a6a]">
                    Wolf
                  </span>
                </div>
                <p className="mt-3 text-xs uppercase tracking-[0.22em] text-[#ff6a6a]">
                  {MASTER_CONFIGS.wolf.masterTitle}
                </p>
                <p className="mt-3 text-sm text-paper/72">{MASTER_CONFIGS.wolf.location}</p>
              </button>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

export default MasterSelectorModal;
