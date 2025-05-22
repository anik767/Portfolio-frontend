'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

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

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

const ProjectListPage = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [lastPage, setLastPage] = useState<number>(1);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  const loadProjects = async (page: number = 1) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${apiUrl}/project-posts?page=${page}`);
      if (!res.ok) throw new Error(res.statusText);
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

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this project?')) return;
    setDeletingId(id);
    setError(null);
    try {
      const res = await fetch(`${apiUrl}/project-posts/${id}`, {
        method: 'DELETE',
      });
      if (!res.ok) throw new Error('Failed to delete project');
      await loadProjects(currentPage);
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setDeletingId(null);
    }
  };

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= lastPage) {
      loadProjects(page);
    }
  };

  return (
    <main className="max-w-5xl mx-auto p-5 font-cursive">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-semibold">All Projects</h1>
        <Link href="/admin/project/new_project" passHref>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded">
            + Create New Project
          </button>
        </Link>
      </div>

      {error && <p className="mb-4 text-red-600 font-semibold">{error}</p>}

      {loading ? (
        <div className="text-center p-10">Loading...</div>
      ) : projects.length === 0 ? (
        <p>No projects found.</p>
      ) : (
        <>
          <ul className="space-y-4">
            {projects.map(project => (
              <li
                key={project.id}
                className="border p-4 rounded shadow-md flex justify-between items-center"
              >
                <article className="max-w-[75%] flex items-center gap-4">
                  {project.image_url && (
                    <Image
                      src={project.image_url}
                      alt={project.title || 'Project image'}
                      className="mt-2 w-[100px] h-[100px] rounded-full object-cover"
                      unoptimized
                      width={100}
                      height={100}
                    />
                  )}
                  <div>
                    <h2 className="text-xl font-semibold">
                      {project.title || 'Untitled Project'}
                    </h2>
                    <p className="text-sm text-gray-600">
                      {new Date(project.created_at).toLocaleDateString()}
                    </p>
                  </div>
                </article>

                <div className="flex space-x-2 flex-shrink-0">
                  <Link href={`/admin/project/${project.id}`}>
                    <button
                      className="bg-yellow-500 text-white px-3 py-1 rounded"
                      disabled={deletingId === project.id}
                    >
                      Edit
                    </button>
                  </Link>
                  <button
                    onClick={() => handleDelete(project.id)}
                    className={`bg-red-600 text-white px-3 py-1 rounded ${deletingId === project.id ? 'opacity-50 cursor-not-allowed' : ''}`}
                    disabled={deletingId === project.id}
                  >
                    {deletingId === project.id ? 'Deleting...' : 'Delete'}
                  </button>
                </div>
              </li>
            ))}
          </ul>

          {/* Pagination Controls */}
          <div className="flex justify-center mt-8 gap-4">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage <= 1}
              className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
            >
              Previous
            </button>
            <span className="px-4 py-2">
              Page {currentPage} of {lastPage}
            </span>
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage >= lastPage}
              className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </>
      )}
    </main>
  );
};

export default ProjectListPage;
