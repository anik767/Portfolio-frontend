// app/(home)/layout.tsx
'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Footer from '@/app/component/footer/page';
import Navbar from '@/app/component/nav/page';

export default function HomeLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  useEffect(() => {
    const segments = pathname.split('/').filter(Boolean);
    const last = segments[segments.length - 1] || 'home';
    const formatted = last
      .replace(/-/g, ' ')
      .replace(/\b\w/g, (c) => c.toUpperCase());
    document.title = `${formatted}`;
  }, [pathname]);

  return (
    <div className="flex flex-col">
      <Navbar />
      <main className="flex-grow min-h-[100vh]">{children}</main>
      <Footer />
    </div>
  );
}
