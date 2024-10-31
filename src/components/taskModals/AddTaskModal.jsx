import { useState } from "react";
import { FaChevronDown, FaChevronUp, FaCheck } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import { useBoard } from "../../BoardContext";

const AddTaskModal = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    status: "To Do",
    subtasks: [
      { title: "", isCompleted: false },
      { title: "", isCompleted: false },
    ],
  });

  const statusOptions = ["Doing", "To Do", "Done"];

  const { addTask } = useBoard();

  const handleStatus = (newStatus) => {
    setNewTask((prevTask) => ({ ...prevTask, status: newStatus }));
    setIsDropdownOpen(false);
  };

  const handleAddSubtask = (e) => {
    e.preventDefault();
    setNewTask((prevTask) => ({
      ...prevTask,
      subtasks: [...prevTask.subtasks, { title: "", isCompleted: false }],
    }));
  };

  const handleRemoveSubtask = (index) => {
    setNewTask((prevTask) => ({
      ...prevTask,
      subtasks: prevTask.subtasks.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addTask(); // Pass the new task to a parent handler or save function
  };

  return (
    <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[343px] sm:w-[480px] bg-white rounded-md p-6 md:p-8 flex flex-col gap-6 shadow-lg z-40">
      <h2 className="headingL text-black">Add New Task</h2>
      <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
        {/* Title */}
        <div className="flex flex-col gap-2">
          <label htmlFor="title" className="bodyM text-mediumGrey">
            Title
          </label>
          <input
            className="w-full rounded-[4px] border border-linesLight outline-none px-4 py-2 bodyL text-black cursor-pointer hover:border-mainPurple"
            type="text"
            name="title"
            id="title"
            value={newTask.title}
            placeholder="e.g. Take coffee break"
            onChange={(e) =>
              setNewTask((prevTask) => ({
                ...prevTask,
                title: e.target.value,
              }))
            }
            required
          />
        </div>

        {/* Description */}
        <div className="flex flex-col gap-2">
          <label htmlFor="description" className="bodyM text-mediumGrey">
            Description
          </label>
          <textarea
            className="w-full rounded-[4px] border border-linesLight outline-none px-4 py-2 bodyL text-black resize-none cursor-pointer hover:border-mainPurple"
            rows={4}
            name="description"
            id="description"
            placeholder="e.g. It’s always good to take a break. This 15 minute break will recharge the batteries a little."
            value={newTask.description}
            onChange={(e) =>
              setNewTask((prevTask) => ({
                ...prevTask,
                description: e.target.value,
              }))
            }
          />
        </div>

        {/* Subtasks */}
        <div className="flex flex-col gap-2">
          <label htmlFor="subtask" className="bodyM text-mediumGrey">
            Subtasks
          </label>
          {newTask.subtasks.map((s, index) => (
            <div key={index} className="flex gap-4 items-center">
              <input
                className="flex-1 rounded-[4px] border border-linesLight px-4 py-2 bodyL text-black outline-none"
                placeholder="Subtask title"
                type="text"
                id={`subtask-${index}`}
                name={`subtask-${index}`}
                value={s.title}
                onChange={(e) =>
                  setNewTask((prevTask) => {
                    const updatedSubtasks = [...prevTask.subtasks];
                    updatedSubtasks[index].title = e.target.value;
                    return { ...prevTask, subtasks: updatedSubtasks };
                  })
                }
                required
              />
              <RxCross2
                onClick={() => handleRemoveSubtask(index)}
                className="size-5 text-mediumGrey cursor-pointer hover:text-red"
              />
            </div>
          ))}
          <button
            onClick={handleAddSubtask}
            className="w-full bg-mainPurple bg-opacity-10 py-2 rounded-[20px] text-mainPurple bodyL font-bold hover:bg-opacity-25"
          >
            + Add New Subtask
          </button>
        </div>

        {/* Current Status Dropdown */}
        <div className="relative">
          <h3 className="bodyM text-mediumGrey mb-2">Current Status</h3>
          <div
            className="bg-white bodyL text-black border border-mediumGrey rounded-md px-4 py-2 flex items-center justify-between cursor-pointer hover:border-mainPurple"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            role="button"
            aria-expanded={isDropdownOpen}
          >
            <span className="bodyL text-black">{newTask.status}</span>
            {isDropdownOpen ? (
              <FaChevronUp className="text-mainPurple" />
            ) : (
              <FaChevronDown className="text-mainPurple" />
            )}
          </div>

          {/* Dropdown List */}
          {isDropdownOpen && (
            <ul
              className="absolute top-full mt-2 left-0 w-full bg-white border border-mediumGrey rounded-md shadow-lg"
              role="listbox"
            >
              {statusOptions.map((option, idx) => (
                <li
                  key={idx}
                  className={`bodyL text-mediumGrey flex justify-between items-center px-4 py-2 hover:bg-lightBG cursor-pointer ${
                    newTask.status === option && "text-mainPurple"
                  }`}
                  onClick={() => handleStatus(option)}
                  role="option"
                  aria-selected={newTask.status === option}
                >
                  {option}{" "}
                  {newTask.status === option && (
                    <FaCheck className="text-mainPurple" />
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-mainPurple py-2 rounded-[20px] text-white bodyL font-bold hover:bg-mainPurpleHover"
        >
          Create Task
        </button>
      </form>
    </div>
  );
};

export default AddTaskModal;
