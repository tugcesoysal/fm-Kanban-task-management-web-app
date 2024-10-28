const Board = ({ board, openTaskView }) => {
  return (
    <div className="h-full p-6 flex gap-6 ">
      {board.map((col, colIndex) => (
        <div key={colIndex} className="w-[280px]">
          <div className="flex gap-3 w-[280px] ">
            <div className="size-4 rounded-full bg-blueDot"></div>
            <h2 className="headingS text-mediumGrey uppercase mb-6">
              {col.name} ({col.tasks.length})
            </h2>
          </div>
          {/* tasks */}
          <div className="flex flex-col gap-5">
            {col.tasks.map((task, taskIndex) => (
              <div
                onClick={() => openTaskView(task)}
                key={taskIndex}
                className="w-full rounded-lg bg-white px-4 py-6 shadow-drop-shadow cursor-pointer group"
              >
                <h2 className="headingM text-black group-hover:text-mainPurple">
                  {task.title}
                </h2>
                <p className="bodyM text-mediumGrey mt-2">
                  {
                    task.subtasks.filter((subtask) => subtask.isCompleted)
                      .length
                  }{" "}
                  of {task.subtasks.length} subtasks
                </p>
              </div>
            ))}
          </div>
        </div>
      ))}
      <button className="w-[280px] flex items-center justify-center bg-linesLight rounded-md headingXL text-mediumGrey hover:text-mainPurple">
        + New Column
      </button>
    </div>
  );
};

export default Board;
