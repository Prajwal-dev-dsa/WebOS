import { createContext, useContext, useEffect, useState } from "react";

//context for the start menu that will be used to open and close the start menu and to check if the start menu is open or not.
const StartMenuContext = createContext(); //create a context for the start menu

// this is the provider for the start menu context
export const StartMenuProvider = ({ children }) => {
  const [isStartOpen, setIsStartOpen] = useState(false); //state to check if the start menu is open

  // function to toggle the start menu
  const toggleStartMenu = () => {
    setIsStartOpen(!isStartOpen); //toggle the start menu
  };

  // useEffect to close the start menu when the escape key is pressed or the user clicks outside of the start menu
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") setIsStartOpen(false);
    };

    const handleClickOutside = (e) => {
      const startMenu = document.getElementById("start-menu");
      const startButton = document.getElementById("start-button");

      // Close only if clicked outside start menu and button
      if (
        startMenu &&
        !startMenu.contains(e.target) &&
        startButton &&
        !startButton.contains(e.target)
      ) {
        setIsStartOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("mousedown", handleClickOutside);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    //provider for the start menu context
    <StartMenuContext.Provider
      value={{ isStartOpen, toggleStartMenu, setIsStartOpen }}
    >
      {children}
    </StartMenuContext.Provider>
  );
};

export const useStartMenu = () => useContext(StartMenuContext); //hook to use the start menu context
