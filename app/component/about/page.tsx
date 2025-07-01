// app/about/page.tsx (or pages/about.tsx)
export default function About() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-950 text-white px-6 py-12">
      <section className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl font-extrabold mb-4 font-serif">About Me</h1>
        <p className="text-lg text-slate-300 leading-relaxed">
          Im a passionate <span className="text-blue-400 font-medium">web developer</span> who loves building modern, user-friendly websites. I specialize in <span className="text-blue-400">React, Next.js, and Laravel</span>. My goal is to create efficient, clean, and visually appealing interfaces.
        </p>
      </section>

      <section className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-10 max-w-4xl mx-auto">
        {/* Profile Card */}
        <div className="bg-white/5 backdrop-blur-md border border-white/10 p-6 rounded-2xl shadow-md hover:shadow-blue-500/20 transition">
          <h2 className="text-2xl font-bold mb-4 text-blue-300">Who I Am</h2>
          <p className="text-slate-300 text-base leading-loose">
            Im a lifelong learner, coding enthusiast, and design lover. Whether its frontend or backend, I enjoy solving problems and making the web better. When Im not coding, youll find me reading tech blogs or tweaking side projects.
          </p>
        </div>

        {/* Skills or Interests */}
        <div className="bg-white/5 backdrop-blur-md border border-white/10 p-6 rounded-2xl shadow-md hover:shadow-blue-500/20 transition">
          <h2 className="text-2xl font-bold mb-4 text-blue-300">What I Use</h2>
          <ul className="list-disc list-inside text-slate-300 space-y-2">
            <li>⚛️ React & Next.js</li>
            <li>🌐 Laravel & REST APIs</li>
            <li>🎨 Tailwind CSS & UI/UX</li>
            <li>🔐 Authentication & Security</li>
            <li>🚀 Deployment: Vercel / Netlify</li>
          </ul>
        </div>
      </section>

      <footer className="mt-16 text-center text-slate-500 text-sm">
        © {new Date().getFullYear()} Your Name. All rights reserved.
      </footer>
    </main>
  );
}
