import React from 'react';

export default function Blog() {
  const blogs = [
    {
      title: 'How to Improve Your Portfolio',
      description: 'Discover tips and strategies to make your portfolio stand out to clients and recruiters.',
      image: 'https://source.unsplash.com/400x250/?portfolio,design',
    },
    {
      title: 'Why Tailwind CSS is a Game Changer',
      description: 'Explore how Tailwind CSS improves your frontend development process with utility-first design.',
      image: 'https://source.unsplash.com/400x250/?tailwind,code',
    },
    {
      title: '10 JavaScript Tips You Should Know',
      description: 'Improve your coding skills with these powerful and lesser-known JavaScript techniques.',
      image: 'https://source.unsplash.com/400x250/?javascript,programming',
    },
  ];

  return (
    <section className="px-6 md:px-20 py-16 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-950






 text-white pt-24 min-h-[100vh]">
      <div className="text-center mb-12">
        <p className="text-pink-500 uppercase tracking-widest text-sm font-semibold">
          Latest Posts
        </p>
        <h2 className="text-4xl md:text-5xl font-extrabold">My Blog</h2>
        <p className="mt-4 text-gray-400 max-w-2xl mx-auto">
          I write about web development, design trends, and tips to grow as a developer.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-3">
        {blogs.map((blog, index) => (
          <div
            key={index}
            className="bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-pink-500/30 transition duration-300 hover:-translate-y-1 transform"
          >
            <img src={blog.image} alt={blog.title} className="w-full h-48 object-cover" />
            <div className="p-5">
              <h3 className="text-xl font-bold mb-2">{blog.title}</h3>
              <p className="text-gray-400 text-sm mb-4">{blog.description}</p>
              <button className="text-pink-500 font-semibold hover:underline transition">Read More →</button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
