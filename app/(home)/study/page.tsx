import React from 'react';

export default function Study() {
  const education = [
    {
      degree: 'BSc in Computer Science',
      institution: 'University of California, Berkeley',
      duration: '2014 – 2018',
      description: 'Focused on software engineering, algorithms, and system design. Graduated with honors.',
    },
    {
      degree: 'Full-Stack Web Development Bootcamp',
      institution: 'Codecademy',
      duration: '2019',
      description: 'Completed a 6-month intensive program covering MERN stack, APIs, and DevOps basics.',
    },
    {
      degree: 'UI/UX Design Certification',
      institution: 'Coursera – Google UX Program',
      duration: '2020',
      description: 'Learned user research, design principles, prototyping, and accessibility.',
    },
  ];

  return (
    <section className="px-6 md:px-20 py-16 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-950 text-white min-h-[100vh] pt-24">
      <div className="text-center mb-12">
        <p className="text-pink-500 uppercase tracking-widest text-sm font-semibold" >
          My Background
        </p>
        <h2 className="text-4xl md:text-5xl font-extrabold">Education</h2>
        <p className="mt-4 text-gray-400 max-w-2xl mx-auto">
          My academic journey has helped shape the foundation of my knowledge and career as a developer and designer.
        </p>
      </div>

      <div className="space-y-10 border-l-2 border-pink-500 pl-6 relative">
        {education.map((edu, index) => (
          <div
            key={index}
            className="relative group transition duration-300 transform hover:-translate-y-1 hover:shadow-lg hover:shadow-pink-500/30 p-4 rounded-lg"
          >
            <div className="absolute -left-[14px] w-6 h-6 bg-pink-500 rounded-full border-4 border-gray-900 transition-all group-hover:scale-110"></div>
            <div className="mb-1 text-sm text-pink-400 group-hover:text-white transition duration-300">
              {edu.duration}
            </div>
            <h3 className="text-xl font-bold group-hover:text-white transition duration-300">
              {edu.degree}
            </h3>
            <p className="text-sm text-gray-400 italic group-hover:text-pink-400 transition duration-300">
              {edu.institution}
            </p>
            <p className="mt-2 text-gray-300 group-hover:text-gray-100 transition duration-300">
              {edu.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
