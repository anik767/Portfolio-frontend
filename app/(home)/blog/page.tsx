'use client';

import Link from 'next/link';

const blogs = [
  {
    id: 'improve-portfolio',
    title: 'How to Improve Your Portfolio',
    description: 'Discover tips and strategies to make your portfolio stand out to clients and recruiters.',
    image: 'https://media.istockphoto.com/id/2200128716/photo/ai-powers-big-data-analysis-and-automation-workflows-showcasing-neural-networks-and-data.jpg?s=2048x2048&w=is&k=20&c=SzS-LoS8IcKCFVaeSi4VWdm6dR0uj4yz8B70lAwpeg0=',
  },
  {
    id: 'tailwind-css-game-changer',
    title: 'Why Tailwind CSS is a Game Changer',
    description: 'Explore how Tailwind CSS improves your frontend development process with utility-first design.',
    image: 'https://media.istockphoto.com/id/2200128716/photo/ai-powers-big-data-analysis-and-automation-workflows-showcasing-neural-networks-and-data.jpg?s=2048x2048&w=is&k=20&c=SzS-LoS8IcKCFVaeSi4VWdm6dR0uj4yz8B70lAwpeg0=',
  },
  {
    id: 'javascript-tips',
    title: '10 JavaScript Tips You Should Know',
    description: 'Improve your coding skills with these powerful and lesser-known JavaScript techniques.',
    image: 'https://media.istockphoto.com/id/2200128716/photo/ai-powers-big-data-analysis-and-automation-workflows-showcasing-neural-networks-and-data.jpg?s=2048x2048&w=is&k=20&c=SzS-LoS8IcKCFVaeSi4VWdm6dR0uj4yz8B70lAwpeg0=',
  },
];

export default function BlogPage() {
  return (
    <section className="px-6 md:px-20 py-16 bg-gradient-to-br from-[#222121] via-[#2b2b2b] to-[#1c1b1b] text-white pt-24 min-h-[100vh]">
      <div className="text-center mb-12">
        <p className="text-[#59C378] uppercase tracking-widest text-sm font-semibold">
          Latest Posts
        </p>
        <h2 className="text-4xl md:text-5xl font-extrabold">My Blog</h2>
        <p className="mt-4 text-white/60 max-w-2xl mx-auto">
          I write about web development, design trends, and tips to grow as a developer.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-3">
        {blogs.map((blog) => (
          <div
            key={blog.id}
            className="bg-white/5 rounded-xl overflow-hidden shadow-md hover:shadow-[#59C378]/30 transition duration-300 hover:-translate-y-1 transform border border-white/10"
          >
            <img
              src={blog.image}
              alt={blog.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-5 space-y-3">
              <h3 className="text-xl font-bold text-white">{blog.title}</h3>
              <p className="text-white/70 text-sm">{blog.description}</p>
              <Link
                href={`/blog/blog-single/${blog.id}`}
                className="inline-block text-[#59C378] font-semibold hover:underline transition"
              >
                View More →
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
