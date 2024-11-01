import { MdOutlineSpaceDashboard } from "react-icons/md";
import { useBoard } from "../BoardContext";
import ThemeToggle from "./ThemeToggle";

const MobileBoardsModal = () => {
  const { boards, setActiveBoard, activeBoard } = useBoard();

  return (
    <div className="fixed top-20  left-1/2 transform -translate-x-1/2  w-[343px] sm:w-[480px] bg-white dark:bg-darkGrey rounded-md py-4 flex flex-col gap-6 shadow-lg z-50">
      {/* All boards */}
      <div className="">
        <h3 className="headingS text-mediumGrey ml-8 mb-5">ALL BOARDS (3)</h3>
        {boards.map((board) => (
          <button
            key={board.name}
            className={`flex gap-4 items-center px-8 headingM w-[90%] h-12 rounded-r-3xl 
      ${
        activeBoard && activeBoard.name === board.name
          ? "bg-mainPurple text-white"
          : "text-mediumGrey hover:text-mainPurple hover:bg-mainPurple hover:bg-opacity-10 dark:hover:bg-opacity-100 dark:hover:bg-white"
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
      <ThemeToggle />
    </div>
  );
};

export default MobileBoardsModal;
