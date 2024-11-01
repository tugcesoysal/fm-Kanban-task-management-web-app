import { useEffect, useState } from "react";
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
import MobileBoardsModal from "./components/MobileBoardsModal";
import Overlay from "./components/Overlay";

function App() {
  const { activeBoard, openModal, modal, closeModal } = useBoard();

  const [isMobile, setIsMobile] = useState(window.innerWidth < 640);

  const [isBoardsListOpen, setIsBoardsListOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 640);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleOverlayClick = () => {
    closeModal();
    setIsBoardsListOpen(false);
  };

  return (
    <div className="relative h-full font-jakarta bg-lightBG dark:bg-darkBG flex flex-row">
      {!isMobile && <SideBar />}
      <div className="w-full max-w-full overflow-x-hidden flex flex-col mb-12">
        <Navbar
          isMobile={isMobile}
          isBoardsListOpen={isBoardsListOpen}
          setIsBoardsListOpen={setIsBoardsListOpen}
        />
        {isBoardsListOpen && (
          <div>
            {" "}
            <MobileBoardsModal />
            <Overlay isVisible={true} onClick={handleOverlayClick} />
          </div>
        )}

        <div className="flex-1 overflow-x-auto scrollbar-hide flex items-center justify-center">
          {activeBoard ? (
            <Board />
          ) : (
            <div className="flex flex-col sm:gap-6 lg:gap-8 items-center justify-center ">
              <p className="headingL text-mediumGrey text-center">
                This board is empty. Create a new column to get started.
              </p>
              <button
                onClick={() => openModal("ADD_COLUMN")}
                className="bg-mainPurple rounded-3xl headingM h-12 sm:px-4 lg:px-6 text-white hover:bg-mainPurpleHover"
              >
                + Add New Column
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Overlay for disabling clicks */}
      {modal.type && <Overlay isVisible={true} onClick={handleOverlayClick} />}

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
