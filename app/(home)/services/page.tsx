import React from 'react';

export default function Services() {
  const services = [
    {
      icon: '💻',
      title: 'Web Development',
      desc: 'Building responsive and dynamic websites using modern technologies.',
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
    <section className="px-6 md:px-20 py-16 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-950 text-white pt-24 min-h-[100vh]">
      <div className="text-center mb-12">
        <p className="text-pink-500 uppercase tracking-widest text-sm font-semibold">
          What I Offer
        </p>
        <h2 className="text-4xl md:text-5xl font-extrabold">My Services</h2>
        <p className="mt-4 text-gray-400 max-w-2xl mx-auto">
          I provide a range of services to help businesses and individuals stand out online with modern, fast, and visually engaging solutions.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {services.map((service, index) => (
          <div
            key={index}
            className="bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-pink-500/30 transition transform hover:-translate-y-1 duration-300"
          >
            <div className="mb-4 text-3xl">{service.icon}</div>
            <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
            <p className="text-gray-400 text-sm">{service.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
