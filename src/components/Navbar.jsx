import { useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useBoard } from "../BoardContext";

const Navbar = () => {
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

  return (
    <div className=" relative flex flex-row justify-between items-center h-24 px-6 bg-white">
      {/* EDIT / DELETE */}
      {isEditDeleteOpen && (
        <div className="absolute min-w-[192px] bg-white rounded-lg p-4 top-20 right-8 shadow-drop-shadow flex flex-col gap-4 justify-start ">
          <button
            onClick={handleEdit}
            className=" text-start text-mediumGrey  bodyL hover:text-mainPurple"
          >
            Edit Board
          </button>
          <button
            onClick={handleDelete}
            className="text-start text-red  bodyL hover:text-redHover"
          >
            Delete Board
          </button>
        </div>
      )}
      <h1 className="headingXL text-black">{activeBoard.name}</h1>
      <div className="flex flex-row gap-6 items-center">
        <button
          onClick={() => openModal("ADD_TASK")}
          className="bg-mainPurple rounded-3xl headingM h-12 px-6 text-white hover:bg-mainPurpleHover"
        >
          + Add New Task
        </button>
        <BsThreeDotsVertical
          onClick={() => setIsEditDeleteOpen(!isEditDeleteOpen)}
          className="text-mediumGrey text-2xl cursor-pointer"
        />
      </div>
    </div>
  );
};

export default Navbar;
