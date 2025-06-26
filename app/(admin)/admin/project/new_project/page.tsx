'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { apiFetch } from '../../../../utils/apiClient';

const NewProjectPage = () => {
  const router = useRouter();

  const [title, setTitle] = useState('');
  const [project_url, setProjectUrl] = useState('');
  const [content, setContent] = useState('');
  const [git_url, setGitUrl] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setImageFile(file);
    if (file) {
      setPreviewUrl(URL.createObjectURL(file));
    } else {
      setPreviewUrl(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('content', content);
      formData.append('git_url', git_url);
      formData.append('project_url', project_url);
      if (imageFile) {
        formData.append('image', imageFile);
      }

      const res = await apiFetch('/admin/project-posts', {
        method: 'POST',
        body: formData,
      });

      router.push('/admin/project');
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <main className="max-w-xl mx-auto p-5">
      <h1 className="text-2xl mb-6">Create New Project</h1>

      {error && <p className="mb-4 text-red-600">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4" encType="multipart/form-data">
        <div>
          <label htmlFor="title" className="block font-semibold mb-1">Title</label>
          <input
            id="title"
            type="text"
            className="w-full border rounded px-3 py-2"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            disabled={saving}
            autoFocus
          />
        </div>

        <div>
          <label htmlFor="content" className="block font-semibold mb-1">Content</label>
          <textarea
            id="content"
            rows={6}
            className="w-full border rounded px-3 py-2"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            disabled={saving}
          />
        </div>

        <div>
          <label htmlFor="git_url" className="block font-semibold mb-1">Git URL</label>
          <input
            id="git_url"
            type="text"
            className="w-full border rounded px-3 py-2"
            value={git_url}
            onChange={(e) => setGitUrl(e.target.value)}
            required
            disabled={saving}
          />
        </div>

        <div>
          <label htmlFor="project_url" className="block font-semibold mb-1">Project URL</label>
          <input
            id="project_url"
            type="text"
            className="w-full border rounded px-3 py-2"
            value={project_url}
            onChange={(e) => setProjectUrl(e.target.value)}
            required
            disabled={saving}
          />
        </div>

        <div>
          <label htmlFor="image" className="block font-semibold mb-1">Image File</label>
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
              height={100}
              width={500}
              className="mt-2 w-[50%] rounded"
            />
          )}
        </div>

        <button
          type="submit"
          disabled={saving}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {saving ? 'Creating...' : 'Create Project'}
        </button>
      </form>
    </main>
  );
};

export default NewProjectPage;
