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

const Taskbar = () => {
  const [time, setTime] = useState("");
  const [date, setDate] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const hours = now.getHours().toString().padStart(2, "0");
      const minutes = now.getMinutes().toString().padStart(2, "0");
      const formattedTime = `${hours}:${minutes}`;
      const formattedDate = now.toLocaleDateString("id-ID");
      setTime(formattedTime);
      setDate(formattedDate);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute bottom-0 left-0 w-full h-15 bg-black/80 backdrop-blur text-white flex items-center justify-between px-3 z-50">
      {/* LEFT: News + Weather */}
      <div className="flex items-center gap-2 hover:bg-white/10 rounded-full px-4 py-2 cursor-pointer">
        <WiHumidity className="text-2xl text-sky-400" />
        <div className="flex flex-col leading-none text-sm">
          <span className="font-medium mb-1">Very humid</span>
          <span className="text-xs text-gray-300 -mt-1">Now</span>
        </div>
      </div>

      {/* CENTER: Search Input + Pinned Apps */}
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
          <FaWindows className="text-xl cursor-pointer hover:scale-110 transition" />
          <FaSearch className="text-xl cursor-pointer hover:scale-110 transition" />
          <FaFolder className="text-xl cursor-pointer hover:scale-110 transition" />
          <FaChrome className="text-xl cursor-pointer hover:scale-110 transition" />
          <FaYoutube className="text-xl cursor-pointer hover:scale-110 transition" />
        </div>
      </div>

      {/* RIGHT: Clock */}
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
