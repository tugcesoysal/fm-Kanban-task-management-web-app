import { IoSunny } from "react-icons/io5";
import { BsFillMoonStarsFill } from "react-icons/bs";
import { MdOutlineSpaceDashboard } from "react-icons/md";
import { useBoard } from "../BoardContext";

const MobileBoardsModal = () => {
  const { boards, setActiveBoard, activeBoard } = useBoard();

  return (
    <div className="fixed top-20  left-1/2 transform -translate-x-1/2  w-[343px] sm:w-[480px] bg-white rounded-md py-4 flex flex-col gap-6 shadow-lg z-50">
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
    </div>
  );
};

export default MobileBoardsModal;
