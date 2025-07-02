'use client';

import React, { useState } from 'react';
import Adminnav from '../component/adminnav';
import Admintop from '../component/admintop';



interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout = ({ children }: AdminLayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Log to ensure layout renders (helpful in build debugging)
  console.log('[AdminLayout] Rendered');

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Adminnav sidebarOpen={sidebarOpen} />
      <div
        className={`flex-grow transition-all duration-500 ${
          sidebarOpen ? 'ml-64' : 'ml-0'
        }`}
      >
        <Admintop
          sidebarOpen={sidebarOpen}
          toggleSidebar={() => setSidebarOpen((prev) => !prev)}
        />
        <main className="bg-gray-50 min-h-[calc(100vh-56px)] overflow-auto mt-[40px] p-[20px]">
          {children || <p className="text-gray-500">No content loaded.</p>}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
