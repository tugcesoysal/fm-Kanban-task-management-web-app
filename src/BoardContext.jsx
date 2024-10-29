import { createContext, useContext, useEffect, useMemo, useState } from "react";
import data from "./data";

const saveBoardsToLocalStorage = (boards) => {
  try {
    localStorage.setItem("boards", JSON.stringify(boards));
  } catch (error) {
    console.error("Error saving boards to localStorage", error);
  }
};

const loadBoardsFromLocalStorage = () => {
  try {
    const storedBoards = localStorage.getItem("boards");
    return storedBoards ? JSON.parse(storedBoards) : [];
  } catch (error) {
    console.error("Error loading boards from localStorage", error);
    return [];
  }
};

const BoardContext = createContext();

export const useBoard = () => {
  return useContext(BoardContext);
};

export const BoardProvider = ({ children }) => {
  const [boards, setBoards] = useState(() => {
    const storedBoards = loadBoardsFromLocalStorage();
    return storedBoards.length > 0 ? storedBoards : data;
  });
  const [activeBoard, setActiveBoard] = useState(boards[0] || []);

  useEffect(() => {
    saveBoardsToLocalStorage(boards);
  }, [boards]);

  const [modal, setModal] = useState({ type: null, data: null });

  const openModal = (type, data = null) => {
    setModal({ type, data });
  };

  const closeModal = () => {
    setModal({ type: null, data: null });
  };

  const cancel = () => {
    closeModal();
  };

  // Add a new board
  const addBoard = () => {
    console.log("board added");
    closeModal();
  };

  // Update an existing board
  const updateBoard = () => {
    console.log("board updated");
    closeModal();
  };

  const deleteBoard = () => {
    console.log("board deleted");
    closeModal();
  };

  const addTask = () => {
    console.log("task created");
    closeModal();
  };

  const updateTask = () => {
    console.log("task updated");
    closeModal();
  };

  const deleteTask = () => {
    console.log("task deleted");
    closeModal();
  };

  const value = useMemo(
    () => ({
      boards,
      activeBoard,
      setActiveBoard,
      addBoard,
      updateBoard,
      deleteBoard,
      addTask,
      updateTask,
      deleteTask,
      openModal,
      closeModal,
      modal,
      cancel,
    }),
    [boards, activeBoard, modal],
  );

  return (
    <BoardContext.Provider value={value}>{children}</BoardContext.Provider>
  );
};
