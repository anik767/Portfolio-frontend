'use client'

import './global.css';
import dynamic from 'next/dynamic';
import 'react-toastify/dist/ReactToastify.css';
const ClientToaster = dynamic(
  () => import('react-toastify').then(mod => mod.ToastContainer),
  { ssr: false }
);

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
        <ClientToaster
           position="top-right"
           autoClose={3000}  
           hideProgressBar={false}
           newestOnTop={true}
           closeOnClick
           rtl={false}
           pauseOnFocusLoss
           draggable
           theme="light"
        />
      </body>
    </html>
  );
}
