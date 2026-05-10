"use client";

import React from "react";

import {
  LayoutDashboard,
  Activity,
  Thermometer,
  ScanSearch,
  Bell,
} from "lucide-react";

interface SidebarProps {
  isOpen: boolean;
  activePage: string;
  setActivePage: (page: string) => void;
}

const Sidebar = ({
  isOpen,
  activePage,
  setActivePage,
}: SidebarProps) => {

  const navItems = [
    {
      name: "Dashboard",
      icon: <LayoutDashboard size={20} />,
    },
    {
      name: "Live Data",
      icon: <Activity size={20} />,
    },
    {
      name: "Sensors",
      icon: <Thermometer size={20} />,
    },
    {
      name: "AI Detection",
      icon: <ScanSearch size={20} />,
    },
    {
      name: "Alerts",
      icon: <Bell size={20} />,
    },
  ];

  return (
    <aside
      className={`
        fixed top-0 left-0 z-40
        h-screen w-64
        bg-[#022c22]
        text-white
        shadow-2xl
        transition-transform duration-300
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
      `}
    >

      {/* LOGO */}
      <div className="h-20 flex items-center px-6 border-b border-green-900">
        <h1 className="text-2xl font-bold text-green-400">
          Smart Agriculture
        </h1>
      </div>

      {/* NAVIGATION */}
      <nav className="p-4 space-y-3">

        {navItems.map((item) => (

          <button
            key={item.name}
            onClick={() => setActivePage(item.name)}
            className={`
              w-full flex items-center gap-3
              px-4 py-3 rounded-xl
              transition-all duration-200

              ${
                activePage === item.name
                  ? "bg-green-700 text-white"
                  : "hover:bg-green-800 text-gray-200"
              }
            `}
          >

            {item.icon}

            <span>{item.name}</span>

          </button>

        ))}

      </nav>

    </aside>
  );
};

export default Sidebar;
