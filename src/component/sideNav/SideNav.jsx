import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";

const SideNav = () => {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const toggleSidebar = () => {
    setOpen(!open);
  };
  return (
    <div
      className={` z-10 fixed top-0 left-0 h-screen bg-gradient-to-br from-green-600 to-green-800 text-white shadow-lg border p-4 
       md:w-[200px] transition-all duration-300 ${
         open ? "w-[160px]" : "w-[75px]"
       }`}
    >
      <button
        onClick={toggleSidebar}
        type="button"
        className="inline-flex items-center p-2 justify-center text-sm rounded-lg hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-green-400 md:hidden"
      >
        <svg
          className="w-6 h-6"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h16m-7 6h7"
          />
        </svg>
      </button>

      <div className={`${open ? "block" : "hidden"} md:block mt-4 md:mt-0`}>
        <ul className="space-y-3">
          <li
            className={`font-semibold text-sm sm:text-sm md:text-lg lg:text-lg rounded px-4 py-2 flex items-center space-x-2 cursor-pointer transition duration-200 hover:bg-green-500 hover:text-white ${
              router.pathname === "/table" ? "bg-green-500 text-white" : ""
            }`}
          >
            <Link href="/list">List</Link>
          </li>
          <li
            className={`font-semibold text-sm sm:text-sm md:text-lg lg:text-lg rounded px-4 py-2 flex items-center space-x-2 cursor-pointer transition duration-200 hover:bg-green-500 hover:text-white ${
              router.pathname === "/customer" ? "bg-green-500 text-white" : ""
            }`}
          >
            <Link href="/celender">Celender</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default SideNav;
