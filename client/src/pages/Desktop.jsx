import Taskbar from "../components/Taskbar";
import DesktopIcons from "../components/DesktopIcons";
import { useWindowManager } from "../context/WindowManagerContext";
import AppWindow from "../components/AppWindow";

const Desktop = () => {
  const { openWindows } = useWindowManager();
  return (
    <div
      className="h-screen w-screen bg-cover bg-center bg-no-repeat relative overflow-hidden"
      style={{ backgroundImage: "url('/bg.jpg')" }}
    >
      <DesktopIcons />
      <Taskbar />
      {openWindows.map((win) => (
        <AppWindow key={win.id} appId={win.id} />
      ))}
    </div>
  );
};

export default Desktop;
