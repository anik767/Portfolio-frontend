// app/components/Contact.tsx
import Link from 'next/link';
import React from 'react';

const Nav: React.FC = () => {
  return (
    <header
      style={{
        backgroundColor: 'lightblue',
        padding: '10px 20px',
        display: 'flex',
        alignItems: 'center',
        gap: '20px',
      }}
    >
      
      <nav>
        <ul
          style={{
            display: 'flex',
            gap: '20px',
            listStyle: 'none',
            margin: 0,
            padding: 0,
            fontFamily: 'cursive',
          }}
        >
          <li>
            <Link href="/" style={{ color: 'black', textDecoration: 'none' }}>
              Home
            </Link>
          </li>
          <li>
            <Link href="/about" style={{ color: 'black', textDecoration: 'none' }}>
              About
            </Link>
          </li>
          <li>
            <Link href="/project-view" style={{ color: 'black', textDecoration: 'none' }}>
              Project View
            </Link>
          </li>
          
          
        </ul>
      </nav>
    </header>
  );
};

export default Nav;
