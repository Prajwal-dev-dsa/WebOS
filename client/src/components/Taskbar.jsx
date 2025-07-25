import {
  FaWindows,
  FaSearch,
  FaChrome,
  FaFolder,
  FaYoutube,
} from "react-icons/fa";
import { WiHumidity } from "react-icons/wi";
import { MdOutlineKeyboardArrowUp } from "react-icons/md";
import { useEffect, useState } from "react";
import { Wifi, Volume2, BatteryFull } from "lucide-react";
import { useStartMenu } from "../context/StartMenuContext";

// this is the taskbar component which is used in the bottom of the screen. It is used to display the time, date, weather, and apps.
const Taskbar = () => {
  const [time, setTime] = useState(""); // state to display the time
  const [date, setDate] = useState(""); // state to display the date
  const { toggleStartMenu } = useStartMenu(); //hook to use the start menu context to open and close the start menu

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
      <div className="flex items-center gap-2 hover:bg-white/10 rounded-full px-4 py-2 cursor-pointer">
        <WiHumidity className="text-2xl text-sky-400" />
        <div className="flex flex-col leading-none text-sm">
          <span className="font-medium mb-1">Very humid</span>
          <span className="text-xs text-gray-300 -mt-1">Now</span>
        </div>
      </div>

      {/* CENTER SECTION: Search Input + Pinned Apps */}
      <div className="flex items-center gap-6">
        <div className="flex items-center bg-gray-800 px-3 py-1 rounded-full text-sm">
          <FaSearch className="mr-2 text-gray-400" />
          <input
            type="text"
            placeholder="Search"
            className="bg-transparent outline-none text-white placeholder-gray-400 w-36"
          />
        </div>
        <div className="flex items-center gap-6 ">
          <button id="start-button" onClick={toggleStartMenu}>
            <FaWindows className="text-xl cursor-pointer hover:scale-110 transition" />
          </button>
          <FaSearch className="text-xl cursor-pointer hover:scale-110 transition" />
          <FaFolder className="text-xl cursor-pointer hover:scale-110 transition" />
          <FaChrome className="text-xl cursor-pointer hover:scale-110 transition" />
          <FaYoutube className="text-xl cursor-pointer hover:scale-110 transition" />
        </div>
      </div>

      {/* RIGHT SECTION: Clock */}
      <div className="flex items-center gap-4">
        <MdOutlineKeyboardArrowUp className="cursor-pointer hover:scale-110 transition" />
        <div className="flex items-center gap-2 text-white text-sm">
          {/* Icons */}
          <Wifi className="w-4 h-4 hover:scale-110 transition cursor-pointer" />
          <Volume2 className="w-4 h-4 hover:scale-110 transition cursor-pointer" />
          <BatteryFull className="w-4 h-4 hover:scale-110 transition cursor-pointer" />

          {/* Time & Date */}
          <div className="flex flex-col items-end leading-tight gap-1 pl-3 pr-5">
            <span>{time}</span>
            <span>{date}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Taskbar;
