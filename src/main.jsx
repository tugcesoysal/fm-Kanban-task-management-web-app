import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BoardProvider } from "./BoardContext.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BoardProvider>
      <App />
      <ToastContainer
        position="bottom-right"
        autoClose={1000}
        hideProgressBar={true}
        closeOnClick
        rtl={false}
      />
    </BoardProvider>
  </StrictMode>,
);
