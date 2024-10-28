import { useState, useEffect } from "react";
import Board from "./components/Board";
import Navbar from "./components/Navbar";
import SideBar from "./components/SideBar";
import { data } from "./data";
import TaskViewModal from "./components/taskModals/TaskViewModal";
import AddTaskModal from "./components/taskModals/AddTaskModal";
import DeleteTaskModal from "./components/taskModals/DeleteTaskModal";
import EditTaskModal from "./components/taskModals/EditTaskModal";
import AddBoardModal from "./components/boardModals/AddBoardModal";
import DeleteBoardModal from "./components/boardModals/DeleteBoardModal";
import EditBoardModal from "./components/boardModals/EditBoardModal";

function App() {
  const [boards, setBoards] = useState(data || []);
  const [activeBoard, setActiveBoard] = useState(null);

  const [modal, setModal] = useState({ type: null, data: null });

  useEffect(() => {
    if (boards.length > 0) {
      setActiveBoard(boards[0]);
    }
  }, [boards]);

  const openModal = (type, data = null) => {
    setModal({ type, data });
  };

  const closeModal = () => {
    setModal({ type: null, data: null });
  };

  return (
    <div className="relative h-screen font-jakarta bg-lightBG flex flex-row ">
      <SideBar
        openAddBoardModal={() => openModal("ADD_BOARD")}
        activeBoard={activeBoard}
        setActiveBoard={setActiveBoard}
      />
      <div className="w-full max-w-full overflow-x-hidden flex flex-col mb-12">
        <Navbar
          addTaskModal={() => openModal("ADD_TASK")}
          deleteBoardModal={() => openModal("DELETE_BOARD", activeBoard)}
          editBoardModal={() => openModal("EDIT_BOARD", activeBoard)}
        />
        <div className="flex-1 overflow-x-auto scrollbar-hide flex items-center justify-center">
          {activeBoard ? (
            <Board
              board={activeBoard.columns}
              openTaskView={(task) => openModal("TASK_VIEW", task)}
              openTaskEdit={(task) => openModal("EDIT_TASK", task)}
              deleteTaskModal={() => openModal("DELETE_TASK", task)}
            />
          ) : (
            <div className="flex flex-col gap-8 items-center justify-center ">
              <p className="headingL text-mediumGrey">
                This board is empty. Create a new column to get started.
              </p>
              <button
                onClick={() => openModal("ADD_COLUMN")}
                className="bg-mainPurple rounded-3xl headingM h-12 px-6 text-white hover:bg-mainPurpleHover"
              >
                + Add New Column
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Conditional Modals */}

      {modal.type === "TASK_VIEW" && (
        <TaskViewModal
          task={modal.data}
          onDelete={() => openModal("DELETE_TASK", modal.data)}
          onEdit={() => openModal("EDIT_TASK", modal.data)}
        />
      )}

      {modal.type === "ADD_TASK" && <AddTaskModal onClose={closeModal} />}

      {modal.type === "EDIT_TASK" && <EditTaskModal task={modal.data} />}

      {modal.type === "DELETE_TASK" && (
        <DeleteTaskModal onCancel={closeModal} task={modal.data} />
      )}

      {modal.type === "ADD_BOARD" && <AddBoardModal />}

      {modal.type === "DELETE_BOARD" && (
        <DeleteBoardModal onCancel={closeModal} board={modal.data} />
      )}

      {modal.type === "EDIT_BOARD" && <EditBoardModal board={modal.data} />}
    </div>
  );
}

export default App;
