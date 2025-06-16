'use client';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

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
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  

  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000';
  const STORAGE_BASE_URL = process.env.NEXT_PUBLIC_STORAGE_URL ;

  const cleanImagePath = (path: string) => path.replace(/^\/+/, '').replace(/\/+$/, '');

  useEffect(() => {
    setLoading(true);
    fetch(`${API_BASE_URL}/api/project-posts?page=${currentPage}`)
      .then(res => res.json())
      .then(data => {
        setPosts(data.data || []);
        setTotalPages(data.last_page || 1);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [currentPage, API_BASE_URL]);

  const goToPreviousPage = () => setCurrentPage(page => Math.max(page - 1, 1));
  const goToNextPage = () => setCurrentPage(page => Math.min(page + 1, totalPages));

  if (loading) {
    // এখানে Skeleton ব্যবহার করছি
    return (
      <div className="container mx-auto p-5 font-cursive">
        <h1 className="text-3xl font-semibold mb-6"><Skeleton width={200} /></h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="border border-gray-300 rounded-lg p-4 shadow-sm bg-white">
              <Skeleton height={200} className="mb-4" />
              <Skeleton width={`80%`} height={24} className="mb-3" />
              <Skeleton count={3} />
              <Skeleton width={`60%`} height={20} className="mt-3" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-5 font-cursive">
      <h1 className="text-3xl font-semibold mb-6">Project Posts</h1>

      {posts.length === 0 ? (
        <p className="text-center text-gray-600">No posts to display.</p>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
            {posts.slice(0, 9).map(post => (
              <div
                key={post.id}
                onClick={() => window.open(post.project_url, '_blank')}
                className="border border-gray-300 rounded-lg p-2 shadow-sm bg-white flex flex-col hover:shadow-md transition cursor-pointer"
                tabIndex={0}
                role="link"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') window.open(post.project_url, '_blank');
                }}
              >
                {post.image && (
                  <Image
                    src={`${STORAGE_BASE_URL}/${cleanImagePath(post.image)}`}
                    alt={post.title}
                    width={300}
                    height={200}
                    className="w-full object-cover rounded-md mb-4"
                    unoptimized
                  />
                )}
                <h2 className="text-xl font-semibold mb-3">{post.title}</h2>
                <p className="text-gray-700 mb-3 flex-grow">{post.content}</p>

                <a
                  href={post.git_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline mb-3 break-all"
                  onClick={(e) => e.stopPropagation()}
                >
                  {post.git_url}
                </a>

                <small className="text-gray-500">
                  Published on: {new Date(post.created_at).toLocaleDateString()}
                </small>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-center items-center gap-4 mt-8">
            <button
              onClick={goToPreviousPage}
              disabled={currentPage === 1}
              className={`px-4 py-2 rounded-md border border-gray-400 
            ${currentPage === 1 ? 'cursor-not-allowed text-gray-400 bg-gray-100' : 'cursor-pointer text-blue-600 hover:bg-blue-100'}`}
            >
              Previous
            </button>
            <span className="text-gray-700 font-medium">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={goToNextPage}
              disabled={currentPage === totalPages}
              className={`px-4 py-2 rounded-md border border-gray-400 
            ${currentPage === totalPages ? 'cursor-not-allowed text-gray-400 bg-gray-100' : 'cursor-pointer text-blue-600 hover:bg-blue-100'}`}
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
