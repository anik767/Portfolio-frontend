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
            <Link href="/admin" style={{ textDecoration: 'none', fontFamily: 'cursive' }}>
                <h1>Admin Page</h1>
            </Link>
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
                    <Link href="/admin/project">Project</Link>

                    </li>
                    <li>
                    <Link href="/admin/contact">contact</Link>

                    </li>
                    <li>
                        <Link href="/admin/users" style={{ color: 'black', textDecoration: 'none' }}>
                            User
                        </Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
};

export default Nav;
