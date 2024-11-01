import { useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { useBoard } from "../../BoardContext";

const EditBoardModal = () => {
  const { activeBoard, setActiveBoard, updateBoard } = useBoard();
  const [name, setName] = useState(activeBoard.name);
  const [columns, setColumns] = useState(activeBoard.columns);

  const handleAddColumn = () => {
    setColumns([...columns, { name: "" }]);
  };

  const handleRemoveColumn = (index) => {
    setColumns(columns.filter((_, i) => i !== index));
  };

  return (
    <div className=" fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[343px] sm:w-[480px] bg-white dark:bg-darkGrey rounded-md p-6 md:p-8 flex flex-col gap-6 shadow-lg z-40 overflow-y-auto">
      <h2 className="headingL text-black dark:text-white">Edit Board</h2>
      <form className="flex flex-col gap-6">
        {/* Name */}
        <div className="flex flex-col gap-2">
          <label
            htmlFor="title"
            className="bodyM text-mediumGrey dark:text-white"
          >
            Board Name
          </label>
          <input
            className="bg-transparent w-full rounded-[4px] border border-linesLight dark:border-linesDark px-4 py-2 bodyL text-black dark:text-white outline-none cursor-pointer hover:border-mainPurple dark:hover:border-mainPurple focus:border-mainPurple dark:focus:border-mainPurple"
            type="text"
            name="name"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        {/* Columns */}
        <div className="flex flex-col gap-2">
          <label className="bodyM text-mediumGrey dark:text-white">
            Board Columns
          </label>
          {columns.map((column, index) => (
            <div key={index} className="flex gap-4 items-center">
              <input
                className="bg-transparent flex-1 rounded-[4px] border border-linesLight dark:border-linesDark px-4 py-2 bodyL text-black dark:text-white outline-none cursor-pointer hover:border-mainPurple dark:hover:border-mainPurple  focus:border-mainPurple dark:focus:border-mainPurple"
                type="text"
                value={column.name}
                onChange={(e) => {
                  const updatedColumns = [...columns];
                  updatedColumns[index].name = e.target.value;
                  setColumns(updatedColumns);
                }}
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
          onClick={updateBoard}
          className="w-full bg-mainPurple py-2 rounded-[20px] text-white bodyL font-bold hover:bg-mainPurpleHover"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default EditBoardModal;
