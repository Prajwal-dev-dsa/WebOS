import { motion } from "framer-motion";
import { FaSearch } from "react-icons/fa";

// this is a search bar component which is used in the top of the taskbar section. It is used to search for apps and files.
export default function SearchBar() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -10, scale: 0.95 }}
      transition={{ duration: 0.25, ease: "easeOut", delay: 0.1 }}
      className="w-full px-4 pt-4"
    >
      <div
        className="flex items-center bg-white/10 border border-white/20 rounded-xl px-4 py-2 text-white 
                      hover:bg-white/15 transition-all duration-200
                      focus-within:ring-1 focus-within:ring-orange-500"
      >
        <FaSearch className="mr-2 text-gray-300" />
        <input
          type="text"
          placeholder="Type to search..."
          className="bg-transparent outline-none w-full placeholder:text-gray-200 text-sm"
        />
      </div>
    </motion.div>
  );
}
