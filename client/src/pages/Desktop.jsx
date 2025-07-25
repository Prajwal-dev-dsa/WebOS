import Taskbar from "../components/Taskbar";
import DesktopIcons from "../components/DesktopIcons";

const Desktop = () => {
  return (
    <div
      className="h-screen w-screen bg-cover bg-center bg-no-repeat relative overflow-hidden"
      style={{ backgroundImage: "url('/bg.jpg')" }}
    >
      <DesktopIcons />
      <Taskbar />
    </div>
  );
};

export default Desktop;
