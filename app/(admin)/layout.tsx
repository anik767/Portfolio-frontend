"use client";

import Adminnav from "../component/adminnav";
import AdminFooter from "../component/adminfooter";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);

    const token = localStorage.getItem("token");

    if (!token) {
      router.replace("/login");
    }
  }, [router]);

  if (!isClient) {
    return null;
  }

  return (
    <>
      <Adminnav />
      <main className="min-h-screen">{children}</main>
      <AdminFooter />
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
};

export default AdminLayout;
