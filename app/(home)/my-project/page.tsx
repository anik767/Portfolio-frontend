'use client';

import React, { useEffect, useState } from 'react';

interface Post {
  id: number;
  title: string;
  content: string;
  image?: string;
  created_at: string;
  git_url: string;
  project_url: string;
}

const ProjectViewPage = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000';
  const STORAGE_BASE_URL = process.env.NEXT_PUBLIC_STORAGE_URL || '';

  const cleanImagePath = (path: string) => path.replace(/^\/+/, '').replace(/\/+$/, '');

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/project-posts?page=${currentPage}`)
      .then(res => res.json())
      .then(data => {
        setPosts(data.data || []);
        setTotalPages(data.last_page || 1);
      })
      .catch(() => {});
  }, [currentPage]);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages && page !== currentPage) {
      setCurrentPage(page);
    }
  };

  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisiblePages = 4;

    if (totalPages <= maxVisiblePages + 2) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else if (currentPage <= maxVisiblePages) {
      for (let i = 1; i <= maxVisiblePages + 1; i++) pages.push(i);
      pages.push('...');
      pages.push(totalPages);
    } else if (currentPage > totalPages - maxVisiblePages) {
      pages.push(1);
      pages.push('...');
      for (let i = totalPages - maxVisiblePages; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages);
    }

    return pages;
  };

  return (
    <div className="container mx-auto p-5 font-cursive relative">
      <h1 className="text-3xl font-semibold mb-6">Project Posts</h1>

      {posts.length === 0 ? (
        <p className="text-center text-gray-600">No posts to display.</p>
      ) : (
        <>
          <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 px-2 py-4">
            {posts.map(post => (
              <article
                key={post.id}
                className="group relative bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer"
                onClick={() => window.open(post.project_url, '_blank')}
                tabIndex={0}
                onKeyDown={(e) => e.key === 'Enter' && window.open(post.project_url, '_blank')}
              >
                <div className="invisible h-[235px]"></div>

                <div
                  className="absolute top-0 left-0 w-full h-[235px] bg-cover bg-center bg-no-repeat transition-all duration-300 ease-out group-hover:h-full group-hover:opacity-60 rounded-t-xl"
                  style={{
                    backgroundImage: `url('${STORAGE_BASE_URL}/${cleanImagePath(post.image || '')}')`
                  }}
                ></div>

                <div className="relative z-10 bg-white px-6 pt-4 pb-6 rounded-b-xl transition-colors duration-300 group-hover:bg-white/80">
                  <span className="uppercase text-[13px] tracking-[2px] font-medium text-gray-500">
                    Project
                  </span>
                  <h3 className="mt-1 mb-2 font-serif text-lg font-semibold truncate max-w-[200px]">
                    {post.title}
                  </h3>
                  <span className="text-xs font-medium text-gray-700">
                    Published on:{' '}
                    <span className="text-[#AD7D52] font-semibold">
                      {new Date(post.created_at).toLocaleDateString()}
                    </span>
                  </span>
                  {post.git_url && (
                    <div className="mt-3">
                      <a
                        href={post.git_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="text-blue-600 text-xs hover:underline break-words"
                      >
                        GitHub Link
                      </a>
                    </div>
                  )}
                </div>
              </article>
            ))}
          </section>

          <div className="flex justify-center gap-2 mt-6">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage <= 1}
              className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
            >
              Previous
            </button>

            {getPageNumbers().map((page, idx) =>
              typeof page === 'number' ? (
                <button
                  key={`${page}-${idx}`}
                  onClick={() => handlePageChange(page)}
                  className={`px-4 py-2 rounded transition-all duration-200 ${
                    page === currentPage
                      ? 'bg-orange-400 text-white'
                      : 'bg-gray-300 hover:bg-gray-400'
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
              disabled={currentPage >= totalPages}
              className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default ProjectViewPage;
