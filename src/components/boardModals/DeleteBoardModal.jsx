import { useBoard } from "../../BoardContext";

const DeleteBoardModal = () => {
  const { activeBoard, deleteBoard, cancel } = useBoard();

  return (
    <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[343px] sm:w-[480px] bg-white rounded-md p-6 md:p-8 flex flex-col gap-6 shadow-lg z-40">
      <div className="relative w-[343px] sm:w-[480px] bg-white rounded-md p-8 flex flex-col gap-6 shadow-lg">
        <h2 className="headingL text-red">Delete this board?</h2>
        <p className="bodyL text-mediumGrey">
          Are you sure you want to delete the ‘{activeBoard.name}’ board and its
          columns? This action cannot be reversed.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <button
            onClick={deleteBoard}
            className="flex-1 py-2 bg-red text-white bodyL font-bold rounded-[20px] hover:bg-redHover"
          >
            Delete
          </button>
          <button
            onClick={cancel}
            className="flex-1 py-2 bg-lightBG text-mainPurple bodyL font-bold rounded-[20px] hover:bg-opacity-25 "
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteBoardModal;
