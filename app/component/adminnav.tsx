"use client";

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import React, { useState } from "react";
import { toast } from "react-toastify";

interface NavProps {
  sidebarOpen: boolean;
}

function getCookie(name: string): string | null {
  const match = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"));
  return match ? decodeURIComponent(match[2]) : null;
}

const Adminnav: React.FC<NavProps> = ({ sidebarOpen }) => {
  const router = useRouter();
  const pathname = usePathname();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(false);

  const navLinks = [
    { label: "Dashboard", href: "/admin" },
    { label: "Home", href: "/" },
    { label: "Project", href: "/admin/project" },
    { label: "Contact", href: "/admin/contact" },
    { label: "User", href: "/admin/users" },
  ];

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/sanctum/csrf-cookie`, {
        credentials: "include",
      });
      const csrfToken = getCookie("XSRF-TOKEN");
      if (!csrfToken) throw new Error("Missing CSRF token");

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/logout`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "X-XSRF-TOKEN": csrfToken,
        },
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.message || "Logout failed");
      }

      toast.success("Logged out successfully");
      router.push("/");
    } catch (error: any) {
      toast.error(error.message || "Logout failed");
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <aside
      className={`fixed top-0 left-0 h-full z-40 w-64
        bg-gradient-to-t from-[#b92b27]/40 via-blue-600/40 to-[#1565C0]/40 text-white
        transition-transform duration-500 ease-in-out shadow-xl
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
      `}
    >
      {/* Header */}
      <div className="p-6 border-b border-blue-400">
        <Link href="/admin" className="text-2xl font-bold tracking-wide hover:underline block">
          Admin Panel
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-grow overflow-y-auto px-6 py-4">
        <ul className="space-y-3 font-medium">
          {navLinks.map((item) => {
            const isActive = pathname === item.href;
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="relative group block py-2 px-3 overflow-hidden rounded-lg"
                >
                  <span
                    className={`absolute left-0 top-0 h-full w-[80%] group-hover:w-full transition-all duration-300 ease-in-out z-0 rounded-md
                      ${isActive ? "bg-blue-500 w-full" : "bg-blue-400"}
                    `}
                  />
                  <span
                    className={`relative z-10 transition-colors duration-200 ${
                      isActive ? "text-white" : "text-black group-hover:text-white"
                    }`}
                  >
                    {item.label}
                  </span>
                </Link>
              </li>
            );
          })}

          {/* Smooth Dropdown */}
          <li>
            <button
              onClick={() => setOpenDropdown(!openDropdown)}
              className="relative group w-full text-left py-2 px-3 overflow-hidden rounded-lg bg-blue-500 hover:bg-blue-600 transition"
            >
              <span className="relative z-10 text-white">Settings ▾</span>
            </button>
            <ul
              className={`ml-4 mt-1 overflow-hidden transition-all duration-300 ease-in-out ${
                openDropdown ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
              }`}
            >
              <li>
                <Link
                  href="/admin/settings/profile"
                  className="block py-1 px-3 text-sm rounded hover:bg-blue-300 text-black"
                >
                  Profile
                </Link>
              </li>
              <li>
                <Link
                  href="/admin/settings/security"
                  className="block py-1 px-3 text-sm rounded hover:bg-blue-300 text-black"
                >
                  Security
                </Link>
              </li>
            </ul>
          </li>
        </ul>
      </nav>

      {/* Logout Button */}
      <div className="p-6 border-t border-blue-400">
        <button
          onClick={handleLogout}
          disabled={isLoggingOut}
          className={`w-full py-2 px-3 rounded text-left bg-blue-600 hover:bg-blue-500 transition
            ${isLoggingOut ? "opacity-60 cursor-not-allowed" : ""}
          `}
        >
          {isLoggingOut ? "Logging out..." : "Logout"}
        </button>
      </div>
    </aside>
  );
};

export default Adminnav;
