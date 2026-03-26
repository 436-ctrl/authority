import React, { useEffect, useMemo, useState } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import StorePage from "./components/StorePage";
import MasterSelectorModal from "./components/MasterSelectorModal";
import { MASTER_CONFIGS, MASTER_SELECTION_KEY, isMasterId, type MasterId } from "./config/masters";
import { getRoutePath } from "./utils/appPaths";
import "./index.css";

const getInitialMasterId = (): MasterId => {
  const fromQuery = new URLSearchParams(window.location.search).get("master");
  if (isMasterId(fromQuery)) return fromQuery;

  const fromStorage = window.localStorage.getItem(MASTER_SELECTION_KEY);
  if (isMasterId(fromStorage)) return fromStorage;

  return "alpha";
};

function RootRouter() {
  const [selectedMasterId, setSelectedMasterId] = useState<MasterId>(getInitialMasterId);
  const routePath = useMemo(() => getRoutePath(), []);
  const isStoreRoute = useMemo(() => {
    const view = new URLSearchParams(window.location.search).get("view");
    return view === "store" || routePath.toLowerCase() === "/store";
  }, [routePath]);
  const [selectorOpen, setSelectorOpen] = useState(!isStoreRoute);
  const selectedMaster = MASTER_CONFIGS[selectedMasterId];

  useEffect(() => {
    window.localStorage.setItem(MASTER_SELECTION_KEY, selectedMasterId);
    document.documentElement.setAttribute("data-master-theme", selectedMasterId);

    const url = new URL(window.location.href);
    url.searchParams.set("master", selectedMasterId);
    if (isStoreRoute) {
      url.searchParams.set("view", "store");
    } else {
      url.searchParams.delete("view");
    }
    window.history.replaceState({}, "", `${url.pathname}${url.search}`);
  }, [isStoreRoute, selectedMasterId]);

  const handleSelectMaster = (masterId: MasterId) => {
    setSelectedMasterId(masterId);
    setSelectorOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      {isStoreRoute ? (
        <StorePage master={selectedMaster} onOpenSelector={() => setSelectorOpen(true)} />
      ) : (
        <App master={selectedMaster} onOpenSelector={() => setSelectorOpen(true)} />
      )}

      <MasterSelectorModal
        open={selectorOpen}
        selectedMasterId={selectedMasterId}
        onSelectMaster={handleSelectMaster}
      />
    </>
  );
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RootRouter />
  </React.StrictMode>,
);
