import { useState } from "react";
import { FaChevronDown, FaChevronUp, FaCheck } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";

const EditBoardModal = ({ board }) => {
  const [name, setName] = useState(board.name);
  const [columns, setColumns] = useState(board.columns);

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
            <label htmlFor="subtask" className="bodyM text-mediumGrey">
              Board Columns
            </label>
            {columns.map((c, index) => (
              <div key={index} className="flex gap-4 items-center">
                <input
                  className="flex-1 rounded-[4px] border border-linesLight px-4 py-2 bodyL text-black outline-none"
                  type="text"
                  id={`column-${index}`}
                  name={`column-${index}`}
                  value={c.name}
                  onChange={(e) => {
                    const updatedColumns = [...columns];
                    updatedColumns[index].name = e.target.value;
                    setColumns(updatedColumns);
                  }}
                />
                <RxCross2 className="size-5 text-mediumGrey cursor-pointer hover:text-mainPurple" />
              </div>
            ))}
            <button className="w-full bg-mainPurple bg-opacity-10 py-2 rounded-[20px] text-mainPurple bodyL font-bold">
              + Add New Column
            </button>
          </div>

          <button className="w-full bg-mainPurple py-2 rounded-[20px] text-white bodyL font-bold hover:bg-mainPurpleHover">
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditBoardModal;
