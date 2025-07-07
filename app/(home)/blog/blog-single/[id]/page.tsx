// app/blog/blog-single/[id]/page.tsx

interface BlogPost {
  title: string;
  content: string;
  image: string;
  publishedAt: string;
}

const blogPosts: Record<string, BlogPost> = {
  'improve-portfolio': {
    title: 'How to Improve Your Portfolio',
    content: `Building a strong portfolio...`,
    image: 'https://media.istockphoto.com/id/2200128716/photo/ai-powers-big-data-analysis-and-automation-workflows-showcasing-neural-networks-and-data.jpg?s=2048x2048&w=is&k=20&c=SzS-LoS8IcKCFVaeSi4VWdm6dR0uj4yz8B70lAwpeg0=',
    publishedAt: '2023-10-01',
  },
  'tailwind-css-game-changer': {
    title: 'Why Tailwind CSS is a Game Changer',
    content: `Tailwind CSS is a utility-first CSS framework...`,
    image: 'https://media.istockphoto.com/id/2200128716/photo/ai-powers-big-data-analysis-and-automation-workflows-showcasing-neural-networks-and-data.jpg?s=2048x2048&w=is&k=20&c=SzS-LoS8IcKCFVaeSi4VWdm6dR0uj4yz8B70lAwpeg0=',
    publishedAt: '2023-08-20',
  },
  'javascript-tips': {
    title: '10 JavaScript Tips You Should Know',
    content: `Here are ten tips...`,
    image: 'https://media.istockphoto.com/id/2200128716/photo/ai-powers-big-data-analysis-and-automation-workflows-showcasing-neural-networks-and-data.jpg?s=2048x2048&w=is&k=20&c=SzS-LoS8IcKCFVaeSi4VWdm6dR0uj4yz8B70lAwpeg0=',
    publishedAt: '2023-09-15',
  },
};

interface PageProps {
  params: { id: string };
}

export default function SingleBlogPage({ params }: PageProps) {
  const { id } = params;
  const blog = blogPosts[id];

  if (!blog) {
    return (
      <div className="text-center text-white pt-24 min-h-[100vh] bg-gradient-to-br from-[#222121] via-[#2b2b2b] to-[#1c1b1b]">
        <h1 className="text-4xl font-bold mt-20">Blog Post Not Found</h1>
      </div>
    );
  }

  return (
    <section className="px-6 md:px-20 py-16 bg-gradient-to-br from-[#222121] via-[#2b2b2b] to-[#1c1b1b] text-white pt-24 min-h-[100vh]">
      <div className=" mx-auto  ">
        <img src={blog.image} alt={blog.title} className="w-full h-64 object-cover" />
        <div className="p-8 space-y-6">
          <h1 className="text-4xl font-extrabold text-[#59C378]">{blog.title}</h1>
          <p className="text-sm text-white/60">
            Published on: <span className="font-semibold text-[#59C378]">{new Date(blog.publishedAt).toLocaleDateString()}</span>
          </p>
          <article className="prose prose-invert max-w-none text-justify text-white/80 whitespace-pre-line">
            {blog.content}
          </article>
        </div>
      </div>
    </section>
  );
}
