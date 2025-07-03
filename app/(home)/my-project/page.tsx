'use client';

import React, { useEffect, useState } from 'react';

interface Post {
  id: number;
  title: string;
  content: string;
  image?: string;
  image_url?: string;
  created_at: string;
  git_url: string;
  project_url: string;
}

const ProjectViewPage = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    fetch(`${API_BASE_URL}/project-posts?page=${currentPage}`)
      .then((res) => res.json())
      .then((data) => {
        setPosts(data.data || []);
        setTotalPages(data.last_page || 1);
      })
      .catch(() => { });
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
    <div className='bg-gradient-to-br from-slate-900 via-slate-800 to-slate-950 text-white pt-24 min-h-[100vh]'>
    <p className="text-pink-500 uppercase tracking-widest text-sm font-semibold flex items-center justify-center ">
          My Background
        </p>
      <div className="container mx-auto p-5 font-cursive relative ">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-6 text-center">Recent Projects</h1>

        {posts.length === 0 ? (
          <p className="text-center text-gray-600">No posts to display.</p>
        ) : (
          <>
            <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 px-2 py-4">
              {posts.map((post) => (
                <article
                  key={post.id}
                  className="group relative bg-gray-800 rounded-xl overflow-hidden shadow-md hover:shadow-pink-500/30 transition-all duration-300 cursor-pointer"
                  onClick={() => window.open(post.project_url, '_blank')}
                  tabIndex={0}
                  onKeyDown={(e) => e.key === 'Enter' && window.open(post.project_url, '_blank')}
                >
                  <div className="relative w-full h-[235px] overflow-hidden">
                    <img
                      src={post.image_url || '/fallback.jpg'}
                      alt={post.title}
                      className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>

                  <div className="p-5 bg-gray-900 text-white space-y-2">
                    <span className="uppercase text-[13px] tracking-[2px] font-medium text-pink-400">
                      Project
                    </span>
                    <h3 className="text-lg font-semibold">{post.title}</h3>
                    <p className="text-sm text-gray-300 font-light line-clamp-3 text-justify">
                      {post.content}
                    </p>

                    <span className="text-xs font-medium text-gray-400 block">
                      Published on:{' '}
                      <span className="text-pink-300 font-semibold">
                        {new Date(post.created_at).toLocaleDateString()}
                      </span>
                    </span>

                    {post.git_url && (
                      <div>
                        <a
                          href={post.git_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="text-pink-400 text-xs hover:underline break-all"
                        >
                          GitHub Link
                        </a>
                      </div>
                    )}
                  </div>
                </article>
              ))}
            </section>


            <div className="flex justify-center items-center gap-2 mt-6 flex-wrap">
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
                    className={`px-4 py-2 rounded transition-all duration-200 ${page === currentPage
                      ? 'bg-orange-500 text-white'
                      : 'bg-gray-300 hover:bg-gray-400'
                      }`}
                  >
                    {page}
                  </button>
                ) : (
                  <span key={`ellipsis-${idx}`} className="px-2 py-2 select-none text-gray-500">
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
    </div>

  );
};

export default ProjectViewPage;
