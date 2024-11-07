import { useState } from "react";
import { FaChevronDown, FaChevronUp, FaCheck } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import { useBoard } from "../../BoardContext";
import { toast } from "react-toastify";

const EditTaskModal = () => {
  const {
    modal,
    updateTask,
    activeBoard,
    closeModal,
    setBoards,
    setActiveBoard,
  } = useBoard();
  const [task, setTask] = useState(modal.data);

  const [title, setTitle] = useState(task?.title || "");
  const [description, setDescription] = useState(task?.description || "");
  const [subtasks, setSubtasks] = useState(task?.subtasks || []);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const statusOptions = activeBoard
    ? activeBoard.columns.map((c) => c.name)
    : [];

  const updateTaskStatus = (newStatus) => {
    const currentColumn = activeBoard.columns.find((column) =>
      column.tasks.some((t) => t.id === task.id),
    );
    const targetColumn = activeBoard.columns.find(
      (column) => column.name === newStatus,
    );

    if (currentColumn.id === targetColumn.id) {
      setIsDropdownOpen(false);
      return;
    }

    const updatedCurrentColumn = {
      ...currentColumn,
      tasks: currentColumn.tasks.filter((t) => t.id !== task.id),
    };
    const updatedTargetColumn = {
      ...targetColumn,
      tasks: [...targetColumn.tasks, { ...task, status: newStatus }],
    };

    setBoards((prevBoards) => {
      const updatedBoards = prevBoards.map((board) => {
        if (board.id === activeBoard.id) {
          const updatedColumns = board.columns.map((column) => {
            if (column.id === currentColumn.id) {
              return updatedCurrentColumn;
            }
            if (column.id === targetColumn.id) {
              return updatedTargetColumn;
            }
            return column;
          });
          return { ...board, columns: updatedColumns };
        }
        return board;
      });
      const refreshedActiveBoard = updatedBoards.find(
        (board) => board.id === activeBoard.id,
      );
      setActiveBoard(refreshedActiveBoard);
      return updatedBoards;
    });

    setTask((prevTask) => ({ ...prevTask, status: newStatus }));
    setIsDropdownOpen(false);
    toast.success("Task status updated successfully!");
  };

  const handleSaveChanges = (e) => {
    e.preventDefault();
    const updatedTask = { ...task, title, description, subtasks };
    updateTask(updatedTask);
    closeModal();
  };

  return (
    <div className="max-h-[90vh] fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[343px] sm:w-[480px] bg-white dark:bg-darkGrey rounded-md p-8 flex flex-col gap-6 shadow-lg z-40 overflow-y-auto">
      <h2 className="headingL text-black dark:text-white">Edit Task</h2>
      <form onSubmit={handleSaveChanges} className="flex flex-col gap-6">
        {/* Title */}
        <div className="flex flex-col gap-2">
          <label
            htmlFor="title"
            className="bodyM text-mediumGrey dark:text-white"
          >
            Title
          </label>
          <input
            className="bg-transparent w-full rounded-[4px] border border-linesLight dark:border-linesDark px-4 py-2 bodyL text-black dark:text-white outline-none cursor-pointer hover:border-mainPurple dark:hover:border-mainPurple"
            type="text"
            name="title"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        {/* Description */}
        <div className="flex flex-col gap-2">
          <label
            htmlFor="description"
            className="bodyM text-mediumGrey dark:text-white"
          >
            Description
          </label>
          <textarea
            className="bg-transparent w-full rounded-[4px] border border-linesLight dark:border-linesDark outline-none px-4 py-2 bodyL text-black dark:text-white resize-none cursor-pointer hover:border-mainPurple dark:hover:border-mainPurple"
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
          <label
            htmlFor="subtask"
            className="bodyM text-mediumGrey dark:text-white"
          >
            Subtasks
          </label>
          {subtasks.map((s, index) => (
            <div key={index} className="flex gap-4 items-center">
              <input
                className="bg-transparent flex-1 rounded-[4px] border border-linesLight dark:border-linesDark px-4 py-2 bodyL text-black dark:text-white outline-none cursor-pointer hover:border-mainPurple dark:hover:border-mainPurple"
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
              <RxCross2
                className="size-5 text-mediumGrey cursor-pointer hover:text-red"
                onClick={() => {
                  const updatedSubtasks = subtasks.filter(
                    (_, i) => i !== index,
                  );
                  setSubtasks(updatedSubtasks);
                }}
              />
            </div>
          ))}
          <button className="w-full bg-mainPurple dark:bg-white bg-opacity-10 py-2 rounded-[20px] text-mainPurple dark:text-mainPurple bodyL font-bold">
            + Add New Subtask
          </button>
        </div>

        {/* Current Status Dropdown */}
        <div className="relative">
          <h3 className="bodyM text-mediumGrey dark:text-white mb-2">
            Current Status
          </h3>
          <div
            className={`bg-transparent bodyL text-black border border-linesLight dark:border-linesDark rounded-md px-4 py-2 flex items-center justify-between cursor-pointer hover:border-mainPurple dark:hover:border-mainPurple ${
              isDropdownOpen && "border-mainPurple dark:border-mainPurple"
            }`}
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            <span className="bodyL text-black dark:text-white">
              {task.status}
            </span>
            {isDropdownOpen ? (
              <FaChevronUp className="text-mainPurple" />
            ) : (
              <FaChevronDown className="text-mainPurple" />
            )}
          </div>
          {isDropdownOpen && (
            <ul className="absolute top-full mt-2 left-0 w-full bg-white dark:bg-darkGrey border border-linesLight dark:border-linesDark rounded-md shadow-lg">
              {statusOptions.map((option, idx) => (
                <li
                  key={idx}
                  className={`bodyL text-mediumGrey dark:text-white flex justify-between items-center px-4 py-2 hover:bg-lightBG dark:hover:bg-darkBG cursor-pointer ${
                    task.status === option && "text-mainPurple"
                  }`}
                  onClick={() => updateTaskStatus(option)}
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

        <button
          type="submit"
          className="w-full bg-mainPurple py-2 rounded-[20px] text-white bodyL font-bold hover:bg-mainPurpleHover"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default EditTaskModal;
