"use client";

import Adminnav from "../component/adminnav";
import AdminFooter from "../component/adminfooter";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect } from "react";

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  const searchParams = useSearchParams();
  const router = useRouter();

  // Get login param as a string to use in effect dependencies
  const loginStatus = searchParams.get("login");

  useEffect(() => {
    if (loginStatus === "success") {
      toast.success("Login successful!");

      // Remove the query param from URL so toast doesn't repeat on refresh
      // This won't reload page, just change URL using replace
      const url = new URL(window.location.href);
      url.searchParams.delete("login");
      router.replace(url.pathname + url.search, { scroll: false });
    }
  }, [loginStatus, router]);

  return (
    <>
      <Adminnav />
      <main>{children}</main>
      <AdminFooter />
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
};

export default AdminLayout;
