import { useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { useBoard } from "../../BoardContext";

const AddBoardModal = () => {
  const { addBoard } = useBoard();
  const [newBoard, setNewBoard] = useState({
    name: "",
    columns: [
      { name: "Todo", tasks: [] },
      { name: "Doing", tasks: [] },
    ],
  });

  const handleAddColumn = () => {
    setNewBoard((prevBoard) => ({
      ...prevBoard,
      columns: [...prevBoard.columns, { name: "", tasks: [] }],
    }));
  };

  const handleRemoveColumn = (index) => {
    setNewBoard((prevBoard) => ({
      ...prevBoard,
      columns: prevBoard.columns.filter((_, i) => i !== index),
    }));
  };

  const handleCreateBoard = (e) => {
    e.preventDefault();
    addBoard(newBoard);
  };

  return (
    <div className=" max-h-[90vh] fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[343px] sm:w-[480px] bg-white dark:bg-darkGrey rounded-md p-6 md:p-8 flex flex-col gap-6 shadow-lg z-40 overflow-y-auto">
      <h2 className="headingL text-black dark:text-white">Add New Board</h2>
      <form className="flex flex-col gap-6">
        {/* Name */}
        <div className="flex flex-col gap-2">
          <label
            htmlFor="name"
            className="bodyM text-mediumGrey dark:text-white"
          >
            Board Name
          </label>
          <input
            className="bg-transparent w-full rounded-[4px] border border-linesLight dark:border-linesDark outline-none px-4 py-2 bodyL text-black dark:text-white"
            type="text"
            name="name"
            id="name"
            value={newBoard.name}
            placeholder="e.g. Web Design"
            onChange={(e) =>
              setNewBoard((prevBoard) => ({
                ...prevBoard,
                name: e.target.value,
              }))
            }
          />
        </div>

        {/* Subtasks */}
        <div className="flex flex-col gap-2">
          <label
            htmlFor="column"
            className="bodyM text-mediumGrey dark:text-white"
          >
            Board Columns
          </label>
          {newBoard.columns.map((c, index) => (
            <div key={index} className="flex gap-4 items-center">
              <input
                className="bg-transparent flex-1 rounded-[4px] border border-linesLight dark:border-linesDark px-4 py-2 bodyL text-black dark:text-white outline-none"
                placeholder="....."
                type="text"
                id={`column-${index}`}
                name={`column-${index}`}
                value={c.name}
                onChange={(e) =>
                  setNewBoard((prevBoard) => {
                    const updatedColumns = [...prevBoard.columns];
                    updatedColumns[index].name = e.target.value;
                    return { ...prevBoard, columns: updatedColumns };
                  })
                }
              />

              <RxCross2
                onClick={() => handleRemoveColumn(index)}
                className="size-5 text-mediumGrey cursor-pointer hover:text-mainPurple"
              />
            </div>
          ))}
          <button
            onClick={handleAddColumn}
            className="w-full bg-mainPurple dark:bg-white bg-opacity-10 py-2 rounded-[20px] text-mainPurple bodyL font-bold"
          >
            + Add New Column
          </button>
        </div>

        <button
          onClick={handleCreateBoard}
          type="button"
          className="w-full bg-mainPurple py-2 rounded-[20px] text-white bodyL font-bold hover:bg-mainPurpleHover"
        >
          Create New Board
        </button>
      </form>
    </div>
  );
};

export default AddBoardModal;
