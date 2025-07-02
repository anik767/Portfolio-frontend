'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { toast } from 'react-toastify';
import Adminnav from '@/app/component/adminnav';
import Admintop from '@/app/component/admintop';

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const searchParams = useSearchParams();

  useEffect(() => {
    const login = searchParams.get('login');
    const created = searchParams.get('created');
    const updated = searchParams.get('updated');

    if (login === 'success') toast.success('Login successful!');
    if (created) toast.success('Item created successfully!');
    if (updated) toast.success('Item updated successfully!');

    // Clean URL (optional)
    if (login || created || updated) {
      const url = new URL(window.location.href);
      url.searchParams.delete('login');
      url.searchParams.delete('created');
      url.searchParams.delete('updated');
      window.history.replaceState({}, '', url.toString());
    }
  }, [searchParams]);

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
          toggleSidebar={() => setSidebarOpen(prev => !prev)}
        />
        <main className="bg-gray-50 min-h-[calc(100vh-56px)] overflow-auto mt-[40px] p-[20px]">
          {children}
        </main>
      </div>
    </div>
  );
}
