import { createContext, useContext, useState } from "react";

// Create context
const WindowManagerContext = createContext();

// Custom hook
export const useWindowManager = () => useContext(WindowManagerContext);

// Provider
export const WindowManagerProvider = ({ children }) => {
  // State to track open apps
  const [openWindows, setOpenWindows] = useState([]); //there can be multiple apps open at the same time. Therefore all the app's ID will be here in an array.

  // Open an app window
  const openApp = (appId) => {
    setOpenWindows((prev) => {
      // if already open, bring to front (later zIndex logic)
      if (prev.some((win) => win.id === appId)) return prev;
      return [...prev, { id: appId }];
    });
  };

  // Close an app window
  const closeApp = (appId) => {
    setOpenWindows((prev) => prev.filter((win) => win.id !== appId));
  };

  // Launch app
  const launchApp = (appId) => {
    const isAlreadyOpen = openWindows.some((w) => w.id === appId);
    if (!isAlreadyOpen) {
      setOpenWindows([...openWindows, { id: appId }]);
    }
  };

  return (
    <WindowManagerContext.Provider
      value={{ openWindows, openApp, closeApp, launchApp }}
    >
      {children}
    </WindowManagerContext.Provider>
  );
};
