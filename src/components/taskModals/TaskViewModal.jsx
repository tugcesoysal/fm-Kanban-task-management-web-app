import { useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaChevronDown, FaChevronUp, FaCheck } from "react-icons/fa";
import { MdCheckBox, MdCheckBoxOutlineBlank } from "react-icons/md";

const TaskViewModal = ({ task, onDelete, onEdit }) => {
  const [isEditDeleteOpen, setIsEditDeleteOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const statusOptions = ["Doing", "To Do", "Done"];

  // const toggleSubtasksCompletion = (index) => {
  //   const updatedTask = { ...task };
  //   updatedTask.subtasks[index].isCompleted =
  //     !updatedTask.subtasks[index].isCompleted;
  //   setSelectedTask(updatedTask);
  // };

  // const handleStatus = (newStatus) => {
  //   const updatedTask = { ...task };
  //   updatedTask.status = newStatus;
  //   setSelectedTask(updatedTask);
  //   setIsDropdownOpen(false);
  // };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-40">
      <div className="relative w-[480px] bg-white rounded-md p-8 flex flex-col gap-6 shadow-lg">
        {/* EDIT / DELETE */}
        {isEditDeleteOpen && (
          <div className="absolute min-w-[192px] bg-white rounded-lg p-4 top-20 -right-20 shadow-drop-shadow flex flex-col gap-4 justify-start ">
            <button
              onClick={onEdit}
              className=" text-start text-mediumGrey  bodyL hover:text-mainPurple"
            >
              Edit Task
            </button>
            <button
              onClick={onDelete}
              className="text-start text-red  bodyL hover:text-redHover"
            >
              Delete Task
            </button>
          </div>
        )}

        {/* Header */}
        <div className="flex justify-between items-center">
          <h2 className="headingL text-black">{task.title}</h2>

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
          <h3 className="bodyM text-mediumGrey mb-2">
            Subtasks (
            {task.subtasks.filter((subtask) => subtask.isCompleted).length} of{" "}
            {task.subtasks.length})
          </h3>
          {task.subtasks.map((subtask, index) => (
            <button
              onClick={() => toggleSubtasksCompletion(index)}
              key={index}
              className={`flex gap-4 items-center justify-start bg-lightBG p-3 rounded-md bodyM text-black hover:text-black hover:bg-mainPurple hover:bg-opacity-25 ${
                subtask.isCompleted ? "opacity-50 line-through" : ""
              }`}
            >
              {subtask.isCompleted ? (
                <MdCheckBox className="text-mainPurple text-lg" />
              ) : (
                <MdCheckBoxOutlineBlank className="text-mediumGrey text-lg" />
              )}
              {subtask.title}
            </button>
          ))}
        </div>
        {/* Current Status Dropdown */}
        <div className="relative">
          <h3 className="bodyM text-mediumGrey mb-2">Current Status</h3>
          <div
            className="bg-white bodyL text-black border border-mediumGrey rounded-md px-4 py-2 flex items-center justify-between cursor-pointer hover:border-mainPurple"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            <span className="bodyL text-black">{task.status}</span>
            {isDropdownOpen ? (
              <FaChevronUp className="text-mainPurple" />
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
                  className={`bodyL text-mediumGrey flex justify-between items-center px-4 py-2 hover:bg-lightBG cursor-pointer ${
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
      </div>
    </div>
  );
};

export default TaskViewModal;
