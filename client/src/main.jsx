import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { StartMenuProvider } from "./context/StartMenuContext.jsx";
import { SearchMenuProvider } from "./context/SearchMenuContext.jsx";
import { WindowManagerProvider } from "./context/WindowManagerContext.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <StartMenuProvider>
      <SearchMenuProvider>
        <WindowManagerProvider>
          <App />
        </WindowManagerProvider>
      </SearchMenuProvider>
    </StartMenuProvider>
  </BrowserRouter>
);
