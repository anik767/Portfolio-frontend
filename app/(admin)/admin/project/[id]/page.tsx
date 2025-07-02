'use client';

import React, { useEffect, useState, useRef, useCallback } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import { apiFetch } from '../../../../utils/apiClient';
import { toast } from 'react-toastify';
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

  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!id) return;

    apiFetch(`/admin/project-posts/${id}`)
      .then(data => {
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

  useEffect(() => {
    return () => {
      if (previewUrl?.startsWith('blob:')) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  const handleFile = useCallback((file: File) => {
    if (!file.type.startsWith('image/')) {
      toast.error('Please upload a valid image.');
      return;
    }
    setImageFile(file);
    if (previewUrl?.startsWith('blob:')) URL.revokeObjectURL(previewUrl);
    setPreviewUrl(URL.createObjectURL(file));
  }, [previewUrl]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) handleFile(file);
  };

  const handleClick = () => {
    if (!saving) fileInputRef.current?.click();
  };

  const handleCancelImage = () => {
    if (previewUrl?.startsWith('blob:')) URL.revokeObjectURL(previewUrl);
    setImageFile(null);
    setPreviewUrl(project?.image_url || null);
    if (fileInputRef.current) fileInputRef.current.value = '';
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
      formData.append('_method', 'PUT');

      await apiFetch(`/admin/project-posts/${id}`, {
        method: 'POST',
        body: formData,
      });

      toast.success('Project updated successfully!');
      router.push('/admin/project?updated=1');
    } catch (err: any) {
      toast.error(`Error saving project: ${err.message}`);
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="p-5 text-center">Loading…</div>;
  if (!project) return <div className="p-5">Project not found.</div>;

  return (
    <main className="max-w-5xl mx-auto p-6 bg-white rounded-lg shadow-lg mt-10">
      <h1 className="text-3xl font-semibold mb-8 text-center">Edit Project #{id}</h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-8"
        encType="multipart/form-data"
        noValidate
        aria-busy={saving}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="space-y-6">
            <div>
              <label htmlFor="title" className="block text-lg font-medium mb-2">
                Title
              </label>
              <input
                id="title"
                type="text"
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-blue-500 focus:outline-none"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                disabled={saving}
              />
            </div>

            <div>
              <label htmlFor="git_url" className="block text-lg font-medium mb-2">
                Git URL
              </label>
              <input
                id="git_url"
                type="url"
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-blue-500 focus:outline-none"
                value={git_url}
                onChange={(e) => setGitUrl(e.target.value)}
                disabled={saving}
              />
            </div>

            <div>
              <label htmlFor="project_url" className="block text-lg font-medium mb-2">
                Project URL
              </label>
              <input
                id="project_url"
                type="url"
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-blue-500 focus:outline-none"
                value={project_url}
                onChange={(e) => setProjectUrl(e.target.value)}
                disabled={saving}
              />
            </div>

            <div>
              <label htmlFor="content" className="block text-lg font-medium mb-2">
                Content
              </label>
              <textarea
                id="content"
                rows={5}
                className="w-full border border-gray-300 rounded-md px-4 py-2 resize-none focus:ring-blue-500 focus:outline-none"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
                disabled={saving}
              />
            </div>
          </div>

          <div
            className={`border-2 border-dashed rounded-lg p-4 text-center cursor-pointer transition-colors flex flex-col justify-center
              ${saving ? 'opacity-50 cursor-not-allowed' : 'hover:border-blue-600'}`}
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleDrop}
            onClick={handleClick}
            tabIndex={0}
            role="button"
            aria-disabled={saving}
            onKeyDown={(e) => {
              if (!saving && (e.key === 'Enter' || e.key === ' ')) {
                e.preventDefault();
                handleClick();
              }
            }}
          >
            {previewUrl ? (
              <div className="mx-auto w-full rounded-lg overflow-hidden border border-gray-300 shadow relative">
                <Image
                  src={previewUrl}
                  alt={`Preview for ${title || 'project image'}`}
                  width={400}
                  height={220}
                  className="object-cover w-full h-auto"
                  unoptimized
                />
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleCancelImage();
                  }}
                  disabled={saving}
                  className="absolute top-2 right-2 bg-red-600 text-white rounded px-3 py-1 text-sm hover:bg-red-700"
                  aria-label="Cancel image upload"
                >
                  ✕
                </button>
                <p className="mt-3 text-sm text-gray-600 select-none">
                  Click or drag & drop to change image
                </p>
              </div>
            ) : (
              <p className="text-gray-500 select-none text-lg">
                Drag & drop an image here, or click to select a file
              </p>
            )}
            <input
              ref={fileInputRef}
              id="image"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              disabled={saving}
              className="hidden"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={saving}
          className="w-full bg-green-600 text-white font-semibold py-3 rounded-md hover:bg-green-700 disabled:opacity-50 transition"
        >
          {saving ? 'Saving...' : 'Save Changes'}
        </button>
      </form>
    </main>
  );
}
