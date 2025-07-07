import React from 'react';

export default function Services() {
  const services = [
    {
      icon: '💻',
      title: 'Web Development',
      desc: 'Building responsive and dynamic websites using modern technologies.Building responsive and dynamic websites using modern technologies.Building responsive and dynamic websites using modern technologies.Building responsive and dynamic websites using modern technologies.Building responsive and dynamic websites using modern technologies.Building responsive and dynamic websites using modern technologies.Building responsive and dynamic websites using modern technologies.Building responsive and dynamic websites using modern technologies.',
    },
    {
      icon: '🎨',
      title: 'UI/UX Design',
      desc: 'Designing user interfaces with a focus on usability and elegance.',
    },
    {
      icon: '📱',
      title: 'Mobile App Development',
      desc: 'Creating performant mobile applications for Android and iOS.',
    },
    {
      icon: '🔍',
      title: 'SEO Optimization',
      desc: 'Improving visibility and performance across search engines.',
    },
  ];

  return (
    <section className="px-6 md:px-20 py-16 bg-gradient-to-br from-[#222121] via-[#2b2b2b] to-[#1c1b1b] text-white pt-24 min-h-[100vh]">
      <div className="text-center mb-16">
        <p className="text-[#59C378] uppercase tracking-widest text-sm font-semibold">
          What I Offer
        </p>
        <h2 className="text-4xl md:text-5xl font-extrabold text-white">My Services</h2>
        <p className="mt-4 text-white/60 max-w-2xl mx-auto">
          I provide a range of services to help businesses and individuals stand out online with modern, fast, and visually engaging solutions.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {services.map((service, index) => (
          <div
            key={index}
            className="relative bg-[#1e1e1e]/80 border border-white/10 backdrop-blur rounded-2xl p-6 shadow-md hover:shadow-[#59C378]/30 hover:-translate-y-1 transform transition duration-300"
          >
            <div className="mb-4 text-4xl">{service.icon}</div>
            <h3 className="text-xl font-semibold mb-2 text-white">{service.title}</h3>
            <p className="text-white/70 text-sm text-justify">{service.desc}</p>

            {/* Optional glow dot for aesthetics */}
            <div className="absolute bottom-0 right-0 w-20 h-20 bg-[#59C378] blur-[60px] rounded-full opacity-30 pointer-events-none z-[-1]" />
          </div>
        ))}
      </div>
    </section>
  );
}
