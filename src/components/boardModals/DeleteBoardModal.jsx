const DeleteBoardModal = ({ board, onCancel }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-40">
      <div className="relative w-[480px] bg-white rounded-md p-8 flex flex-col gap-6 shadow-lg">
        <h2 className="headingL text-red">Delete this board?</h2>
        <p className="bodyL text-mediumGrey">
          Are you sure you want to delete the ‘{board.name}’ board and its
          columns? This action cannot be reversed.
        </p>
        <div className="flex gap-4">
          <button className="flex-1 py-2 bg-red text-white bodyL font-bold rounded-[20px] hover:bg-redHover">
            Delete
          </button>
          <button
            onClick={onCancel}
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
