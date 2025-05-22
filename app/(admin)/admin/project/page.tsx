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

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

const ProjectListPage = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  const loadProjects = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${apiUrl}/project-posts`);
      if (!res.ok) throw new Error(res.statusText);
      const data = await res.json();
      setProjects(data.data || []);
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
      await loadProjects();
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setDeletingId(null);
    }
  };

  if (loading) {
    return <div className="text-center p-10">Loading...</div>;
  }

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

      {projects.length === 0 ? (
        <p>No projects found.</p>
      ) : (
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
                  alt={project.title ? `Image for ${project.title}` : 'Project image'}
                  className="mt-2 w-[100px] h-[100px] rounded-full object-cover"
                  unoptimized
                  width={100}
                  height={100}
                />
                
                )}
                <div>
                  <h2 className="text-xl font-semibold">{project.title || 'Untitled Project'}</h2>
                  <p className="text-sm text-gray-600">
                    {new Date(project.created_at).toLocaleDateString()}
                  </p>
                </div>
              </article>

              <div className="flex space-x-2 flex-shrink-0">
                <Link href={`/admin/project/${project.id}`}>
                  <button
                    aria-label={`Edit project titled ${project.title}`}
                    className="bg-yellow-500 text-white px-3 py-1 rounded"
                    disabled={deletingId === project.id}
                  >
                    Edit
                  </button>
                </Link>
                <button
                  aria-label={`Delete project titled ${project.title}`}
                  onClick={() => handleDelete(project.id)}
                  className={`bg-red-600 text-white px-3 py-1 rounded ${deletingId === project.id ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                  disabled={deletingId === project.id}
                >
                  {deletingId === project.id ? 'Deleting...' : 'Delete'}
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
};

export default ProjectListPage;
