import Taskbar from "../components/Taskbar";

const Desktop = () => {
  return (
    <div
      className="h-screen w-screen bg-cover bg-center bg-no-repeat relative overflow-hidden"
      style={{ backgroundImage: "url('/bg.jpg')" }}
    >
      {/* Future draggable icons will go here */}
      <Taskbar />
    </div>
  );
};

export default Desktop;
