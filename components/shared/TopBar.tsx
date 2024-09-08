// import { HomeIcon, SearchIcon, UserIcon } from 'lucide-react'
// import React from 'react'

// const TopBar = () => {
//   return (
// <div className="flex md:flex-col  items-center  mb-8 bg-blue-600">
//         <img
//           src="https://via.placeholder.com/50"
//           alt="User Avatar"
//           className="w-12 h-12 rounded-full mb-4"
//         />
//         <h2 className="text-lg font-semibold">Username</h2>

//         <li className="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer rounded-lg">
//           <UserIcon className="text-gray-600 text-xl mr-3" />
//           <span className="text-gray-700">Profile</span>
//         </li>
//     </div>
//   )
// }

// export default TopBar

"use client";

import { useEffect, useState } from "react";

import Link from "next/link";
export default () => {
  const [state, setState] = useState(false);
  const [drapdownState, setDrapdownState] = useState({
    isActive: false,
    idx: null,
  });



  useEffect(() => {
    document.onclick = (e) => {
      const target = e.target;
      if (!target.closest(".nav-menu"))
        setDrapdownState({ isActive: false, idx: null });
    };
  }, []);

  return (
    <>
      <div className="block lg:hidden items-center mb-8 bg-blue-600">
        <nav
          className={`relative z-20 bg-white w-full md:static md:text-sm md:border-none ${
            state ? "shadow-lg rounded-b-xl md:shadow-none" : ""
          }`}
        >
          <div className="items-center gap-x-14 px-4 max-w-screen-xl mx-auto md:flex md:px-8">
            <div className="flex items-center justify-between py-3 md:py-5 md:block">
              <a href="javascript:void(0)">
                <img src="" width={120} height={50} alt="Logo" />
              </a>
              <div className="md:hidden">
                <button
                  className="text-gray-500 hover:text-gray-800"
                  onClick={() => setState(!state)}
                >
                  {state ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        fillRule="evenodd"
                        d="M3 6.75A.75.75 0 013.75 6h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 6.75zM3 12a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 12zm8.25 5.25a.75.75 0 01.75-.75h8.25a.75.75 0 010 1.5H12a.75.75 0 01-.75-.75z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}
                </button>
              </div>
            </div>
            <div
              className={`nav-menu flex-1 pb-3 mt-8 md:block md:pb-0 md:mt-0 ${
                state ? "block" : "hidden"
              }`}
            >
              <ul className="items-center space-y-6 md:flex md:space-x-6 md:space-y-0">
                <div className="flex-1 items-center justify-end gap-x-6 space-y-3 md:flex md:space-y-0">
                  <li>
                    <Link
                      href="/profile/"
                      className="block py-3 text-center text-gray-700 hover:text-indigo-600 border rounded-lg md:border-none"
                    >
                      Profile 
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/logout"
                      className="block py-3 px-4 font-medium text-center text-white bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 active:shadow-none rounded-lg shadow md:inline"
                    >
                      Logout
                    </Link>
                  </li>
                </div>
              </ul>
            </div>
          </div>
        </nav>
        {state ? (
          <div
            className="z-10 fixed top-0 w-screen h-screen bg-black/20 backdrop-blur-sm md:hidden"
            onClick={() => setState(false)}
          ></div>
        ) : (
          ""
        )}
      </div>
    </>
  );
};
