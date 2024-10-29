import { useBoard } from "./BoardContext";
import Board from "./components/Board";
import Navbar from "./components/Navbar";
import SideBar from "./components/SideBar";
import TaskViewModal from "./components/taskModals/TaskViewModal";
import AddTaskModal from "./components/taskModals/AddTaskModal";
import DeleteTaskModal from "./components/taskModals/DeleteTaskModal";
import EditTaskModal from "./components/taskModals/EditTaskModal";
import AddBoardModal from "./components/boardModals/AddBoardModal";
import DeleteBoardModal from "./components/boardModals/DeleteBoardModal";
import EditBoardModal from "./components/boardModals/EditBoardModal";

function App() {
  const { activeBoard, openModal, modal } = useBoard();

  return (
    <div className="relative h-screen font-jakarta bg-lightBG flex flex-row ">
      <SideBar />
      <div className="w-full max-w-full overflow-x-hidden flex flex-col mb-12">
        <Navbar />
        <div className="flex-1 overflow-x-auto scrollbar-hide flex items-center justify-center">
          {activeBoard ? (
            <Board />
          ) : (
            <div className="flex flex-col gap-8 items-center justify-center ">
              <p className="headingL text-mediumGrey text-center">
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

      {modal.type === "TASK_VIEW" && <TaskViewModal />}

      {modal.type === "ADD_TASK" && <AddTaskModal />}

      {modal.type === "EDIT_TASK" && <EditTaskModal />}

      {modal.type === "DELETE_TASK" && <DeleteTaskModal />}

      {modal.type === "ADD_BOARD" && <AddBoardModal />}

      {modal.type === "DELETE_BOARD" && <DeleteBoardModal />}

      {modal.type === "EDIT_BOARD" && <EditBoardModal />}
    </div>
  );
}

export default App;
