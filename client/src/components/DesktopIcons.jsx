// ✅ Step 1: Use the window manager context to open apps
import { useWindowManager } from "../context/WindowManagerContext";

// ✅ Modify DesktopIcons
export default function DesktopIcons() {
  const { launchApp } = useWindowManager(); // add this

  const desktopIcons = [
    { name: "Prajwal", icon: "/icons/win/user.png" },
    { name: "Spotify", icon: "/icons/spotify.png" },
    { name: "Unescape", icon: "/icons/unescape.png" },
    { name: "Coffee", icon: "/icons/buyme.png" },
    { name: "Recycle Bin", icon: "/icons/bin0.png" },
    { name: "File Explorer", icon: "/icons/explorer.png" },
    { name: "Store", icon: "/icons/store.png" },
    { name: "Browser", icon: "/icons/edge.png" },
    { name: "Github", icon: "/icons/github.png" },
    { name: "Paint", icon: "/icons/paint.png" },
    { name: "Powerpoint", icon: "/icons/powerpoint.png" },
    { name: "Discord", icon: "/icons/discord.png" },
    { name: "oneDrive", icon: "/icons/oneDrive.png" },
    { name: "Excel", icon: "/icons/excel.png" },
    { name: "Notepad", icon: "/icons/notepad.png" },
    { name: "Pintrest", icon: "/icons/pinterest.png" },
  ];

  return (
    <div className="absolute top-4 left-2 flex flex-col flex-wrap content-start gap-x-1 w-[calc(100vw-2rem)] max-h-[calc(100vh-4rem)] overflow-y-auto z-10">
      {desktopIcons.map((app, idx) => (
        <div
          key={idx}
          onDoubleClick={() => launchApp(app.name.toLowerCase())} // ✅ launch app on double click
          className="flex flex-col items-center text-white text-xs cursor-pointer hover:bg-white/10 transition-transform duration-200 select-none w-[80px] rounded-lg py-4"
        >
          <img
            src={app.icon}
            alt={app.name}
            className="w-[42px] h-[42px] drop-shadow mb-1"
          />
          <span className="text-center">{app.name}</span>
        </div>
      ))}
    </div>
  );
}
