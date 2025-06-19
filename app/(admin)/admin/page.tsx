'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { apiFetch } from '../../utils/apiClient';
import ConfirmModal from '../../component/ConfirmModal';

interface Project {
  id: number;
  title: string;
  content: string;
  image_url?: string;
  created_at: string;
}

interface PaginatedResponse {
  current_page: number;
  data: Project[];
  last_page: number;
  next_page_url: string | null;
  prev_page_url: string | null;
}

export default function Admin() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [lastPage, setLastPage] = useState<number>(1);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedDeleteId, setSelectedDeleteId] = useState<number | null>(null);

  const loadProjects = async (page: number = 1) => {
    setLoading(true);
    setError(null);
    try {
      const res = await apiFetch(`/project-posts?page=${page}`);
      if (!res.ok) throw new Error(await res.text());
      const data: PaginatedResponse = await res.json();
      setProjects(data.data || []);
      setCurrentPage(data.current_page);
      setLastPage(data.last_page);
    } catch (e) {
      setError((e as Error).message || 'Failed to load projects');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProjects();
  }, []);

  const confirmDelete = (id: number) => {
    setSelectedDeleteId(id);
    setShowModal(true);
  };

  const handleDeleteConfirmed = async () => {
    if (!selectedDeleteId) return;

    setDeletingId(selectedDeleteId);
    setShowModal(false);

    try {
      const res = await apiFetch(`/project-posts/${selectedDeleteId}`, {
        method: 'DELETE',
      });
      if (!res.ok) throw new Error(await res.text());
      await loadProjects(currentPage);
    } catch (e) {
      setError((e as Error).message || 'Failed to delete project');
    } finally {
      setDeletingId(null);
      setSelectedDeleteId(null);
    }
  };

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= lastPage && page !== currentPage) {
      loadProjects(page);
    }
  };

  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisiblePages = 4;
  
    if (lastPage <= maxVisiblePages + 2) {
      for (let i = 1; i <= lastPage; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= maxVisiblePages) {
        for (let i = 1; i <= maxVisiblePages + 1; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(lastPage);
      } else if (currentPage > lastPage - maxVisiblePages) {
        pages.push(1);
        pages.push('...');
        for (let i = lastPage - maxVisiblePages; i <= lastPage; i++) {
          pages.push(i);
        }
      } else {
        pages.push(1);
        pages.push('...');
        pages.push(currentPage - 1);
        pages.push(currentPage);
        pages.push(currentPage + 1);
        pages.push('...');
        pages.push(lastPage);
      }
    }
  
    return pages;
  };
  


  return (
    <>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(to right, #6a11cb, #2575fc)',
          color: 'white',
          textAlign: 'center',
          fontFamily: "'Arial', sans-serif",
          minHeight: '',
          padding: '2rem',
        }}
      >
        
        <h1 style={{ fontSize: '3rem', marginBottom: '10px', fontFamily: 'cursive' }}>
          Welcome to My Admin
        </h1>
        <p style={{ fontSize: '1.2rem', maxWidth: '600px', fontFamily: 'cursive' }}>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quis eos possimus non! Eveniet
          sequi deleniti facilis minus repudiandae odio quasi. Earum vero eveniet fugiat magni numquam
          aperiam, excepturi cumque officia.
        </p>
      </div>


      <div className="relative p-5 bg-white/30 backdrop-blur-[4px] rounded shadow text-black mt-8 w-full max-w-[40%] min-h-[650px]">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-[500] rajdhani">Projects</h1>
          <Link href="/admin/project/new_project">
            <button className="bg-green-500 hover:bg-green-600 shadow-[#959da5]/30 shadow-[0px_8px_24px] hover:shadow-none rajdhani  text-white px-4 py-2 rounded">
              Create New Project
            </button>
          </Link>
        </div>

        {error && <p className="mb-4 text-red-600 font-semibold">{error}</p>}

         
        <>
          <ul className="space-y-2">
            {projects.map((project) => (
              <li
                key={project.id}
                className="border border-white/20 p-2 rounded  flex justify-between items-center shadow-[#959da5]/30 shadow-[0px_8px_24px]"

              >
                <article className="max-w-[75%] flex items-center gap-4">
                  {project.image_url && (
                    <Image
                      src={project.image_url}
                      alt={project.title}
                      className=" w-[150px] h-[50px] rounded-[10px] object-cover"
                      unoptimized
                      width={150}
                      height={50}
                    />
                  )}
                  <div className="flex gap-3 items-center">
                    <h2 className="Epilogue font-[400] truncate w-[200px] overflow-hidden whitespace-nowrap ">
                      {project.title}
                    </h2>
                    <p className="text-sm text-gray-600">
                      {new Date(project.created_at).toLocaleDateString()}
                    </p>
                  </div>
                </article>

                <div className="flex space-x-2 flex-shrink-0">
                  <Link href={`/admin/project/${project.id}`}>
                    <button
                      className="rajdhani bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded shadow-[#959da5]/30 shadow-[0px_8px_24px] hover:shadow-none"
                      disabled={deletingId === project.id}
                    >
                      Edit
                    </button>
                  </Link>
                  <button
                    onClick={() => confirmDelete(project.id)}
                    className={`rajdhani bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded shadow-[#959da5]/30 shadow-[0px_8px_24px] hover:shadow-none ${deletingId === project.id ? 'opacity-50 cursor-not-allowed' : ''
                      }`}
                    disabled={deletingId === project.id}
                  >
                    {deletingId === project.id ? 'Deleting...' : 'Delete'}
                  </button>
                </div>
              </li>
            ))}
          </ul>

          {/* Pagination Controls */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex justify-center gap-2 ">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage <= 1}
              className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50 cursor-pointer"
            >
              Previous
            </button>

            {getPageNumbers().map((page, idx) =>
              typeof page === 'number' ? (
                <button
                  key={`${page}-${idx}`}
                  onClick={() => handlePageChange(page)}
                  className={`px-4 py-2 rounded cursor-pointer
                    ${page === currentPage
                      ? 'bg-orange-400 text-white '
                      : 'bg-gray-300 shadow-[1.95px_1.95px_2.6px_rgba(149,157,165,0.3)]'
                    }`}
                >
                  {page}
                </button>
              ) : (
                <span key={`ellipsis-${idx}`} className="px-2 py-2 select-none">
                  {page}
                </span>
              )
            )}

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage >= lastPage}
              className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50 cursor-pointer"
            >
              Next
            </button>
          </div>
        </>
        

        {/* Confirm Modal */}

      </div>
      <ConfirmModal
        isOpen={showModal}
        onCancel={() => setShowModal(false)}
        onConfirm={handleDeleteConfirmed}
        message="Are you sure you want to delete this project?"
      />
    </>
  );
}
