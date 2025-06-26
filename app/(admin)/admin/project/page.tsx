'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import ConfirmModal from '../../../component/ConfirmModal';
import { apiFetch } from '../../../utils/apiClient';

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

const ProjectListPage: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedDeleteId, setSelectedDeleteId] = useState<number | null>(null);

  const loadProjects = async (page = 1) => {
    setError(null);
    try {
      const data: PaginatedResponse = await apiFetch(`/project-posts?page=${page}`);
      setProjects(data.data ?? []);
      setCurrentPage(data.current_page ?? 1);
      setLastPage(data.last_page ?? 1);
    } catch (e) {
      setError((e as Error)?.message ?? 'Failed to load projects');
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
      await apiFetch(`/admin/project-posts/${selectedDeleteId}`, { method: 'DELETE' });
      await loadProjects(currentPage);
    } catch (e) {
      setError((e as Error)?.message ?? 'Failed to delete project');
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

  // Helper to generate page numbers with ellipsis
  const getPageNumbers = (): (number | string)[] => {
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
    <main className="max-w-5xl mx-auto p-5 font-cursive">
      {/* Projects Container with glassmorphism style */}
      <section className="relative p-6 mt-8 border-[2px] border-black/20 bg-white/20 backdrop-blur-[4px] rounded shadow text-black w-full mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-semibold rajdhani">Projects</h2>
          <Link href="/admin/project/new_project">
            <button
              className="bg-green-500 hover:bg-green-600 shadow-[#959da5]/30 shadow-[0px_8px_24px] rajdhani text-white px-4 py-2 rounded"
              aria-label="Create New Project"
            >
              + Create New Project
            </button>
          </Link>
        </div>

        {error && (
          <p className="mb-4 text-red-600 font-semibold" role="alert" aria-live="assertive">
            {error}
          </p>
        )}

        {projects.length === 0 ? (
          <p className="text-center text-gray-700">No projects found.</p>
        ) : (
          <>
            <ul className="space-y-3 pb-12">
              {projects.map((project) => (
                <li
                  key={project.id}
                  className="border border-white/20 p-3 rounded flex justify-between items-center shadow-[#959da5]/30 shadow-[0px_8px_24px]"
                >
                  <article className="max-w-[75%] flex items-center gap-4">
                    {project.image_url && (
                      <Image
                        src={project.image_url}
                        alt={project.title || 'Project image'}
                        className="w-[150px] h-[50px] rounded-[10px] object-cover"
                        unoptimized
                        width={150}
                        height={50}
                      />
                    )}
                    <div className="flex gap-3 items-center">
                      <h3 className="Epilogue font-[400] truncate w-[200px] overflow-hidden whitespace-nowrap">
                        {project.title || 'Untitled Project'}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {new Date(project.created_at).toLocaleDateString()}
                      </p>
                    </div>
                  </article>

                  <div className="flex space-x-2 flex-shrink-0">
                    <Link href={`/admin/project/${project.id}`}>
                      <button
                        className="rajdhani bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded shadow-[#959da5]/30 shadow-[0px_8px_24px]"
                        disabled={deletingId === project.id}
                        aria-label={`Edit project ${project.title || project.id}`}
                      >
                        Edit
                      </button>
                    </Link>
                    <button
                      onClick={() => confirmDelete(project.id)}
                      className={`rajdhani bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded shadow-[#959da5]/30 shadow-[0px_8px_24px] ${
                        deletingId === project.id ? 'opacity-50 cursor-not-allowed' : ''
                      }`}
                      disabled={deletingId === project.id}
                      aria-label={`Delete project ${project.title || project.id}`}
                    >
                      {deletingId === project.id ? 'Deleting...' : 'Delete'}
                    </button>
                  </div>
                </li>
              ))}
            </ul>

            {/* Advanced Pagination */}
            <nav
              className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex justify-center gap-2"
              role="navigation"
              aria-label="Pagination Navigation"
            >
              <button
                type="button"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage <= 1}
                aria-label="Previous page"
                className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50 cursor-pointer focus:outline-none  "
              >
                Previous
              </button>

              {getPageNumbers().map((page, idx) =>
                typeof page === 'number' ? (
                  <button
                    key={`${page}-${idx}`}
                    type="button"
                    onClick={() => handlePageChange(page)}
                    className={`px-4 py-2 rounded cursor-pointer focus:outline-none   ${
                      page === currentPage
                        ? 'bg-orange-400 text-white'
                        : 'bg-gray-300 shadow-[1.95px_1.95px_2.6px_rgba(149,157,165,0.3)]'
                    }`}
                    aria-current={page === currentPage ? 'page' : undefined}
                    aria-label={`Go to page ${page}`}
                  >
                    {page}
                  </button>
                ) : (
                  <span
                    key={`ellipsis-${idx}`}
                    className="px-3 py-2 select-none"
                    aria-hidden="true"
                  >
                    {page}
                  </span>
                )
              )}

              <button
                type="button"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage >= lastPage}
                aria-label="Next page"
                className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50 cursor-pointer focus:outline-none"
              >
                Next
              </button>
            </nav>
          </>
        )}
      </section>

      <ConfirmModal
        isOpen={showModal}
        onCancel={() => setShowModal(false)}
        onConfirm={handleDeleteConfirmed}
        message="Are you sure you want to delete this project?"
      />
    </main>
  );
};

export default ProjectListPage;
