"use client";

import Adminnav from "../component/adminnav";
import AdminFooter from "../component/adminfooter";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true); // Indicate client-side rendering started

    // Check for token in localStorage
    const token = localStorage.getItem("token");

    if (!token) {
      // Redirect to login if no token found
      router.replace("/login"); // Use your actual login route path
    }
  }, [router]);

  // Prevent rendering on server and before token check is done
  if (!isClient) {
    return null;
  }

  return (
    <>
      <Adminnav />
      <main className="min-h-screen">{children}</main>
      <AdminFooter />
    </>
  );
};

export default AdminLayout;
