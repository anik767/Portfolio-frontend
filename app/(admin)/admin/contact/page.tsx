'use client';

import React, { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import ConfirmModal from '../../../component/ConfirmModal'; // Adjust path as needed
import { apiFetch } from '../../../utils/apiClient'; // Adjust path as needed

interface Contact {
  id: number;
  name: string;
  email: string;
  message: string;
  created_at: string;
}

const AdminContacts: React.FC = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState<number | null>(null);
  const router = useRouter();

  const fetchContacts = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await apiFetch('/admin/contacts');
      setContacts(data);
    } catch (err: any) {
      if (err.message === 'Unauthorized') {
        router.replace('/login');
        return;
      }
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [router]);

  const handleDeleteConfirmed = useCallback(async () => {
    if (confirmDeleteId === null) return;

    setDeletingId(confirmDeleteId);
    setConfirmDeleteId(null);

    try {
      await apiFetch(`/admin/contacts/${confirmDeleteId}`, {
        method: 'DELETE',
      });

      setContacts((prev) => prev.filter((contact) => contact.id !== confirmDeleteId));
    } catch (err: any) {
      if (err.message === 'Unauthorized') {
        router.replace('/login');
        return;
      }
      alert(`Error: ${err.message}`);
    } finally {
      setDeletingId(null);
    }
  }, [confirmDeleteId, router]);

  const handleDeleteClick = (id: number) => {
    setConfirmDeleteId(id);
  };

  useEffect(() => {
    fetchContacts();
  }, [fetchContacts]);

  if (loading) {
    return <p className="text-center mt-10">Loading contacts...</p>;
  }

  if (error) {
    return (
      <div className="text-center mt-10 text-red-600">
        <p>Error: {error}</p>
        <button
          onClick={fetchContacts}
          className="mt-3 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          aria-label="Retry fetching contacts"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-[90%] mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Admin - Contact Messages</h1>

      {contacts.length === 0 ? (
        <p className="text-center">No contact messages found.</p>
      ) : (
        <table className="min-w-full border border-gray-300 rounded-md overflow-hidden">
          <thead className="bg-white bg-opacity-30">
            <tr>
              <th className="py-3 px-5 border-b text-left">ID</th>
              <th className="py-3 px-5 border-b text-left">Name</th>
              <th className="py-3 px-5 border-b text-left">Email</th>
              <th className="py-3 px-5 border-b text-left max-w-xs">Message</th>
              <th className="py-3 px-5 border-b text-left">Submitted At</th>
              <th className="py-3 px-5 border-b text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {contacts.map((contact) => (
              <tr key={contact.id} className="border-b hover:bg-gray-50">
                <td className="py-2 px-5">{contact.id}</td>
                <td className="py-2 px-5">{contact.name}</td>
                <td className="py-2 px-5">{contact.email}</td>
                <td className="py-2 px-5 max-w-xs break-words">{contact.message}</td>
                <td className="py-2 px-5">{new Date(contact.created_at).toLocaleString()}</td>
                <td className="py-2 px-5">
                  <button
                    onClick={() => handleDeleteClick(contact.id)}
                    disabled={deletingId === contact.id}
                    className={`text-red-600 hover:underline ${
                      deletingId === contact.id ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                    aria-label={`Delete contact message from ${contact.name}`}
                  >
                    {deletingId === contact.id ? 'Deleting...' : 'Delete'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <ConfirmModal
        isOpen={confirmDeleteId !== null}
        message="Are you sure you want to delete this contact message?"
        onConfirm={handleDeleteConfirmed}
        onCancel={() => setConfirmDeleteId(null)}
      />
    </div>
  );
};

export default AdminContacts;
