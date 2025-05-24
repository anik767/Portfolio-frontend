"use client";
// import "../global.css";
import Adminnav from "../component/adminnav";
import AdminFooter from "../component/adminfooter";
import { useEffect, useState } from "react";

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  // To handle hydration issues, ensure layout is only rendered after the client-side is loaded.
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true); // Update state after initial client-side render
  }, []);

  if (!isClient) {
    return null; // Prevent rendering before the client-side is ready
  }

  return (
    <>
      <Adminnav />
      <main className='min-h-screen'>{children}</main>
      <AdminFooter />
    </>
  );
};

export default AdminLayout;
