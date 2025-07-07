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
    <section className="px-6 md:px-20 py-16 bg-gradient-to-br from-[#222121] via-[#2b2b2b] to-[#1c1b1b] text-white min-h-[100vh] pt-24">
      <div className="text-center mb-12">
        <p className="text-[#59C378] uppercase tracking-widest text-sm font-semibold">
          My Background
        </p>
        <h2 className="text-4xl md:text-5xl font-extrabold">Education</h2>
        <p className="mt-4 text-white/60 max-w-2xl mx-auto">
          My academic journey has helped shape the foundation of my knowledge and career as a developer and designer.
        </p>
      </div>

      <div className="space-y-10 border-l-2 border-[#59C378] pl-6 relative">
        {education.map((edu, index) => (
          <div
            key={index}
            className="relative group transition duration-300 transform hover:-translate-y-1 hover:shadow-[#59C378]/30 p-5 rounded-xl bg-white/5 backdrop-blur-md border border-white/10"
          >
            <div className="absolute -left-[14px] w-6 h-6 bg-[#59C378] rounded-full border-4 border-[#1c1b1b] group-hover:scale-110 transition-all"></div>
            <div className="mb-1 text-sm text-[#59C378] group-hover:text-white transition duration-300">
              {edu.duration}
            </div>
            <h3 className="text-xl font-bold group-hover:text-white transition duration-300">
              {edu.degree}
            </h3>
            <p className="text-sm text-white/60 italic group-hover:text-[#59C378] transition duration-300">
              {edu.institution}
            </p>
            <p className="mt-2 text-white/80 group-hover:text-white transition duration-300">
              {edu.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
