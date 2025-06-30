'use client';

import React, { useState, useRef, useCallback } from 'react';
import Image from 'next/image';
import { apiFetch } from '../../../../utils/apiClient';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';

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

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = useCallback(
    (file: File) => {
      if (!file.type.startsWith('image/')) {
        toast.error('Please upload a valid image.');
        return;
      }
      setImageFile(file);
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
      setPreviewUrl(URL.createObjectURL(file));
    },
    [previewUrl]
  );

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    const file = e.dataTransfer.files?.[0];
    if (file) handleFile(file);
  };

  const handleClick = () => {
    if (!saving) {
      fileInputRef.current?.click();
    }
  };

  const handleCancelImage = () => {
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setImageFile(null);
    setPreviewUrl(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !content || !git_url || !project_url) {
      toast.error('All fields are required!');
      return;
    }

    setSaving(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('content', content);
      formData.append('git_url', git_url);
      formData.append('project_url', project_url);
      if (imageFile) formData.append('image', imageFile);

      await apiFetch('/admin/project-posts', {
        method: 'POST',
        body: formData,
      });

      toast.success('Project created successfully!');
      router.push('/admin/project?created=1');



    } catch (err: any) {
      const message = err?.message || 'Something went wrong';
      toast.error(message);
      setError(message);
      console.error('Submit error:', err);
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      <main className="max-w-5xl mx-auto p-6 bg-white rounded-lg shadow-lg mt-10">
        <h1 className="text-3xl font-semibold mb-8 text-center">Create New Project</h1>

        {error && (
          <p
            className="mb-6 text-center text-red-600 font-semibold"
            role="alert"
            aria-live="assertive"
          >
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-8" encType="multipart/form-data" noValidate>
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
                  autoFocus
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
                  required
                  disabled={saving}
                  placeholder="https://github.com/username/repo"
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
                  required
                  disabled={saving}
                  placeholder="https://yourproject.com"
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
              onDragOver={handleDragOver}
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
            className="w-full bg-blue-600 text-white font-semibold py-3 rounded-md hover:bg-blue-700 disabled:opacity-50 transition"
          >
            {saving ? 'Creating...' : 'Create Project'}
          </button>
        </form>
      </main>


    </>
  );
};

export default NewProjectPage;
