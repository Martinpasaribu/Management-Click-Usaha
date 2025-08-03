"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  Home,
  Calendar,
  Users,
  Settings,
  Warehouse,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const menuItems = [
  { name: "Dashboard", href: "#", icon: <Home size={20} /> },
  { name: "Blog", href: "/blog", icon: <Calendar size={20} /> },
  { name: "Users", href: "/users", icon: <Users size={20} /> },
  { name: "Settings", href: "/settings", icon: <Settings size={20} /> },
  {
    name: "Inventaris",
    href: "/inventaris",
    icon: <Warehouse size={20} />,
  },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(true);

  return (
    <aside
      className={`h-screen bg-white border-r shadow-sm fixed top-0 left-0 z-50 transition-all duration-500 ${
        collapsed ? "w-20" : "w-64"
      }`}
    >
      <div className="flex items-center justify-between p-4 h-10">
        <div
          className={`text-blue-600 font-bold text-lg transition-all duration-500 origin-left
            ${
              collapsed
                ? "opacity-0 translate-x-[-8px] scale-95 overflow-hidden w-full"
                : "opacity-100 w-full"
            }
        `}
        >
          <h1 className="flex">🏠 Admin</h1>
        </div>

        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-1 rounded hover:bg-gray-100"
        >
          {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        </button>
      </div>

      <nav className="mt-4 flex flex-col gap-2">
        {menuItems.map((item) => {
          const isActive = pathname.startsWith(item.href);
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-2 mx-2 rounded-lg font-medium text-sm transition-all duration-500
                ${
                  isActive
                    ? "bg-blue-100 text-blue-600"
                    : "text-gray-700 hover:bg-gray-100"
                }
              `}
            >
              {item.icon}
              {!collapsed && item.name}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
