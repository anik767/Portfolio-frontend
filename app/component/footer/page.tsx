'use client';
import Link from 'next/link';
import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { TailSpin } from 'react-loader-spinner';

const Footer = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Simulate API call or replace with your actual API logic
      await new Promise(resolve => setTimeout(resolve, 1500));

      toast.success('Message sent successfully! 🎉');
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      toast.error('Failed to send message. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer className="bg-[#111] text-white py-8 ">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Info & Socials */}
        <div className="flex flex-col justify-between">
          <div>
            <h2 className="text-2xl font-bold mb-4">MY Information</h2>
            <p className="text-gray-300 mb-2">123 Street Name, City, Country</p>
            <p className="text-gray-300 mb-2">Email: info@example.com</p>
            <p className="text-gray-300">Phone: +123 456 7890</p>
          </div>
          <div className="mt-8">
            <h3 className="text-lg font-semibold mb-3">Follow me</h3>
            <div className="flex gap-4 items-start ">
              {/* Social Icons Here */}
              <Link href="https://www.facebook.com" target='_blank' className=""><svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24">
                <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={4}>
                  <path strokeDasharray={24} strokeDashoffset={24} d="M17 4l-2 0c-2.5 0 -4 1.5 -4 4v12">
                    <animate fill="freeze" attributeName="stroke-dashoffset" dur="0.4s" values="24;0"></animate>
                  </path>
                  <path strokeDasharray={8} strokeDashoffset={8} d="M8 12h7">
                    <animate fill="freeze" attributeName="stroke-dashoffset" begin="0.5s" dur="0.2s" values="8;0"></animate>
                  </path>
                </g>
              </svg></Link>
              <Link href="#" target='_blank' className="" ><svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24">
                <circle cx={4} cy={4} r={2} fill="currentColor" fillOpacity={0}>
                  <animate fill="freeze" attributeName="fill-opacity" dur="0.15s" values="0;1"></animate>
                </circle>
                <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={4}>
                  <path strokeDasharray={12} strokeDashoffset={12} d="M4 10v10">
                    <animate fill="freeze" attributeName="stroke-dashoffset" begin="0.15s" dur="0.2s" values="12;0"></animate>
                  </path>
                  <path strokeDasharray={12} strokeDashoffset={12} d="M10 10v10">
                    <animate fill="freeze" attributeName="stroke-dashoffset" begin="0.45s" dur="0.2s" values="12;0"></animate>
                  </path>
                  <path strokeDasharray={24} strokeDashoffset={24} d="M10 15c0 -2.76 2.24 -5 5 -5c2.76 0 5 2.24 5 5v5">
                    <animate fill="freeze" attributeName="stroke-dashoffset" begin="0.65s" dur="0.2s" values="24;0"></animate>
                  </path>
                </g>
              </svg></Link>
              <Link href="#" target='_blank' className="" ><svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24">
                <path fill="none" stroke="currentColor" strokeDasharray={64} strokeDashoffset={64} strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.89 7.34c-0.09 0.33 -0.49 1.16 -1.17 1.95c-0.45 8.68 -8.87 11.5 -14.64 8.59c-0.79 -1.05 2.85 -0.62 4.18 -2.63c-5.03 -2.57 -4.63 -9.44 -3.62 -9.16c2.37 3.19 6.19 3.48 6.81 3.19c0 -0.73 -0.31 -2.32 1.41 -3.65c0.99 -0.71 3.06 -1.34 4.93 0.69c0.32 0.21 0.78 0.3 1.47 0.15c0.41 -0.21 0.95 -0.07 0.67 0.66Z">
                  <animate fill="freeze" attributeName="stroke-dashoffset" dur="0.6s" values="64;0"></animate>
                </path>
              </svg></Link>
              <Link href="#" target='_blank' className="w-[60px]" ><svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24">
                <circle cx={17} cy={7} r={1.5} fill="currentColor" fillOpacity={0}>
                  <animate fill="freeze" attributeName="fill-opacity" begin="1.3s" dur="0.15s" values="0;1"></animate>
                </circle>
                <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}>
                  <path strokeDasharray={72} strokeDashoffset={72} d="M16 3c2.76 0 5 2.24 5 5v8c0 2.76 -2.24 5 -5 5h-8c-2.76 0 -5 -2.24 -5 -5v-8c0 -2.76 2.24 -5 5 -5h4Z">
                    <animate fill="freeze" attributeName="stroke-dashoffset" dur="0.6s" values="72;0"></animate>
                  </path>
                  <path strokeDasharray={28} strokeDashoffset={28} d="M12 8c2.21 0 4 1.79 4 4c0 2.21 -1.79 4 -4 4c-2.21 0 -4 -1.79 -4 -4c0 -2.21 1.79 -4 4 -4">
                    <animate fill="freeze" attributeName="stroke-dashoffset" begin="0.7s" dur="0.6s" values="28;0"></animate>
                  </path>
                </g>
              </svg></Link>
            </div>
          </div>
        </div>

        {/* Pages List */}
        <div>
          <h2 className="text-2xl font-bold mb-4">Pages</h2>
          <ul className="space-y-2">

            <li><Link href="/about" className="text-gray-300 hover:text-white">About</Link></li>
            <li><Link href="/projects" className="text-gray-300 hover:text-white">projects</Link></li>
            <li><Link href="/services" className="text-gray-300 hover:text-white">Services</Link></li>
            <li><Link href="/experiences" className="text-gray-300 hover:text-white">Experiences</Link></li>
            <li><Link href="/study" className="text-gray-300 hover:text-white">Study</Link></li>
            <li><Link href="/blog" className="text-gray-300 hover:text-white">Blogs</Link></li>
          </ul>
        </div>

        {/* Contact Form */}
        <div>
          <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
          <form onSubmit={handleSubmit} className="space-y-2">
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              className="w-full p-2 rounded bg-[#F4F1EA] text-black border border-gray-700 focus:bg-[#111] focus:outline-none focus:border-b-[#4a90e2] focus:shadow-[0_0_4px_rgba(74,144,226,0.5)] focus:text-white"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              className="w-full p-2 rounded bg-[#F4F1EA] text-black border border-gray-700 focus:bg-[#111] focus:outline-none focus:border-b-[#4a90e2] focus:shadow-[0_0_4px_rgba(74,144,226,0.5)] focus:text-white"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <textarea
              name="message"
              placeholder="Your Message"
              rows={4}
              className="w-full p-2 rounded bg-[#F4F1EA] text-black border border-gray-700 focus:bg-[#111] focus:outline-none focus:border-b-[#4a90e2] focus:shadow-[0_0_4px_rgba(74,144,226,0.5)] focus:text-white"
              value={formData.message}
              onChange={handleChange}
              required
            ></textarea>
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 transition-colors px-6 py-3 rounded text-white font-semibold disabled:opacity-50"
              disabled={loading}
            >
              {loading ? <TailSpin height={20} width={20} color="#fff" /> : 'Send Message'}
            </button>
            <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
          </form>
        </div>
      </div>

      <div className="text-center text-gray-500 text-sm mt-12">
        &copy; {new Date().getFullYear()}  All Rights Reserved.
      </div>
    </footer>

  );
};

export default Footer;
