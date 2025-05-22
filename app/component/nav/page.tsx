'use client';

import Link from 'next/link';
import React, { useEffect, useState } from 'react';

const Nav: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 50) {
        setIsVisible(false); // scrolling down
      } else {
        setIsVisible(true); // scrolling up
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return (
    <header
  className={`fixed top-0 left-0 w-full h-[5vh] z-50 transition-transform duration-200 ${
    isVisible ? 'translate-y-0' : '-translate-y-full'
  }`}
>
  <nav className="bg-[#141414]/70 backdrop-blur max-w-5xl mx-auto flex justify-center">
    <ul className="flex gap-4 p-3 rounded-full">
      <li>
        <Link href="/" className="text-white">
          Home
        </Link>
      </li>
      <li>
        <Link href="/about" className="text-white">
          About
        </Link>
      </li>
      <li>
        <Link href="/project-view" className="text-white">
          Project View
        </Link>
      </li>
      <li>
        <Link href="/services" className="text-white">
          Services
        </Link>
      </li>
      <li>
        <Link href="/experiences" className="text-white">
          Experiences
        </Link>
      </li>
      <li>
        <Link href="/experiences" className="text-white">
          Study
        </Link>
      </li>
      <li>
        <Link href="/blog" className="text-white">
          Blog
        </Link>
      </li>
    </ul>
  </nav>
</header>

  );
};

export default Nav;
