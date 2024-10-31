import { useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useBoard } from "../BoardContext";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

const Navbar = ({ isMobile, setIsBoardsListOpen, isBoardsListOpen }) => {
  const { openModal, activeBoard } = useBoard();

  const [isEditDeleteOpen, setIsEditDeleteOpen] = useState(false);

  const handleEdit = (activeBoard) => {
    openModal("EDIT_BOARD", activeBoard);
    setIsEditDeleteOpen(false);
  };

  const handleDelete = (activeBoard) => {
    openModal("DELETE_BOARD", activeBoard);
    setIsEditDeleteOpen(false);
  };

  const toggleBoardsList = () => setIsBoardsListOpen((prev) => !prev);

  return (
    <div
      className={`relative flex flex-row justify-between items-center h-16 sm:h-24 px-6 bg-white ${
        isBoardsListOpen && "z-50"
      }`}
    >
      {/* EDIT / DELETE */}
      {isEditDeleteOpen && (
        <div className="absolute min-w-[192px] bg-white rounded-lg p-4 top-20 right-8 shadow-drop-shadow flex flex-col gap-4 justify-start">
          <button
            onClick={() => handleEdit(activeBoard)}
            className="text-start text-mediumGrey bodyL hover:text-mainPurple"
          >
            Edit Board
          </button>
          <button
            onClick={() => handleDelete(activeBoard)}
            className="text-start text-red bodyL hover:text-redHover"
          >
            Delete Board
          </button>
        </div>
      )}

      {/* Mobile Logo */}
      {isMobile && (
        <div className="mr-4">
          <img src="./assets/logo-mobile.svg" alt="logo" />
        </div>
      )}

      {/* Board Title */}
      <h1 className="headingL sm:headingXL text-black mr-auto flex gap-2 items-center">
        {activeBoard.name}{" "}
        {isMobile &&
          (isBoardsListOpen ? (
            <FaChevronUp
              onClick={toggleBoardsList}
              className="w-2 text-mainPurple cursor-pointer"
            />
          ) : (
            <FaChevronDown
              onClick={toggleBoardsList}
              className="w-2 text-mainPurple cursor-pointer"
            />
          ))}
      </h1>

      {/* Add Task Button */}
      <div className="flex flex-row gap-4 sm:gap-6 items-center">
        <button
          onClick={() => openModal("ADD_TASK")}
          className="bg-mainPurple rounded-3xl headingM w-12 h-8 sm:w-[164px] sm:h-12 text-white hover:bg-mainPurpleHover"
        >
          + {!isMobile && "Add New Task"}
        </button>

        {/* More Options */}
        <BsThreeDotsVertical
          onClick={() => setIsEditDeleteOpen(!isEditDeleteOpen)}
          className="text-mediumGrey text-base sm:text-2xl cursor-pointer"
        />
      </div>
    </div>
  );
};

export default Navbar;
