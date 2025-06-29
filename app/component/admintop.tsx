"use client";

import React from "react";

interface AdmintopProps {
  sidebarOpen: boolean;
  toggleSidebar: () => void;
}

const admintop: React.FC<AdmintopProps> = ({ sidebarOpen, toggleSidebar }) => {
  return (
    <div className="w-full bg-gray-800 text-white fixed  px-4 h-[40px]  flex">
      <button
        onClick={toggleSidebar}
        className="text-white focus:outline-none"
      >
        {sidebarOpen ? (
          <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        )}
      </button>
      
    </div>
  );
};

export default admintop;
