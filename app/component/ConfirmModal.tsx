'use client';

import Image from 'next/image';
import React from 'react';

interface ConfirmModalProps {
  isOpen: boolean;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({ isOpen, message, onConfirm, onCancel }) => {
  if (!isOpen) return null;

  // Clicking the overlay calls onCancel
  // Clicking inside modal content stops propagation to prevent closing
  return (
    <div
      className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center"
      onClick={onCancel} // overlay click closes modal
    >
      <div
        className="bg-white p-6 rounded shadow-md w-[90%] max-w-md"
        onClick={(e) => e.stopPropagation()} // prevent overlay click when clicking inside modal
      >
        
        <p className="text-lg mb-4">{message}</p>
        <Image
          width={300}
          height={200}
          src="/Image/confurm.png"
          alt="Warning"
          className='mx-auto mb-8'
        />
        <div className="flex justify-end space-x-4">
          <button
            onClick={onCancel}
            className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
