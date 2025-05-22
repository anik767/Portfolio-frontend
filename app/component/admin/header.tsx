// app/components/Contact.tsx
import React from 'react';

const Adminnav: React.FC = () => {
    return (<>
        <header style={{
            backgroundColor: 'lightblue',
            padding: '10px 20px',
            display: 'flex',
            alignItems: 'center',
            gap: '20px'
        }}>
            <h1>Website</h1>
            <nav>
                <ul style={{
                    display: 'flex',
                    gap: '20px',
                    listStyle: 'none',
                    margin: 0,
                    padding: 0
                }}>
                    <li><a href="/admin/dashboard" style={{ color: 'black', textDecoration: 'none' }}>post</a></li>
                    <li><a href="/admin/post" style={{ color: 'black', textDecoration: 'none' }}>About</a></li>
                    <li><a href="/admin/setting" style={{ color: 'black', textDecoration: 'none' }}>Contact</a></li>
                </ul>
            </nav>
        </header>
    </>
    );
};

export default Adminnav;


