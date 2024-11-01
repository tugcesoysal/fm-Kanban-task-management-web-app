import { useState, useEffect } from "react";
import { IoSunny } from "react-icons/io5";
import { BsFillMoonStarsFill } from "react-icons/bs";
import { useBoard } from "../BoardContext";

const ThemeToggle = () => {
  const { theme, toggleTheme } = useBoard();

  return (
    <div className="mt-auto mx-6 py-4 bg-lightBG dark:bg-darkBG rounded-md flex gap-6 items-center justify-center ">
      <button
        className="text-mediumGrey hover:text-mainPurple"
        onClick={() => {
          if (theme !== "light") toggleTheme();
        }}
      >
        <IoSunny />
      </button>
      <button
        onClick={toggleTheme}
        className="w-10 h-5 p-[3px] bg-mainPurple rounded-xl flex items-center justify-center hover:bg-mainPurpleHover"
      >
        <div
          className={`size-3.5 bg-white rounded-full ${
            theme === "dark" ? "ml-auto" : "mr-auto"
          }`}
        ></div>
      </button>
      <button
        onClick={() => {
          if (theme !== "dark") toggleTheme();
        }}
        className="text-mediumGrey hover:text-mainPurple"
      >
        {" "}
        <BsFillMoonStarsFill />
      </button>
    </div>
  );
};

export default ThemeToggle;
