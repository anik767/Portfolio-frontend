"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "react-toastify";

// Helper: Read cookie by name
function getCookie(name: string): string | null {
  const match = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"));
  return match ? decodeURIComponent(match[2]) : null;
}

const Nav: React.FC = () => {
  const router = useRouter();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      // Use env variable for consistency
      const csrfRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/sanctum/csrf-cookie`, {
        credentials: "include",
      });
      if (!csrfRes.ok) throw new Error("Failed to get CSRF cookie");
  
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
      console.error("Logout error:", error);
      toast.error(error.message || "Logout failed, please try again");
    } finally {
      setIsLoggingOut(false);
    }
  };
  

  const styles = {
    header: {
      backgroundColor: "lightblue",
      padding: "10px 20px",
      display: "flex",
      alignItems: "center",
      gap: "20px",
    } as React.CSSProperties,
    link: {
      textDecoration: "none",
      fontFamily: "cursive",
    } as React.CSSProperties,
    navList: {
      display: "flex",
      gap: "20px",
      listStyle: "none",
      margin: 0,
      padding: 0,
      fontFamily: "cursive",
      alignItems: "center",
    } as React.CSSProperties,
    logoutButton: {
      background: "transparent",
      border: "none",
      cursor: isLoggingOut ? "not-allowed" : "pointer",
      color: "black",
      fontFamily: "cursive",
      textDecoration: "underline",
      padding: 0,
      fontSize: "1rem",
      opacity: isLoggingOut ? 0.6 : 1,
    } as React.CSSProperties,
  };

  return (
    <header style={styles.header}>
      <Link href="/admin" style={styles.link}>
        <h1>Admin Page</h1>
      </Link>
      <Link href="/" style={styles.link}>
        <h1>Home</h1>
      </Link>
      <nav>
        <ul style={styles.navList}>
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
            <button
              onClick={handleLogout}
              style={styles.logoutButton}
              disabled={isLoggingOut}
              aria-busy={isLoggingOut}
              aria-label="Logout"
              title={isLoggingOut ? "Logging out..." : "Logout"}
            >
              {isLoggingOut ? "Logging out..." : "Logout"}
            </button>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Nav;
