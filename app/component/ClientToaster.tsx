// app/component/ClientToaster.tsx
'use client';

import React, { useEffect, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ClientToaster = () => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <ToastContainer
      position="top-right"
      autoClose={3000}
      pauseOnHover
      pauseOnFocusLoss
      closeOnClick
      draggable
      newestOnTop={false}
      theme="light"
    />
  );
};

export default ClientToaster;
