import { useWindowManager } from "../context/WindowManagerContext";
import { motion } from "framer-motion";
import { IoCloseOutline } from "react-icons/io5";

// Dummy content per appId
const appContent = {
  notepad: (
    <textarea
      className="w-full h-full bg-transparent text-white resize-none outline-none p-4"
      defaultValue="Welcome to Notepad..."
    />
  ),
  calculator: <div className="text-white p-4">[Calculator UI here]</div>,
  settings: <div className="text-white p-4">[Settings Panel]</div>,
  terminal: <div className="text-white p-4">Prajwal@win11:~$ Hello World</div>,
};

export default function AppWindow({ appId }) {
  const { closeApp } = useWindowManager();

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 50 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95, y: 50 }}
      transition={{ duration: 0.2 }}
      className="absolute top-24 left-1/2 -translate-x-1/2 w-[500px] h-[400px] bg-black/80 rounded-xl shadow-xl border border-white/10 backdrop-blur-md overflow-hidden flex flex-col z-50"
    >
      {/* Header */}
      <div className="flex justify-between items-center px-4 py-2 border-b border-white/10 bg-black/60">
        <h3 className="text-white capitalize text-sm font-medium">{appId}</h3>
        <button onClick={() => closeApp(appId)}>
          <IoCloseOutline className="text-white text-xl hover:text-red-400" />
        </button>
      </div>

      {/* Content Area */}
      <div className="flex-1">
        {appContent[appId] || (
          <div className="text-white p-4">
            This app is under construction...
          </div>
        )}
      </div>
    </motion.div>
  );
}
