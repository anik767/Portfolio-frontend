"use client";

import Adminnav from "../component/adminnav";
import Admintop from "../component/admintop";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const loginStatus = searchParams.get("login");

  useEffect(() => {
    if (loginStatus === "success") {
      toast.success("Login successful!");
      const url = new URL(window.location.href);
      url.searchParams.delete("login");
      router.replace(url.pathname + url.search, { scroll: false });
    }
  }, [loginStatus, router]);

  return (
    <>
      <div className="flex min-h-screen">
        {/* Sidebar */}
        <Adminnav sidebarOpen={sidebarOpen} />

        {/* Main content */}
        <div
          className={`
            flex-grow transition-all duration-500
            ${sidebarOpen ? "ml-64" : "ml-0"}
          `}
        >
          <Admintop
            sidebarOpen={sidebarOpen}
            toggleSidebar={() => setSidebarOpen((prev) => !prev)}
          />
          <main className=" bg-gray-50 min-h-[calc(100vh-56px)] overflow-auto mt-[40px] p-[20px]">
            {children}
          </main>
        </div>
      </div>

      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
};

export default AdminLayout;
