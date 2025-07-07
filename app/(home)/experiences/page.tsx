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
    <section className="px-6 md:px-20 py-16 bg-gradient-to-br from-[#222121] via-[#2b2b2b] to-[#1c1b1b] text-white pt-24 min-h-[100vh]">
      <div className="text-center mb-12">
        <p className="text-[#59C378] uppercase tracking-widest text-sm font-semibold">
          My Journey
        </p>
        <h2 className="text-4xl md:text-5xl font-extrabold text-white">Work Experiences</h2>
        <p className="mt-4 text-white/60 max-w-2xl mx-auto">
          Over the years, I’ve contributed to various companies, growing with every role and delivering value through code and creativity.
        </p>
      </div>

      <div className="space-y-10 border-l-2 border-[#59C378] pl-6 relative">
        {experiences.map((exp, index) => (
          <div
            key={index}
            className="relative group transition duration-300 transform hover:-translate-y-1 hover:shadow-[#59C378]/30 p-5 rounded-xl bg-white/5 backdrop-blur-md border border-white/10"
          >
            <div className="absolute -left-[14px] w-6 h-6 bg-[#59C378] rounded-full border-4 border-[#1c1b1b] group-hover:scale-110 transition-all"></div>
            <div className="mb-1 text-sm text-[#59C378] group-hover:text-white transition">{exp.duration}</div>
            <h3 className="text-xl font-bold group-hover:text-white transition">{exp.role}</h3>
            <p className="text-sm text-white/60 italic group-hover:text-[#59C378] transition">{exp.company}</p>
            <p className="mt-2 text-white/80 group-hover:text-white transition">{exp.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
