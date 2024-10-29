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
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-40">
      <div className="relative w-[480px] bg-white rounded-md p-8 flex flex-col gap-6 shadow-lg">
        <h2 className="headingL text-black">Edit Board</h2>
        <form className="flex flex-col gap-6">
          {/* Name */}
          <div className="flex flex-col gap-2">
            <label htmlFor="title" className="bodyM text-mediumGrey">
              Board Name
            </label>
            <input
              className="w-full rounded-[4px] border border-linesLight px-4 py-2 bodyL text-black"
              type="text"
              name="name"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          {/* Columns */}
          <div className="flex flex-col gap-2">
            <label className="bodyM text-mediumGrey">Board Columns</label>
            {columns.map((column, index) => (
              <div key={index} className="flex gap-4 items-center">
                <input
                  className="flex-1 rounded-[4px] border border-linesLight px-4 py-2 bodyL text-black outline-none"
                  type="text"
                  value={column.name}
                  onChange={(e) => {
                    const updatedColumns = [...columns];
                    updatedColumns[index].name = e.target.value;
                    setColumns(updatedColumns);
                  }}
                />
                <RxCross2
                  className="size-5 text-mediumGrey cursor-pointer hover:text-mainPurple"
                  onClick={() => handleRemoveColumn(index)}
                />
              </div>
            ))}
            <button
              type="button"
              onClick={handleAddColumn}
              className="w-full bg-mainPurple bg-opacity-10 py-2 rounded-[20px] text-mainPurple bodyL font-bold"
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
    </div>
  );
};

export default EditBoardModal;
