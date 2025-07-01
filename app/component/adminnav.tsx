"use client";

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";

interface NavProps {
  sidebarOpen: boolean;
}

interface NavLink {
  label: string;
  href?: string;
  dropdown?: { label: string; href: string }[];
}

function getCookie(name: string): string | null {
  const match = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"));
  return match ? decodeURIComponent(match[2]) : null;
}

const Adminnav: React.FC<NavProps> = ({ sidebarOpen }) => {
  const router = useRouter();
  const pathname = usePathname();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [openDropdowns, setOpenDropdowns] = useState<{ [key: string]: boolean }>({});

  const navLinks: NavLink[] = [
    { label: "Dashboard", href: "/admin" },
    { label: "Home", href: "/" },
    { label: "Project", href: "/admin/project" },
    { label: "Contact", href: "/admin/contact" },
    { label: "User", href: "/admin/users" },
    {
      label: "Settings",
      dropdown: [
        { label: "Profile", href: "/admin/settings/profile" },
        { label: "Security", href: "/admin/settings/security" },
      ],
    },
  ];

  const isActive = (href?: string) => href === pathname;

  const isDropdownActive = (dropdown?: { label: string; href: string }[]) =>
    dropdown?.some((sub) => isActive(sub.href));

  useEffect(() => {
    navLinks.forEach((item) => {
      if (item.dropdown && isDropdownActive(item.dropdown)) {
        setOpenDropdowns((prev) => ({ ...prev, [item.label]: true }));
      }
    });
  }, [pathname]);

  const toggleDropdown = (label: string) => {
    setOpenDropdowns((prev) => ({
      ...prev,
      [label]: !prev[label],
    }));
  };

  const handleLogout = async () => {
    setIsLoggingOut(true);
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;

    if (!apiUrl) {
      toast.error("API URL not configured");
      setIsLoggingOut(false);
      return;
    }

    try {
      await fetch(`${apiUrl}/sanctum/csrf-cookie`, { credentials: "include" });
      const csrfToken = getCookie("XSRF-TOKEN");
      if (!csrfToken) throw new Error("Missing CSRF token");

      const res = await fetch(`${apiUrl}/admin/logout`, {
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
        bg-gradient-to-t from-[#b92b27]/60 via-blue-700/60 to-[#1565C0]/60 text-white
        backdrop-blur-md border-r border-white/20
        transition-transform duration-500 ease-in-out shadow-xl
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
      `}
      aria-label="Sidebar Navigation"
    >
      {/* Header */}
      <div className="p-6 border-b border-white/20">
        <Link
          href="/admin"
          className="text-2xl font-extrabold tracking-wide hover:underline block select-none"
        >
          Admin Panel
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-grow overflow-y-auto px-6 py-4">
        <ul className="space-y-3 font-semibold text-sm select-none">
          {navLinks.map((item) => {
            const dropdownIsActive = isDropdownActive(item.dropdown);
            const isItemActive = isActive(item.href);

            if (item.dropdown && item.dropdown.length > 0) {
              return (
                <li key={item.label}>
                  <button
                    onClick={() => toggleDropdown(item.label)}
                    aria-expanded={!!openDropdowns[item.label]}
                    className={`relative w-full text-left py-2 px-3 rounded-lg
                      bg-white/10 backdrop-blur-md border border-white/20
                      hover:bg-white/20 transition duration-200 ease-in-out
                      ${dropdownIsActive ? "ring-1 ring-white/30" : ""}
                    `}
                    aria-controls={`${item.label}-submenu`}
                    aria-haspopup="true"
                    type="button"
                  >
                    <span className="relative z-10 text-white select-none">
                      {item.label}
                      <span className="inline-block ml-1">
                        {openDropdowns[item.label] ? "▴" : "▾"}
                      </span>
                    </span>
                  </button>
                  <ul
                    id={`${item.label}-submenu`}
                    className={`ml-4 mt-1 overflow-hidden transition-all duration-300 ease-in-out
                      ${openDropdowns[item.label] ? "max-h-48 opacity-100" : "max-h-0 opacity-0"}
                    `}
                    role="menu"
                    aria-label={`${item.label} submenu`}
                  >
                    {item.dropdown.map((sub) => {
                      const isSubActive = isActive(sub.href);
                      return (
                        <li key={sub.href}>
                          <Link
                            href={sub.href}
                            className={`block py-2 px-3 text-sm rounded
                              ${
                                isSubActive
                                  ? "bg-white/10 border border-white/20 text-white"
                                  : "hover:bg-white/10 text-gray-100"
                              }
                              transition duration-200 backdrop-blur-md`}
                            role="menuitem"
                          >
                            {sub.label}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </li>
              );
            }

            return (
              <li key={item.href}>
                <Link
                  href={item.href || "#"}
                  className={`relative block py-2 px-3 rounded-lg overflow-hidden
                    ${
                      isItemActive
                        ? "bg-white/10 backdrop-blur-md border border-white/20 ring-1 ring-white/30"
                        : "hover:bg-white/10 hover:backdrop-blur-md"
                    }
                    transition duration-200 ease-in-out`}
                  aria-current={isItemActive ? "page" : undefined}
                >
                  <span
                    className={`relative z-10
                      ${
                        isItemActive
                          ? "text-white font-semibold"
                          : "text-gray-200 group-hover:text-white"
                      }`}
                  >
                    {item.label}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Logout Button */}
      <div className="p-6 border-t border-white/20">
        <button
          onClick={handleLogout}
          disabled={isLoggingOut}
          className={`w-full py-2 px-3 rounded text-left
            bg-white/10 backdrop-blur-md border border-white/20
            hover:bg-white/20 text-white transition
            ${isLoggingOut ? "opacity-60 cursor-not-allowed" : ""}`}
          aria-disabled={isLoggingOut}
        >
          {isLoggingOut ? "Logging out..." : "Logout"}
        </button>
      </div>
    </aside>
  );
};

export default Adminnav;
