import React from 'react';

export default function Experiences() {
  const experiences = [
    {
      role: 'Senior Frontend Developer',
      company: 'TechNova Inc.',
      duration: 'Jan 2022 – Present',
      description:
        'Leading frontend development using React and Tailwind. Improved performance and UX across multiple projects.',
    },
    {
      role: 'Frontend Developer',
      company: 'CodeCraft Solutions',
      duration: 'Jul 2019 – Dec 2021',
      description:
        'Worked on various client projects creating modern, responsive web interfaces using Vue.js and Bootstrap.',
    },
    {
      role: 'Junior Developer',
      company: 'DevStart Studio',
      duration: 'May 2017 – Jun 2019',
      description:
        'Assisted in web development and UI/UX tasks. Learned agile practices and collaborated in cross-functional teams.',
    },
  ];

  return (
    <section className="px-6 md:px-20 py-16 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-950 text-white pt-24 min-h-[100vh]">
      <div className="text-center mb-12">
        <p className="text-pink-500 uppercase tracking-widest text-sm font-semibold">
          My Journey
        </p>
        <h2 className="text-4xl md:text-5xl font-extrabold">Work Experiences</h2>
        <p className="mt-4 text-gray-400 max-w-2xl mx-auto">
          Over the years, I’ve contributed to various companies, growing with every role and delivering value through code and creativity.
        </p>
      </div>

      <div className="space-y-10 border-l-2 border-pink-500 pl-6 relative">
        {experiences.map((exp, index) => (
          <div
            key={index}
            className="relative group transition duration-300 transform hover:-translate-y-1 hover:shadow-lg hover:shadow-pink-500/30 p-4 rounded-lg"
          >
            <div className="absolute -left-[14px] w-6 h-6 bg-pink-500 rounded-full border-4 border-gray-900 transition-all group-hover:scale-110"></div>
            <div className="mb-1 text-sm text-pink-400 group-hover:text-white transition duration-300">{exp.duration}</div>
            <h3 className="text-xl font-bold group-hover:text-white transition duration-300">{exp.role}</h3>
            <p className="text-sm text-gray-400 italic group-hover:text-pink-400 transition duration-300">{exp.company}</p>
            <p className="mt-2 text-gray-300 group-hover:text-gray-100 transition duration-300">{exp.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
