import { createContext, useContext, useEffect, useMemo, useState } from "react";
import data from "./data";
import { v4 as uuidv4 } from "uuid";
import { toast } from "react-toastify";

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

const saveActiveBoardToLocalStorage = (activeBoardId) => {
  try {
    localStorage.setItem("activeBoardId", JSON.stringify(activeBoardId));
  } catch (error) {
    console.error("Error saving active board ID to localStorage", error);
  }
};

const loadActiveBoardIdFromLocalStorage = () => {
  try {
    const storedActiveBoardId = localStorage.getItem("activeBoardId");
    return storedActiveBoardId ? JSON.parse(storedActiveBoardId) : null;
  } catch (error) {
    console.error("Error loading active board ID from localStorage", error);
    return null;
  }
};

const BoardContext = createContext();

export const useBoard = () => {
  return useContext(BoardContext);
};

export const BoardProvider = ({ children }) => {
  const [boards, setBoards] = useState(() => {
    const storedBoards = loadBoardsFromLocalStorage();
    return Array.isArray(storedBoards) && storedBoards.length > 0
      ? storedBoards
      : data;
  });

  const [activeBoard, setActiveBoard] = useState(() => {
    const storedActiveBoardId = loadActiveBoardIdFromLocalStorage();
    return (
      boards.find((board) => board.id === storedActiveBoardId) ||
      boards[0] ||
      null
    );
  });

  const handleSetActiveBoard = (boardId) => {
    const selectedBoard = boards.find((board) => board.id === boardId);
    if (selectedBoard) {
      setActiveBoard(selectedBoard);
      saveActiveBoardToLocalStorage(boardId);
    }
  };

  const [theme, setTheme] = useState(
    () => localStorage.getItem("theme") || "light",
  );

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  useEffect(() => {
    saveBoardsToLocalStorage(boards);
  }, [boards]);

  useEffect(() => {
    if (activeBoard) saveActiveBoardToLocalStorage(activeBoard.id);
  }, [activeBoard]);

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

  const addBoard = (newBoard) => {
    const newBoardWithId = { id: uuidv4(), ...newBoard };
    setBoards((prevBoards) => {
      const updatedBoards = [...prevBoards, newBoardWithId];
      return updatedBoards;
    });
    setActiveBoard(newBoardWithId);
    toast.success("Board added successfully!");
    closeModal();
  };

  const updateBoard = (updatedBoard) => {
    setBoards((prevBoards) => {
      const updatedBoards = prevBoards.map((board) =>
        board.id === updatedBoard.id ? { ...board, ...updatedBoard } : board,
      );
      return updatedBoards;
    });
    setActiveBoard(updatedBoard);
    toast.success("Board updated successfully!");
    closeModal();
  };

  const deleteBoard = (boardId) => {
    setBoards((prevBoards) => {
      const updatedBoards = prevBoards.filter((board) => board.id !== boardId);
      return updatedBoards;
    });
    setActiveBoard(boards[0]);
    toast.success("Board deleted successfully!");
    closeModal();
  };

  const addTask = (newTask) => {
    const newTaskWithId = { id: uuidv4(), ...newTask };

    setBoards((prevBoards) => {
      const updatedBoards = prevBoards.map((board) => {
        if (board.id === activeBoard.id) {
          const updatedColumns = board.columns.map((column) => {
            if (column.name === newTask.status) {
              return {
                ...column,
                tasks: [...column.tasks, newTaskWithId],
              };
            }
            return column;
          });
          return { ...board, columns: updatedColumns };
        }
        return board;
      });

      const updatedActiveBoard = updatedBoards.find(
        (board) => board.id === activeBoard.id,
      );
      if (updatedActiveBoard) {
        setActiveBoard(updatedActiveBoard);
      }

      return updatedBoards;
    });

    toast.success("Task added successfully!");
    closeModal();
  };

  const updateTask = (updatedTask) => {
    setBoards((prevBoards) => {
      const updatedBoards = prevBoards.map((board) => {
        if (board.id === activeBoard.id) {
          const updatedColumns = board.columns.map((column) => {
            const updatedTasks = column.tasks.map((task) =>
              task.id === updatedTask.id ? { ...task, ...updatedTask } : task,
            );
            return { ...column, tasks: updatedTasks };
          });
          return { ...board, columns: updatedColumns };
        }
        return board;
      });
      const refreshedActiveBoard = updatedBoards.find(
        (board) => board.id === activeBoard.id,
      );
      setActiveBoard(refreshedActiveBoard);
      return updatedBoards;
    });

    toast.success("Task updated successfully!");
  };

  const deleteTask = (taskId) => {
    setBoards((prevBoards) => {
      const updatedBoards = prevBoards.map((board) => {
        if (board.id === activeBoard.id) {
          const updatedColumns = board.columns.map((column) => ({
            ...column,
            tasks: column.tasks.filter((task) => task.id !== taskId),
          }));
          return { ...board, columns: updatedColumns };
        }
        return board;
      });
      const updatedActiveBoard = updatedBoards.find(
        (board) => board.id === activeBoard.id,
      );
      if (updatedActiveBoard) {
        setActiveBoard(updatedActiveBoard);
      }
      return updatedBoards;
    });
    toast.success("Task deleted successfully!");
    closeModal();
  };

  const value = useMemo(
    () => ({
      boards,
      activeBoard,
      setActiveBoard,
      handleSetActiveBoard,
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
      theme,
      toggleTheme,
      setBoards,
    }),
    [boards, activeBoard, modal, theme],
  );

  return (
    <BoardContext.Provider value={value}>{children}</BoardContext.Provider>
  );
};
