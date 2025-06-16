"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "react-toastify";

const Nav: React.FC = () => {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("token"); // Clear token
    toast.success("Logged out successfully");
    router.push("/"); // Redirect to login page
  };

  return (
    <header
      style={{
        backgroundColor: "lightblue",
        padding: "10px 20px",
        display: "flex",
        alignItems: "center",
        gap: "20px",
      }}
    >
      <Link href="/admin" style={{ textDecoration: "none", fontFamily: "cursive" }}>
        <h1>Admin Page</h1>
      </Link>
      <Link href="/" style={{ textDecoration: "none", fontFamily: "cursive" }}>
        <h1>Home</h1>
      </Link>
      <nav>
        <ul
          style={{
            display: "flex",
            gap: "20px",
            listStyle: "none",
            margin: 0,
            padding: 0,
            fontFamily: "cursive",
            alignItems: "center",
          }}
        >
          <li>
            <Link href="/admin/project">Project</Link>
          </li>
          <li>
            <Link href="/admin/contact">Contact</Link>
          </li>
          <li>
            <Link href="/admin/users" style={{ color: "black", textDecoration: "none" }}>
              User
            </Link>
          </li>
          <li>
            {/* Logout button */}
            <button
              onClick={handleLogout}
              style={{
                background: "transparent",
                border: "none",
                cursor: "pointer",
                color: "black",
                fontFamily: "cursive",
                textDecoration: "underline",
                padding: 0,
                fontSize: "1rem",
              }}
            >
              Logout
            </button>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Nav;
