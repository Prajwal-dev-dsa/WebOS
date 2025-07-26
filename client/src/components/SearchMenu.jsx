import { useEffect, useRef, useState } from "react";
import { useSearchMenu } from "../context/SearchMenuContext";
import SearchBar from "./SearchBar";
import { motion, AnimatePresence } from "framer-motion";
import { useWindowManager } from "../context/WindowManagerContext";

// Dummy data
const topApps = [
  { name: "Twitter", icon: "/icons/twitter.png" },
  { name: "Terminal", icon: "/icons/terminal.png" },
  { name: "Github", icon: "/icons/github.png" },
  { name: "File Explorer", icon: "/icons/explorer.png" },
  { name: "Spotify", icon: "/icons/spotify.png" },
];

const quickSearches = [
  { label: "Today in history", icon: "🕒", app: "History" },
  { label: "Markets today", icon: "📈", app: "Stocks" },
  { label: "New movies", icon: "🎬", app: "Movies" },
  { label: "Top news", icon: "📰", app: "News" },
];

export default function SearchMenu() {
  const { launchApp } = useWindowManager();
  const menuRef = useRef();
  const { isSearchOpen, setIsSearchOpen } = useSearchMenu();
  const [selectedTab, setSelectedTab] = useState("All");

  // ✅ Close on outside click or Escape
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setIsSearchOpen(false);
      }
    };

    const handleEscape = (e) => {
      if (e.key === "Escape") setIsSearchOpen(false);
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [setIsSearchOpen]);

  // ✅ Keyboard shortcut: `/` to open search
  useEffect(() => {
    const handleShortcut = (e) => {
      if (
        (e.key === "/" && !e.ctrlKey) ||
        (e.ctrlKey && e.key.toLowerCase() === "s")
      ) {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleShortcut);
    return () => window.removeEventListener("keydown", handleShortcut);
  }, []);

  return (
    <AnimatePresence mode="wait">
      {isSearchOpen && (
        <motion.div
          ref={menuRef}
          initial={{ opacity: 0, scale: 0.9, y: 100 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 100 }}
          transition={{ duration: 0.2, ease: [0.4, 0.0, 0.2, 1] }}
          className="fixed bottom-16 left-1/2 -translate-x-1/2 w-[600px] h-[720px] bg-black/70 rounded-xl p-6 shadow-xl border border-white/10 z-50 flex flex-col justify-start backdrop-blur-md"
        >
          {/* 🔍 Search Input */}
          <SearchBar />

          {/* Tabs */}
          <div className="flex mt-4 space-x-4 text-white/80 text-sm border-b border-white/10 pb-2">
            {["All", "Apps", "Documents", "Web", "More"].map((tab) => (
              <button
                key={tab}
                onClick={() => setSelectedTab(tab)}
                className={`${
                  selectedTab === tab
                    ? "text-white border-b-2 border-blue-400"
                    : ""
                } pb-1 transition cursor-pointer`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Top Apps */}
          <div className="mt-6">
            <h3 className="text-white text-sm mb-3">Top apps</h3>
            <div className="flex space-x-4 overflow-x-auto">
              {topApps.map((app, idx) => (
                <div
                  key={idx}
                  className="flex flex-col items-center text-white text-xs hover:bg-white/10 p-4 rounded-xl cursor-pointer transition duration-200 w-20"
                  onClick={() => {
                    if (app.name) launchApp(app.name.toLowerCase());
                    setIsSearchOpen(false);
                  }}
                >
                  <img
                    src={app.icon}
                    alt={app.name}
                    className="w-[32px] h-[32px] mb-2"
                  />
                  <span className="text-center truncate">{app.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Searches */}
          <div className="mt-8">
            <h3 className="text-white text-sm mb-3">Quick Searches</h3>
            <div className="flex flex-col grid-cols-2 w-full gap-3">
              {quickSearches.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center w-full gap-3 hover:bg-white/10 p-2 rounded-lg cursor-pointer transition duration-200"
                  onClick={() => {
                    if (item.app) launchApp(item.app.toLowerCase());
                    setIsSearchOpen(false);
                  }}
                >
                  <span className="text-xl">{item.icon}</span>
                  <span className="text-white text-sm">{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
