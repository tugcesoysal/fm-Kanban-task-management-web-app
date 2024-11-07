import { useState, useEffect } from "react";
import { RxCross2 } from "react-icons/rx";
import { useBoard } from "../../BoardContext";

const EditBoardModal = () => {
  const { activeBoard, updateBoard } = useBoard();
  const [updatedBoard, setUpdatedBoard] = useState(activeBoard);

  const handleAddColumn = () => {
    setUpdatedBoard({
      ...updatedBoard,
      columns: [...updatedBoard.columns, { name: "", tasks: [] }],
    });
  };

  const handleRemoveColumn = (index) => {
    setUpdatedBoard({
      ...updatedBoard,
      columns: updatedBoard.columns.filter((_, i) => i !== index),
    });
  };

  const handleColumnNameChange = (index, newName) => {
    const updatedColumns = [...updatedBoard.columns];
    updatedColumns[index].name = newName;
    setUpdatedBoard({ ...updatedBoard, columns: updatedColumns });
  };

  const handleSaveChanges = () => {
    updateBoard(updatedBoard);
  };

  return (
    <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[343px] sm:w-[480px] bg-white dark:bg-darkGrey rounded-md p-6 md:p-8 flex flex-col gap-6 shadow-lg z-40 overflow-y-auto">
      <h2 className="headingL text-black dark:text-white">Edit Board</h2>
      <form
        className="flex flex-col gap-6"
        onSubmit={(e) => e.preventDefault()}
      >
        {/* Name */}
        <div className="flex flex-col gap-2">
          <label
            htmlFor="name"
            className="bodyM text-mediumGrey dark:text-white"
          >
            Board Name
          </label>
          <input
            className="bg-transparent w-full rounded-[4px] border border-linesLight dark:border-linesDark px-4 py-2 bodyL text-black dark:text-white outline-none cursor-pointer hover:border-mainPurple dark:hover:border-mainPurple focus:border-mainPurple dark:focus:border-mainPurple"
            type="text"
            id="name"
            value={updatedBoard.name}
            onChange={(e) =>
              setUpdatedBoard({ ...updatedBoard, name: e.target.value })
            }
          />
        </div>

        {/* Columns */}
        <div className="flex flex-col gap-2">
          <label className="bodyM text-mediumGrey dark:text-white">
            Board Columns
          </label>
          {updatedBoard.columns.map((column, index) => (
            <div key={index} className="flex gap-4 items-center">
              <input
                className="bg-transparent flex-1 rounded-[4px] border border-linesLight dark:border-linesDark px-4 py-2 bodyL text-black dark:text-white outline-none cursor-pointer hover:border-mainPurple dark:hover:border-mainPurple focus:border-mainPurple dark:focus:border-mainPurple"
                type="text"
                value={column.name}
                onChange={(e) => handleColumnNameChange(index, e.target.value)}
              />
              <RxCross2
                className="size-5 text-mediumGrey cursor-pointer hover:text-red"
                onClick={() => handleRemoveColumn(index)}
              />
            </div>
          ))}
          <button
            type="button"
            onClick={handleAddColumn}
            className="w-full bg-mainPurple dark:bg-white bg-opacity-10 mt-3 py-2 rounded-[20px] text-mainPurple bodyL font-bold"
          >
            + Add New Column
          </button>
        </div>

        <button
          type="button"
          onClick={handleSaveChanges}
          className="w-full bg-mainPurple py-2 rounded-[20px] text-white bodyL font-bold hover:bg-mainPurpleHover"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default EditBoardModal;
