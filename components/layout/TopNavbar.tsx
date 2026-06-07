"use client";

import React from "react";
import { Menu, Wifi } from "lucide-react";

interface TopNavbarProps {
  toggleSidebar: () => void;
}

const TopNavbar = ({ toggleSidebar }: TopNavbarProps) => {
  return (
    <header className="h-20 bg-white border-b border-gray-100 flex items-center justify-between px-8 sticky top-0 z-30">

      {/* LEFT */}
      <button
        onClick={toggleSidebar}
        className="p-2 hover:bg-gray-100 rounded-lg transition"
      >
        <Menu className="w-7 h-7 text-gray-700" />
      </button>

      {/* RIGHT */}
      <div className="flex items-center gap-5">

        <div className="text-sm font-medium text-gray-600">
          {new Date().toLocaleString()}
        </div>

        <div className="flex items-center justify-center p-2 rounded-full bg-green-50 text-green-600">
         <h1 className="text-2xl font-bold text-green-600 absolute left-1/2 -translate-x-1/2">
  Advance Vertical Farming using AI and IOT
</h1>
 <Wifi className="w-5 h-5" />
        </div>

      </div>

    </header>
  );
};

export default TopNavbar;