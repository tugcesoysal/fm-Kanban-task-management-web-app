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

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-40">
      <div className="relative w-[480px] bg-white rounded-md p-8 flex flex-col gap-6 shadow-lg">
        <h2 className="headingL text-black">Add New Board</h2>
        <form className="flex flex-col gap-6">
          {/* Name */}
          <div className="flex flex-col gap-2">
            <label htmlFor="name" className="bodyM text-mediumGrey">
              Name
            </label>
            <input
              className="w-full rounded-[4px] border border-linesLight outline-none px-4 py-2 bodyL text-black"
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
            <label htmlFor="column" className="bodyM text-mediumGrey">
              Columns
            </label>
            {newBoard.columns.map((c, index) => (
              <div key={index} className="flex gap-4 items-center">
                <input
                  className="flex-1 rounded-[4px] border border-linesLight px-4 py-2 bodyL text-black outline-none"
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
              className="w-full bg-mainPurple bg-opacity-10 py-2 rounded-[20px] text-mainPurple bodyL font-bold"
            >
              + Add New Column
            </button>
          </div>

          <button
            onClick={addBoard}
            type="button"
            className="w-full bg-mainPurple py-2 rounded-[20px] text-white bodyL font-bold hover:bg-mainPurpleHover"
          >
            Create New Board
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddBoardModal;
