import React from 'react';
import { Link, useLocation } from 'react-router-dom'; // Import useLocation from react-router-dom

export default function NavigationHp() {
  const location = useLocation(); // Get the current pathname

  // Function to determine if the button is active
  const isActive = (path) => location.pathname === path;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white shadow-lg z-50">
      <div className="phone:flex laptop:hidden justify-around items-center py-2">
        {/* Menu Button */}
        <Link
          className={`flex flex-col items-center `}
          to={"/admin/menu"}
        >
        <div className={`${
            isActive('/admin/menu') ? ' bg-orange-200 rounded-full p-2' : ''
          }`}>
            <svg
                className="w-6 h-6 text-orange-900"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
                ></path>
            </svg>
        </div>
          <span className="text-xs text-orange-900">Menu</span>
        </Link>

        {/* Partner Button */}
        <Link
          className={`flex flex-col items-center`}
          to={"/admin/partner"}
        >
        <div className={`${
            isActive('/admin/partner') ? ' bg-orange-200 rounded-full p-2' : ''
          }`}>
          <svg
            className="w-6 h-6 text-orange-900"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 13l4 4L19 7"
            ></path>
          </svg>
        </div>
          <span className="text-xs text-orange-900">Partner</span>
        </Link>

        {/* Article Button */}
        <Link
          className={`flex flex-col items-center `}
          to={"/admin/article"}
        >
            <div className={`${
            isActive('/admin/article') ? ' bg-orange-200 rounded-full p-2' : ''
          }`}>
            <svg
                className="w-6 h-6 text-orange-900 "
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 3v4M19 3v4M5 7h14M5 7v11a2 2 0 002 2h10a2 2 0 002-2V7"
                ></path>
            </svg>
            </div>
          <span className="text-xs text-orange-900">Article</span>
        </Link>
      </div>
    </div>
  );
}
