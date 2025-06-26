'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import { apiFetch } from '../../../../utils/apiClient';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface Project {
  id: number;
  title: string;
  content: string;
  git_url?: string;
  project_url?: string;
  image_url?: string;
}

export default function EditProjectPage() {
  const { id } = useParams();
  const router = useRouter();

  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [git_url, setGitUrl] = useState('');
  const [project_url, setProjectUrl] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    setLoading(true);

    apiFetch(`/admin/project-posts/${id}`)
      .then(data => {
        // Adjust if your API returns { data: {...} }
        const p: Project = data.data || data;

        setProject(p);
        setTitle(p.title);
        setContent(p.content);
        setGitUrl(p.git_url || '');
        setProjectUrl(p.project_url || '');
        setPreviewUrl(p.image_url || null);
      })
      .catch(err => {
        toast.error(`Error loading project: ${err.message}`);
      })
      .finally(() => setLoading(false));
  }, [id]);

  // Revoke previous object URL on previewUrl change or component unmount
  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setImageFile(file);

    if (file) {
      const objectUrl = URL.createObjectURL(file);
      setPreviewUrl(objectUrl);
    } else {
      setPreviewUrl(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!id) return;
  
    setSaving(true);
  
    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('content', content);
      formData.append('git_url', git_url);
      formData.append('project_url', project_url);
      if (imageFile) formData.append('image', imageFile);
      formData.append('_method', 'PUT'); // Add this for method override
  
      await apiFetch(`/admin/project-posts/${id}`, {
        method: 'POST', // Use POST, Laravel will treat as PUT because of _method
        body: formData,
      });
  
      toast.success('Project updated successfully!');
      router.push('/admin/project');
    } catch (err) {
      toast.error(`Error saving project: ${(err as Error).message}`);
    } finally {
      setSaving(false);
    }
  };
  

  if (loading) return <div className="p-5 text-center">Loading…</div>;
  if (!project) return <div className="p-5">Project not found.</div>;

  return (
    <>
      <main className="max-w-xl mx-auto p-5">
        <h1 className="text-2xl mb-6">Edit Project #{id}</h1>

        <form onSubmit={handleSubmit} className="space-y-4" encType="multipart/form-data">
          <div>
            <label htmlFor="title" className="block font-semibold mb-1">Title</label>
            <input
              id="title"
              type="text"
              className="w-full border rounded px-3 py-2"
              value={title}
              onChange={e => setTitle(e.target.value)}
              required
              disabled={saving}
            />
          </div>

          <div>
            <label htmlFor="content" className="block font-semibold mb-1">Content</label>
            <textarea
              id="content"
              rows={6}
              className="w-full border rounded px-3 py-2"
              value={content}
              onChange={e => setContent(e.target.value)}
              required
              disabled={saving}
            />
          </div>

          <div>
            <label htmlFor="git_url" className="block font-semibold mb-1">Git URL</label>
            <input
              id="git_url"
              type="url"
              className="w-full border rounded px-3 py-2"
              value={git_url}
              onChange={e => setGitUrl(e.target.value)}
              required
              disabled={saving}
            />
          </div>

          <div>
            <label htmlFor="project_url" className="block font-semibold mb-1">Project URL</label>
            <input
              id="project_url"
              type="url"
              className="w-full border rounded px-3 py-2"
              value={project_url}
              onChange={e => setProjectUrl(e.target.value)}
              required
              disabled={saving}
            />
          </div>

          <div>
            <label htmlFor="image" className="block font-semibold mb-1">Change Image</label>
            <input
              id="image"
              type="file"
              accept="image/*"
              className="w-full"
              onChange={handleImageChange}
              disabled={saving}
            />
            {previewUrl && (
              <Image
                src={previewUrl}
                alt={`Preview for ${title || 'project image'}`}
                width={500}
                height={100}
                className="mt-2 w-[50%] rounded"
                unoptimized
              />
            )}
          </div>

          <button
            type="submit"
            disabled={saving}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 disabled:opacity-50"
          >
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
        </form>
      </main>
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
}
