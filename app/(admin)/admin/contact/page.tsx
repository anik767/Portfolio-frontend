'use client';

import React, { useEffect, useState } from 'react';
import { apiFetch } from '../../../utils/apiClient';

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

  async function fetchContacts() {
    setLoading(true);
    setError(null);

    try {
      const res = await apiFetch('/admin/contacts');

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(errorText || 'Failed to fetch contacts');
      }

      const data: Contact[] = await res.json();
      setContacts(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchContacts();
  }, []);

  async function handleDelete(id: number) {
    if (!confirm('Are you sure you want to delete this contact message?')) return;

    setDeletingId(id);
    try {
      const res = await apiFetch(`/admin/contacts/${id}`, {
        method: 'DELETE',
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Failed to delete contact');
      }

      setContacts((prev) => prev.filter((contact) => contact.id !== id));
    } catch (err: any) {
      alert(`Error: ${err.message}`);
    } finally {
      setDeletingId(null);
    }
  }

  if (loading) return <p className="text-center mt-10">Loading contacts...</p>;
  if (error) return <p className="text-center mt-10 text-red-600">Error: {error}</p>;

  return (
    <div className="max-w-[90%] mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Admin - Contact Messages</h1>

      {contacts.length === 0 ? (
        <p className="text-center">No contact messages found.</p>
      ) : (
        <table className="min-w-full border border-gray-300 rounded-md overflow-hidden">
          <thead className="bg-white bg-opacity-30">
            <tr>
              <th className="py-3 px-5 border-b">ID</th>
              <th className="py-3 px-5 border-b">Name</th>
              <th className="py-3 px-5 border-b">Email</th>
              <th className="py-3 px-5 border-b">Message</th>
              <th className="py-3 px-5 border-b">Submitted At</th>
              <th className="py-3 px-5 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {contacts.map((contact) => (
              <tr key={contact.id} className="border-b hover:bg-gray-50">
                <td className="py-2 px-5">{contact.id}</td>
                <td className="py-2 px-5">{contact.name}</td>
                <td className="py-2 px-5">{contact.email}</td>
                <td className="py-2 px-5 max-w-xs ">{contact.message}</td>
                <td className="py-2 px-5">{new Date(contact.created_at).toLocaleString()}</td>
                <td className="py-2 px-5">
                  <button
                    onClick={() => handleDelete(contact.id)}
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
    </div>
  );
};

export default AdminContacts;
