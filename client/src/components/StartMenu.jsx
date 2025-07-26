// 🔹 StartMenu.jsx
import { useEffect, useRef, useState } from "react";
import { useStartMenu } from "../context/StartMenuContext";
import { useWindowManager } from "../context/WindowManagerContext";
import { motion, AnimatePresence } from "framer-motion";
import SearchBar from "./SearchBar";

// 🔸 Reusable component for displaying app icons in a grid
const AppGrid = ({ apps, onClick, closeMenu }) => (
  <div className="grid grid-cols-6 gap-4">
    {apps.map((app, idx) => (
      <div
        key={idx}
        onClick={() => {
          onClick(app.name.toLowerCase());
          closeMenu();
        }}
        className="flex flex-col items-center text-white text-xs hover:bg-white/10 p-3 rounded-xl cursor-pointer transition duration-200"
      >
        <img src={app.icon} alt={app.name} className="w-[28px] h-[28px] mb-2" />
        <span className="text-center">{app.name}</span>
      </div>
    ))}
  </div>
);

// 🔸 For grouping apps alphabetically (used in All Apps)
const groupAppsAlphabetically = (apps) => {
  const sorted = [...apps].sort((a, b) => a.name.localeCompare(b.name));
  const grouped = {};
  sorted.forEach((app) => {
    const letter = app.name[0].toUpperCase();
    if (!grouped[letter]) grouped[letter] = [];
    grouped[letter].push(app);
  });
  return grouped;
};

// 🔸 All pinned apps
const pinnedApps = [
  { name: "Browser", icon: "/icons/edge.png" },
  { name: "Get Started", icon: "/icons/getstarted.png" },
  { name: "Task Manager", icon: "/icons/taskmanager.png" },
  { name: "Mail", icon: "/icons/mail.png" },
  { name: "Settings", icon: "/icons/settings.png" },
  { name: "Store", icon: "/icons/store.png" },
  { name: "Unescape", icon: "/icons/unescape.png" },
  { name: "Buy me a coffee", icon: "/icons/buyme.png" },
  { name: "Notepad", icon: "/icons/notepad.png" },
  { name: "Whiteboard", icon: "/icons/board.png" },
  { name: "Calculator", icon: "/icons/calculator.png" },
  { name: "Spotify", icon: "/icons/spotify.png" },
  { name: "Twitter", icon: "/icons/twitter.png" },
  { name: "File Explorer", icon: "/icons/explorer.png" },
  { name: "Terminal", icon: "/icons/terminal.png" },
  { name: "Github", icon: "/icons/github.png" },
  { name: "Discord", icon: "/icons/discord.png" },
  { name: "Camera", icon: "/icons/camera.png" },
];

// 🔸 Recently used or recommended apps
const recommendedApps = [
  { name: "Mail", icon: "/icons/mail.png" },
  { name: "Terminal", icon: "/icons/terminal.png" },
  { name: "File Explorer", icon: "/icons/explorer.png" },
  { name: "Twitter", icon: "/icons/twitter.png" },
  { name: "Github", icon: "/icons/github.png" },
  { name: "Spotify", icon: "/icons/spotify.png" },
];

export default function StartMenu() {
  const menuRef = useRef();
  const { isStartOpen, setIsStartOpen } = useStartMenu();
  const { launchApp } = useWindowManager();
  const [allAppsView, setAllAppsView] = useState(false);

  // Close menu on outside click or Esc
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setIsStartOpen(false);
      }
    };
    const handleEscape = (e) => {
      if (e.key === "Escape") setIsStartOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [setIsStartOpen]);

  return (
    <AnimatePresence mode="wait">
      {isStartOpen && (
        <motion.div
          ref={menuRef}
          initial={{ opacity: 0, scale: 0.9, y: 100 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 100 }}
          transition={{ duration: 0.2, ease: [0.4, 0.0, 0.2, 1] }}
          className="fixed bottom-16 left-1/2 -translate-x-1/2 w-[600px] h-[720px] bg-black/70 rounded-xl p-6 shadow-xl border border-white/10 z-50 flex flex-col mb-2 justify-between backdrop-blur-md"
        >
          {/* Top Search */}
          <SearchBar />

          {/* Toggle Header */}
          <div className="flex items-center justify-between mt-4 mb-2">
            <h2 className="text-white text-sm font-semibold">
              {allAppsView ? "All Apps" : "Pinned"}
            </h2>
            <button
              onClick={() => setAllAppsView((prev) => !prev)}
              className="text-white/70 text-xs hover:text-white cursor-pointer"
            >
              {allAppsView ? "< Back" : "All apps >"}
            </button>
          </div>

          {/* App Section */}
          <div className="flex-1 overflow-y-auto custom-scrollbar pr-2">
            {allAppsView ? (
              <div className="space-y-4">
                {Object.entries(groupAppsAlphabetically(pinnedApps)).map(
                  ([letter, apps]) => (
                    <div key={letter}>
                      <h3 className="text-white/60 text-xs font-semibold mb-1">
                        {letter}
                      </h3>
                      <AppGrid
                        apps={apps}
                        onClick={launchApp}
                        closeMenu={() => setIsStartOpen(false)}
                      />
                    </div>
                  )
                )}
              </div>
            ) : (
              <>
                <AppGrid
                  apps={pinnedApps}
                  onClick={launchApp}
                  closeMenu={() => setIsStartOpen(false)}
                />
                <div className="mt-6">
                  <h2 className="text-white text-sm font-semibold mb-2">
                    Recommended
                  </h2>
                  <div className="grid grid-cols-3 gap-3">
                    {recommendedApps.map((app, idx) => (
                      <div
                        key={idx}
                        onClick={() => {
                          if (app.name) {
                            launchApp(app.name.toLowerCase());
                            setIsStartOpen(false);
                          }
                        }}
                        className="flex items-center gap-3 hover:bg-white/10 p-2 rounded-lg cursor-pointer transition duration-200"
                      >
                        <img
                          src={app.icon}
                          alt={app.name}
                          className="w-[28px] h-[28px]"
                        />
                        <span className="text-white text-sm">{app.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Footer */}
          <div className="border-t border-white/10 pt-4 mt-4 flex items-center justify-between">
            <div className="flex items-center gap-3 hover:bg-white/10 p-3 rounded-md cursor-pointer">
              <img src="/avatar.jpg" className="w-7 h-7 rounded-full" />
              <span className="text-white text-sm">Prajwal</span>
            </div>
            <div className="flex items-center gap-3 hover:bg-white/10 p-3 rounded-md cursor-pointer">
              <img src="icons/ui/power.png" className="w-5 h-5" />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
