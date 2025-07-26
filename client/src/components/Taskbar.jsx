import {
  FaWindows,
  FaSearch,
  FaChrome,
  FaFolder,
  FaYoutube,
} from "react-icons/fa";
import { WiHumidity } from "react-icons/wi";
import { IoSettingsSharp } from "react-icons/io5";
import { MdOutlineKeyboardArrowUp } from "react-icons/md";
import { useEffect, useState } from "react";
import { useStartMenu } from "../context/StartMenuContext";
import { useSearchMenu } from "../context/SearchMenuContext";
import { useWindowManager } from "../context/WindowManagerContext";

// this is the taskbar component which is used in the bottom of the screen. It is used to display the time, date, weather, and apps.
const Taskbar = () => {
  const [time, setTime] = useState(""); // state to display the time
  const [date, setDate] = useState(""); // state to display the date
  const { toggleStartMenu } = useStartMenu(); //hook to use the start menu context to open and close the start menu
  const { toggleSearchMenu } = useSearchMenu(); //hook to use the search menu context to open and close the search menu
  const { openApp } = useWindowManager();

  useEffect(() => {
    // set an interval to update the time and date every second
    const interval = setInterval(() => {
      const now = new Date();
      const hours = now.getHours().toString().padStart(2, "0");
      const minutes = now.getMinutes().toString().padStart(2, "0");
      const formattedTime = `${hours}:${minutes}`;
      const formattedDate = now.toLocaleDateString("id-ID");
      setTime(formattedTime); // set the time
      setDate(formattedDate); // set the date
    }, 1000);

    return () => clearInterval(interval); // clear the interval when the component unmounts
  }, []);

  return (
    <div className="absolute bottom-0 left-0 w-full h-15 bg-black/80 backdrop-blur text-white flex items-center justify-between px-3 z-50">
      {/* LEFT SECTION: News + Weather */}
      <div
        onClick={() => openApp("Weather")}
        className="flex items-center gap-2 hover:bg-white/10 rounded-full px-4 py-2 cursor-pointer"
      >
        <WiHumidity className="text-2xl text-sky-400" />
        <div className="flex flex-col leading-none text-sm">
          <span className="font-medium mb-1">Very humid</span>
          <span className="text-xs text-gray-300 -mt-1">Now</span>
        </div>
      </div>

      {/* CENTER SECTION: Pinned Apps */}
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-6 pl-20">
          <FaWindows
            id="start-button"
            onClick={toggleStartMenu}
            className="text-xl cursor-pointer hover:scale-110 transition"
          />
          <FaSearch
            onClick={toggleSearchMenu}
            className="text-xl cursor-pointer hover:scale-110 transition"
          />
          <FaFolder
            onClick={() => openApp("file explorer")}
            className="text-xl cursor-pointer hover:scale-110 transition"
          />
          <FaChrome
            onClick={() => openApp("chrome")}
            className="text-xl cursor-pointer hover:scale-110 transition"
          />
          <FaYoutube
            onClick={() => openApp("youtube")}
            className="text-xl cursor-pointer hover:scale-110 transition"
          />
          <IoSettingsSharp
            onClick={() => openApp("settings")}
            className="text-[1.4vw] cursor-pointer hover:scale-110 transition"
          />
        </div>
      </div>

      {/* RIGHT SECTION: Clock */}
      <div className="flex items-center gap-4">
        <MdOutlineKeyboardArrowUp
          onClick={() => openApp("arrow")}
          className="cursor-pointer hover:scale-110 transition"
        />
        <div className="flex items-center gap-3 text-white text-sm">
          {/* Icons */}
          <img
            onClick={() => openApp("box")}
            src="/icons/ui/wifi.png"
            alt="Wifi"
            className="w-4.5 h-4.5 cursor-pointer hover:scale-110 transition invert"
          />
          <img
            onClick={() => openApp("box")}
            src="/icons/ui/audio3.png"
            alt="Audio"
            className="w-4.5 h-4.5 cursor-pointer hover:scale-110 transition invert"
          />
          <img
            onClick={() => openApp("box")}
            src="/icons/ui/battery.png"
            alt="Battery"
            className="w-4.5 h-4.5 cursor-pointer hover:scale-110 transition invert"
          />
          {/* Time & Date */}
          <div
            onClick={() => openApp("time and date")}
            className="flex cursor-pointer flex-col items-end leading-tight gap-1 pl-2 pr-5"
          >
            <span>{time}</span>
            <span>{date}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Taskbar;
