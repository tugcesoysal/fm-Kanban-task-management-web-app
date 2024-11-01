import { useState, useEffect } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaChevronDown, FaChevronUp, FaCheck } from "react-icons/fa";
import { useBoard } from "../../BoardContext";

const TaskViewModal = () => {
  const [isEditDeleteOpen, setIsEditDeleteOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const statusOptions = ["Doing", "To Do", "Done"];
  const { modal, openModal, updateTask } = useBoard();
  const [task, setTask] = useState(modal.data);

  useEffect(() => {
    setTask(modal.data);
  }, [modal.data]);

  const toggleSubtaskCompletion = (subtaskIndex) => {
    const updatedSubtasks = task.subtasks.map((subtask, index) =>
      index === subtaskIndex
        ? { ...subtask, isCompleted: !subtask.isCompleted }
        : subtask,
    );
    const updatedTask = { ...task, subtasks: updatedSubtasks };
    setTask(updatedTask);
    updateTask(updatedTask);
  };

  const updateTaskStatus = (newStatus) => {
    const updatedTask = { ...task, status: newStatus };
    setTask(updatedTask);
    updateTask(updatedTask);
    setIsDropdownOpen(false);
  };

  const openTaskEdit = () => {
    openModal("EDIT_TASK", modal.data);
  };

  const openTaskDelete = () => {
    openModal("DELETE_TASK", modal.data);
  };

  return (
    <div className=" fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[343px] sm:w-[480px] bg-white dark:bg-darkGrey rounded-md p-6 md:p-8 flex flex-col gap-6 shadow-lg z-40">
      {/* EDIT / DELETE */}
      {isEditDeleteOpen && (
        <div className="absolute min-w-[192px] bg-white dark:bg-darkBG rounded-lg p-4 top-20 -right-20 shadow-drop-shadow flex flex-col gap-4 justify-start ">
          <button
            onClick={() => openTaskEdit()}
            className=" text-start text-mediumGrey  bodyL hover:text-mainPurple"
          >
            Edit Task
          </button>
          <button
            onClick={() => openTaskDelete()}
            className="text-start text-red  bodyL hover:text-redHover"
          >
            Delete Task
          </button>
        </div>
      )}

      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="headingL text-black dark:text-white">{task.title}</h2>
        <BsThreeDotsVertical
          onClick={() => setIsEditDeleteOpen(!isEditDeleteOpen)}
          className="text-mediumGrey text-2xl cursor-pointer"
        />
      </div>
      {/* Description */}
      <p className="bodyL text-mediumGrey">
        {task.description || "No description provided."}
      </p>
      {/* Subtasks */}
      <div className="flex flex-col gap-2">
        <h3 className="bodyM text-mediumGrey dark:text-white mb-2">
          Subtasks (
          {task.subtasks.filter((subtask) => subtask.isCompleted).length} of{" "}
          {task.subtasks.length})
        </h3>
        {task.subtasks.map((subtask, index) => (
          <button
            onClick={() => toggleSubtaskCompletion(index)}
            key={index}
            className={`flex gap-4 items-center justify-start bg-lightBG dark:bg-darkBG p-3 rounded-md text-xs md:bodyM text-black dark:text-white hover:text-black ${
              !subtask.isCompleted &&
              "hover:bg-mainPurple hover:bg-opacity-25 dark:hover:bg-mainPurple dark:hover:bg-opacity-25"
            }`}
          >
            <div
              className={`flex items-center justify-center size-4 rounded-sm  opacity-100  ${
                subtask.isCompleted
                  ? "bg-mainPurple"
                  : "bg-white border border-linesLight dark:bg-darkGrey dark:border-linesDark "
              }`}
            >
              {subtask.isCompleted && <FaCheck className="text-white" />}
            </div>
            <span
              className={subtask.isCompleted ? "opacity-50 line-through" : ""}
            >
              {" "}
              {subtask.title}
            </span>
          </button>
        ))}
      </div>
      {/* Current Status Dropdown */}
      <div className="relative">
        <h3 className="text-xs md:bodyM text-mediumGrey dark:text-white mb-2">
          Current Status
        </h3>
        <div
          className={`bg-transparent bodyL text-black dark:text-white border border-linesLight dark:border-linesDark hover:border-mainPurple dark:hover:border-mainPurple rounded-md px-4 py-2 flex items-center justify-between cursor-pointer ${
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

        {/* Dropdown List */}
        {isDropdownOpen && (
          <ul className="absolute top-full mt-2 left-0 w-full bg-white dark:bg-darkGrey border border-linesLight dark:border-linesDark rounded-md shadow-lg ">
            {statusOptions.map((option, idx) => (
              <li
                onClick={() => updateTaskStatus(option)}
                key={idx}
                className={`bodyL text-mediumGrey  flex justify-between items-center px-4 py-2 hover:bg-lightBG dark:hover:bg-darkBG cursor-pointer ${
                  task.status === option && "text-mainPurple"
                }`}
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
    </div>
  );
};

export default TaskViewModal;
