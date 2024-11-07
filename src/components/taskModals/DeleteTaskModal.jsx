import { useBoard } from "../../BoardContext";

const DeleteTaskModal = () => {
  const { modal, deleteTask, closeModal } = useBoard();
  const task = modal?.data;

  if (!task) return null;

  return (
    <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[343px] sm:w-[480px] bg-white dark:bg-darkGrey rounded-md p-6 md:p-8 flex flex-col gap-6 shadow-lg z-40">
      <h2 className="headingL text-red">Delete this task?</h2>
      <p className="bodyL text-mediumGrey">
        Are you sure you want to delete the task ‘{task.title}’ and all its
        subtasks? This action cannot be undone.
      </p>

      <div className="flex flex-col sm:flex-row gap-4">
        <button
          className="flex-1 py-2 bg-red text-white bodyL font-bold rounded-[20px] hover:bg-redHover"
          onClick={() => {
            deleteTask(task.id);
          }}
        >
          Delete
        </button>
        <button
          className="flex-1 py-2 bg-lightBG text-mainPurple bodyL font-bold rounded-[20px]"
          onClick={closeModal}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default DeleteTaskModal;
