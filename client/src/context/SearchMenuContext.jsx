import { createContext, useContext, useState } from "react";

// Create a context for the Search Menu
const SearchMenuContext = createContext();

// Custom hook to access SearchMenu context
export const useSearchMenu = () => useContext(SearchMenuContext);

// Context provider component to wrap around the app
export const SearchMenuProvider = ({ children }) => {
  const [isSearchOpen, setIsSearchOpen] = useState(false); // state: true if search menu is open

  // function to toggle search menu
  const toggleSearchMenu = () => setIsSearchOpen((prev) => !prev);

  return (
    <SearchMenuContext.Provider
      value={{ isSearchOpen, setIsSearchOpen, toggleSearchMenu }}
    >
      {children}
    </SearchMenuContext.Provider>
  );
};
