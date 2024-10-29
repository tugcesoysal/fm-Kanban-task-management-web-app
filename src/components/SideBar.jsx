import { useState } from "react";
import { IoSunny } from "react-icons/io5";
import { BsFillMoonStarsFill } from "react-icons/bs";
import { MdOutlineSpaceDashboard } from "react-icons/md";
import { BiHide, BiSolidShow } from "react-icons/bi";
import { useBoard } from "../BoardContext";

const SideBar = () => {
  const { boards, setActiveBoard, activeBoard, openModal } = useBoard();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      {isSidebarOpen ? (
        <div className="min-w-[300px] bg-white flex flex-col pb-8">
          {/* Logo */}
          <div className="w-[150px] mt-8 ml-8">
            <img src="./assets/logo-dark.svg" alt="logo" />
          </div>
          {/* All boards */}
          <div className="mt-14">
            <h3 className="headingS text-mediumGrey ml-8 mb-5">
              ALL BOARDS (3)
            </h3>
            {boards.map((board) => (
              <button
                key={board.name}
                className={`flex gap-4 items-center px-8 headingM w-[90%] h-12 rounded-r-3xl 
              ${
                activeBoard && activeBoard.name === board.name
                  ? "bg-mainPurple text-white"
                  : "text-mediumGrey hover:text-mainPurple hover:bg-mainPurple hover:bg-opacity-10"
              }`}
                onClick={() => setActiveBoard(board)}
              >
                <MdOutlineSpaceDashboard className="size-5" />
                {board.name}
              </button>
            ))}

            <button
              onClick={() => openModal("ADD_BOARD")}
              className="flex gap-4 items-center px-8 headingM text-mainPurple w-[90%] h-12 rounded-r-3xl"
            >
              <MdOutlineSpaceDashboard className="size-5" />+ Create New Board
            </button>
          </div>
          {/* Toggle Bar */}
          <div className="mt-auto mx-6 py-4 bg-lightBG rounded-md flex gap-6 items-center justify-center ">
            <IoSunny className="text-mediumGrey" />
            <button className="w-10 h-5 p-[3px] bg-mainPurple rounded-xl flex items-center justify-center hover:bg-mainPurpleHover">
              <div className="size-3.5 bg-white rounded-full mr-auto"></div>
              <div className="size-3.5 bg-white rounded-full "></div>
            </button>
            <BsFillMoonStarsFill className="text-mediumGrey" />
          </div>
          {/* Hide Sidebar */}
          <button
            onClick={toggleSidebar}
            className="px-8 headingM w-[90%] h-12 rounded-r-3xl mt-5  flex items-center justify-start gap-4 text-mediumGrey hover:text-mainPurple hover:bg-mainPurple hover:bg-opacity-10"
          >
            <BiHide />
            <p className="headingM">Hide Sidebar</p>
          </button>
        </div>
      ) : (
        <button
          onClick={toggleSidebar}
          className="absolute bottom-8 bg-mainPurple w-14 h-12 text-white flex items-center justify-center rounded-r-3xl hover:bg-mainPurpleHover"
        >
          <BiSolidShow />
        </button>
      )}
    </>
  );
};

export default SideBar;
