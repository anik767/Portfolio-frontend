'use client';
import React, { useState } from 'react';

const Footer: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(null);
    setError(null);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || 'Something went wrong');
      }

      setSuccess('Message sent successfully!');
      setFormData({ name: '', email: '', message: '' });
    } catch (err: any) {
      setError(err.message || 'Failed to send message');
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer className="bg-[#111] text-white py-8 ">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
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
            <div className="flex gap-4">
              {/* Social Icons Here */}
              <a href="#" className="text-gray-400 hover:text-white">Facebook</a>
              <a href="#" className="text-gray-400 hover:text-white">Twitter</a>
              <a href="#" className="text-gray-400 hover:text-white">Instagram</a>
            </div>
          </div>
        </div>

        {/* Pages List */}
        <div>
          <h2 className="text-2xl font-bold mb-4">Pages</h2>
          <ul className="space-y-2">

            <li><a href="/about" className="text-gray-300 hover:text-white">About</a></li>
            <li><a href="/services" className="text-gray-300 hover:text-white">Services</a></li>
            <li><a href="/contact" className="text-gray-300 hover:text-white">Contact</a></li>
            <li><a href="/privacy-policy" className="text-gray-300 hover:text-white">Privacy Policy</a></li>
            <li><a href="/terms" className="text-gray-300 hover:text-white">Terms & Conditions</a></li>
          </ul>
        </div>

        {/* Contact Form */}
        <div>
          <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
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
              {loading ? 'Sending...' : 'Send Message'}
            </button>
            {success && <p className="text-green-400 mt-2">{success}</p>}
            {error && <p className="text-red-400 mt-2">{error}</p>}
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
