import { useState } from "react";
import { MdOutlineSpaceDashboard } from "react-icons/md";
import { BiHide, BiSolidShow } from "react-icons/bi";
import { useBoard } from "../BoardContext";
import ThemeToggle from "./ThemeToggle";

const SideBar = () => {
  const { boards, handleSetActiveBoard, activeBoard, openModal } = useBoard();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      {isSidebarOpen ? (
        <div className="min-w-[300px] bg-white dark:bg-darkGrey flex flex-col pb-8">
          {/* Logo */}
          <div className="w-[150px] mt-8 ml-8">
            <img
              src="./assets/logo-dark.svg"
              alt="logo"
              className="block dark:hidden"
            />{" "}
            <img
              src="./assets/logo-light.svg"
              alt="logo"
              className="hidden dark:block"
            />
          </div>
          {/* All boards */}
          <div className="mt-14">
            <h3 className="headingS text-mediumGrey ml-8 mb-5">
              ALL BOARDS (3)
            </h3>
            {boards.map((board) => (
              <button
                key={board.id}
                className={`flex gap-4 items-center px-8 headingM w-[90%] h-12 rounded-r-3xl 
              ${
                activeBoard && activeBoard.id === board.id
                  ? "bg-mainPurple text-white"
                  : "text-mediumGrey hover:text-mainPurple dark:hover:text-mainPurple dark:hover:bg-white hover:bg-mainPurple hover:bg-opacity-10"
              }`}
                onClick={() => handleSetActiveBoard(board.id)}
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
          <ThemeToggle />
          {/* Hide Sidebar */}
          <button
            onClick={toggleSidebar}
            className="px-8 headingM w-[90%] h-12 rounded-r-3xl mt-5  flex items-center justify-start gap-4 text-mediumGrey hover:text-mainPurple hover:bg-mainPurple hover:bg-opacity-10 dark:hover:bg-opacity-100 dark:hover:bg-white dark:hover:text-mainPurple"
          >
            <BiHide />
            <p className="headingM">Hide Sidebar</p>
          </button>
        </div>
      ) : (
        <button
          onClick={toggleSidebar}
          className="absolute bottom-8 bg-mainPurple w-14 h-12 text-white flex items-center justify-center rounded-r-3xl hover:bg-mainPurpleHover dark:hover:bg-white dark:hover:text-mainPurple"
        >
          <BiSolidShow />
        </button>
      )}
    </>
  );
};

export default SideBar;
