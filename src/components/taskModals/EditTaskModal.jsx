import { useState } from "react";
import { FaChevronDown, FaChevronUp, FaCheck } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";

const EditTaskModal = ({ task }) => {
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const [subtasks, setSubtasks] = useState(task.subtasks);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const statusOptions = ["Doing", "To Do", "Done"];

  // const handleStatus = (newStatus) => {
  //   const updatedTask = { ...task };
  //   updatedTask.status = newStatus;
  //   setSelectedTask(updatedTask);
  //   setIsDropdownOpen(false);
  // };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-40">
      <div className="relative w-[480px] bg-white rounded-md p-8 flex flex-col gap-6 shadow-lg">
        <h2 className="headingL text-black">Edit Task</h2>
        <form className="flex flex-col gap-6">
          {/* Title */}
          <div className="flex flex-col gap-2">
            <label htmlFor="title" className="bodyM text-mediumGrey">
              Title
            </label>
            <input
              className="w-full rounded-[4px] border border-linesLight px-4 py-2 bodyL text-black"
              type="text"
              name="title"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          {/* Description */}

          <div className="flex flex-col gap-2">
            <label htmlFor="description" className="bodyM text-mediumGrey">
              Description
            </label>
            <textarea
              className="w-full rounded-[4px] border border-linesLight outline-none px-4 py-2 bodyL text-black resize-none"
              rows={4}
              name="description"
              id="description"
              placeholder="e.g. It’s always good to take a break. This 15 minute break will recharge the batteries a little."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          {/* Subtasks */}

          <div className="flex flex-col gap-2">
            <label htmlFor="subtask" className="bodyM text-mediumGrey">
              Subtasks
            </label>
            {subtasks.map((s, index) => (
              <div key={index} className="flex gap-4 items-center">
                <input
                  className="flex-1 rounded-[4px] border border-linesLight px-4 py-2 bodyL text-black outline-none"
                  type="text"
                  id={`subtask-${index}`}
                  name={`subtask-${index}`}
                  value={s.title}
                  onChange={(e) => {
                    const updatedSubtasks = [...subtasks];
                    updatedSubtasks[index].title = e.target.value;
                    setSubtasks(updatedSubtasks);
                  }}
                />
                <RxCross2 className="size-5 text-mediumGrey cursor-pointer hover:text-mainPurple" />
              </div>
            ))}
            <button className="w-full bg-mainPurple bg-opacity-10 py-2 rounded-[20px] text-mainPurple bodyL font-bold">
              + Add New Subtask
            </button>
          </div>
          {/* Current Status Dropdown */}
          <div className="relative">
            <h3 className="bodyM text-mediumGrey mb-2">Current Status</h3>
            <div
              className="bg-white bodyL text-black border border-mediumGrey rounded-md px-4 py-2 flex items-center justify-between cursor-pointer"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              <span className="bodyL text-black">{task.status}</span>
              {isDropdownOpen ? (
                <FaChevronUp />
              ) : (
                <FaChevronDown className="text-mainPurple" />
              )}
            </div>

            {/* Dropdown List */}
            {isDropdownOpen && (
              <ul className="absolute top-full mt-2 left-0 w-full bg-white border border-mediumGrey rounded-md shadow-lg">
                {statusOptions.map((option, idx) => (
                  <li
                    key={idx}
                    className={`bodyL text-black flex justify-between items-center px-4 py-2 hover:bg-lightBG cursor-pointer ${
                      task.status === option && "text-mainPurple"
                    }`}
                    onClick={() => handleStatus(option)}
                  >
                    {option}{" "}
                    {task.status === option && (
                      <FaCheck className="text-mainPurple" />
                    )}
                  </li>
                ))}
              </ul>
            )}
          </div>
          <button className="w-full bg-mainPurple py-2 rounded-[20px] text-white bodyL font-bold hover:bg-mainPurpleHover">
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditTaskModal;
