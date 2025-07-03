export default function About() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-950 text-white pb-10">
      <div className="container mx-auto space-y-16">
        {/* Top Section: Image + About Text */}
        <div className="container ">
          <section className="grid grid-cols-1 md:grid-cols-[35%_40%] gap-12 items-center pt-24 justify-center">
            <div className="bg-white rounded-xl shadow-[0_5px_15px_rgba(209,217,230,0.35)] p-5">
              <img
                src="https://media.istockphoto.com/id/672506854/photo/success-and-confidence-in-business.jpg?s=2048x2048&w=is&k=20&c=H3mmOmTksPo0xQJrbnGUO5aW3gvjGRxX06fpRUitYX8="
                alt="About me"
                className="rounded-xl w-full object-cover"
                style={{ aspectRatio: '4 / 5' }}
              />
            </div>
            <div className="space-y-6">
              <p className="text-pink-500 uppercase tracking-widest text-sm font-semibold">
                Visit my portfolio & hire me
              </p>
              <h2 className="text-4xl font-extrabold text-white">About Me</h2>
              <div className="text-gray-300 space-y-4 leading-relaxed">
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eum in eos saepe ipsa cupiditate accusantium
                  voluptatibus quidem nam, reprehenderit, et necessitatibus adipisci labore sit veritatis vero tempore
                  sequi at sed facere dolore.
                </p>
                <p>
                  Quae obcaecati eius quasi doloribus illum minus fugit. Lorem ipsum dolor sit amet, consectetur
                  adipisicing elit. Eum in eos saepe ipsa cupiditate accusantium voluptatibus quidem nam, reprehenderit.
                </p>
              </div>

              <div className="text-gray-300 space-y-2">
                <div>
                  <span className="font-semibold">Name:</span> Jessica Biogi
                </div>
                <div>
                  <span className="font-semibold">Nationality:</span> USA
                </div>
                <div>
                  <span className="font-semibold">Phone:</span> (+1) 234 567 8899
                </div>
                <div>
                  <span className="font-semibold">Email:</span> hello@biogi.com
                </div>
                <div>
                  <span className="font-semibold">Experience:</span> 6+ years
                </div>
                <div>
                  <span className="font-semibold">Freelance:</span> Available
                </div>
                <div>
                  <span className="font-semibold">Skype:</span> hello.biogi
                </div>
                <div>
                  <span className="font-semibold">Language:</span> English
                </div>
              </div>

              <button className="bg-white text-pink-500 font-semibold px-6 py-3 rounded-lg shadow-md hover:shadow-pink-300 transition">
                Download My CV
              </button>
            </div>
          </section>
        </div>

        {/* Who I Am & Tech Stack Section */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="bg-white/5 backdrop-blur-md border border-white/10 p-6 rounded-2xl shadow-md hover:shadow-blue-500/20 transition">
            <h2 className="text-2xl font-bold mb-4 text-blue-300 Epilogue">Who I Am</h2>
            <p className="text-slate-300 text-base leading-loose Poppins">
              Im a curious and creative problem solver who thrives in dynamic environments. Whether working on
              frontend UIs or backend logic, I value clean code, efficient workflows, and impactful results. Outside of
              work, I enjoy reading tech articles, contributing to open-source, and experimenting with side projects.
            </p>
          </div>

          <div className="bg-white/5 backdrop-blur-md border border-white/10 p-6 rounded-2xl shadow-md hover:shadow-blue-500/20 transition">
            <h2 className="text-2xl font-bold mb-4 text-blue-300 Epilogue">Tech Stack</h2>
            <ul className="list-disc list-inside text-slate-300 space-y-2 Poppins">
              <li>⚛️ React & Next.js for frontend frameworks</li>
              <li>🛠️ Laravel & REST APIs for backend systems</li>
              <li>🎨 Tailwind CSS for modern UI design</li>
              <li>🔒 Secure Authentication & Role Management</li>
              <li>🚀 CI/CD & Hosting with Vercel, Netlify, and cPanel</li>
            </ul>
          </div>
        </section>

        {/* What I Offer Section */}
        <section className="text-center space-y-8">
          <h2 className="text-3xl font-bold text-blue-300 Epilogue">What I Offer</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
            {[
              ['Website Design', 'Intuitive and custom designs tailored to your brand identity.'],
              ['Web Development', 'Robust, scalable, and maintainable web applications.'],
              ['App Development', 'Cross-platform mobile/web app development.'],
              ['Cyber Security', 'Secure applications and user data protection strategies.'],
              ['Digital Marketing', 'SEO and data-driven growth strategies.'],
              ['Other Services', 'Need something custom? Let’s talk!'],
            ].map(([title, desc]) => (
              <div
                key={title}
                className="bg-white/5 backdrop-blur-md border border-white/10 p-5 rounded-xl hover:shadow-blue-500/20 transition"
              >
                <h3 className="text-xl font-semibold text-blue-200 mb-2 Epilogue">{title}</h3>
                <p className="text-slate-300 text-sm Poppins">{desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Lets Connect Section */}
        <section className="mt-20 max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4 text-blue-300 Epilogue">Lets Connect</h2>
          <p className="text-slate-300 Poppins mb-6">
            Feel free to reach out for collaborations, freelance projects, or just to say hello!
          </p>

          <a
            href="mailto:mikejojo@example.com"
            className="flex justify-center gap-2 mb-4 text-blue-400 hover:underline Poppins"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="currentColor">
              <path d="M4.616 19q-.691 0-1.153-.462T3 17.384V6.616q0-.691.463-1.153T4.615 5h14.77q.69 0 1.152.463T21 6.616v10.769q0 .69-.463 1.153T19.385 19zM20 6.885l-7.552 4.944q-.106.055-.214.093q-.109.037-.234.037t-.234-.037t-.214-.093L4 6.884v10.5q0 .27.173.443t.443.173h14.769q.269 0 .442-.173t.173-.443zM12 11l7.692-5H4.308zM4 6.885v.211v-.811v.034V6v.32v-.052v.828zV18z" />
            </svg>
            <p>mikejojo@example.com</p>
          </a>

          <div className="flex justify-center gap-6">
            {/* GitHub */}
            <a
              href="https://github.com/yourusername"
              target="_blank"
              rel="noopener noreferrer"
              className="flex justify-center gap-2 hover:text-blue-400 transition"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none">
                <mask id="lineMdGithubLoop0" width={24} height={24} x={0} y={0}>
                  <g fill="#fff">
                    <ellipse cx={9.5} cy={9} rx={1.5} ry={1}></ellipse>
                    <ellipse cx={14.5} cy={9} rx={1.5} ry={1}></ellipse>
                  </g>
                </mask>
                <g stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}>
                  <path
                    strokeDasharray={32}
                    strokeDashoffset={32}
                    d="M12 4c1.67 0 2.61 0.4 3 0.5c0.53 -0.43 1.94 -1.5 3.5 -1.5c0.34 1 0.29 2.22 0 3c0.75 1 1 2 1 3.5c0 2.19 -0.48 3.58 -1.5 4.5c-1.02 0.92 -2.11 1.37 -3.5 1.5c0.65 0.54 0.5 1.87 0.5 2.5c0 0.73 0 3 0 3M12 4c-1.67 0 -2.61 0.4 -3 0.5c-0.53 -0.43 -1.94 -1.5 -3.5 -1.5c-0.34 1 -0.29 2.22 0 3c-0.75 1 -1 2 -1 3.5c0 2.19 0.48 3.58 1.5 4.5c1.02 0.92 2.11 1.37 3.5 1.5c-0.65 0.54 -0.5 1.87 -0.5 2.5c0 0.73 0 3 0 3"
                  >
                    <animate fill="freeze" attributeName="stroke-dashoffset" dur="0.7s" values="32;0" />
                  </path>
                  <path
                    strokeDasharray={10}
                    strokeDashoffset={10}
                    d="M9 19c-1.406 0-2.844-.563-3.688-1.188C4.47 17.188 4.22 16.157 3 15.5"
                  >
                    <animate
                      attributeName="d"
                      dur="3s"
                      repeatCount="indefinite"
                      values="M9 19c-1.406 0-2.844-.563-3.688-1.188C4.47 17.188 4.22 16.157 3 15.5;M9 19c-1.406 0-3-.5-4-.5-.532 0-1 0-2-.5;M9 19c-1.406 0-2.844-.563-3.688-1.188C4.47 17.188 4.22 16.157 3 15.5"
                    />
                    <animate fill="freeze" attributeName="stroke-dashoffset" begin="0.8s" dur="0.2s" values="10;0" />
                  </path>
                </g>
                <rect width={8} height={4} x={8} y={11} fill="currentColor" mask="url(#lineMdGithubLoop0)">
                  <animate
                    attributeName="y"
                    dur="10s"
                    keyTimes="0;0.45;0.46;0.54;0.55;1"
                    repeatCount="indefinite"
                    values="11;11;7;7;11;11"
                  />
                </rect>
              </svg>
              GitHub
            </a>

            {/* LinkedIn */}
            <a
              href="https://linkedin.com/in/yourusername"
              target="_blank"
              rel="noopener noreferrer"
              className="flex justify-center gap-2 hover:text-blue-400 transition"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none">
                <circle cx={4} cy={4} r={2} fill="currentColor" fillOpacity={0}>
                  <animate fill="freeze" attributeName="fill-opacity" dur="0.15s" values="0;1" />
                </circle>
                <g stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={4}>
                  <path strokeDasharray={12} strokeDashoffset={12} d="M4 10v10">
                    <animate fill="freeze" attributeName="stroke-dashoffset" begin="0.15s" dur="0.2s" values="12;0" />
                  </path>
                  <path strokeDasharray={12} strokeDashoffset={12} d="M10 10v10">
                    <animate fill="freeze" attributeName="stroke-dashoffset" begin="0.45s" dur="0.2s" values="12;0" />
                  </path>
                  <path strokeDasharray={24} strokeDashoffset={24} d="M10 15c0 -2.76 2.24 -5 5 -5c2.76 0 5 2.24 5 5v5">
                    <animate fill="freeze" attributeName="stroke-dashoffset" begin="0.65s" dur="0.2s" values="24;0" />
                  </path>
                </g>
              </svg>
              LinkedIn
            </a>

            {/* Twitter */}
            <a
              href="https://twitter.com/yourusername"
              target="_blank"
              rel="noopener noreferrer"
              className="flex justify-center gap-2 hover:text-blue-400 transition"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none">
                <path
                  fill="none"
                  stroke="currentColor"
                  strokeDasharray={64}
                  strokeDashoffset={64}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19.89 7.34c-0.09 0.33 -0.49 1.16 -1.17 1.95c-0.45 8.68 -8.87 11.5 -14.64 8.59c-0.79 -1.05 2.85 -0.62 4.18 -2.63c-5.03 -2.57 -4.63 -9.44 -3.62 -9.16c2.37 3.19 6.19 3.48 6.81 3.19c0 -0.73 -0.31 -2.32 1.41 -3.65c0.99 -0.71 3.06 -1.34 4.93 0.69c0.32 0.21 0.78 0.3 1.47 0.15c0.41 -0.21 0.95 -0.07 0.67 0.66Z"
                >
                  <animate fill="freeze" attributeName="stroke-dashoffset" dur="0.6s" values="64;0" />
                </path>
              </svg>
              Twitter
            </a>

            {/* Facebook */}
            <a
              href="https://facebook.com/yourusername"
              target="_blank"
              rel="noopener noreferrer"
              className="flex justify-center gap-2 hover:text-blue-400 transition"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none">
                <g stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={4}>
                  <path strokeDasharray={24} strokeDashoffset={24} d="M17 4l-2 0c-2.5 0 -4 1.5 -4 4v12">
                    <animate fill="freeze" attributeName="stroke-dashoffset" dur="0.4s" values="24;0" />
                  </path>
                  <path strokeDasharray={8} strokeDashoffset={8} d="M8 12h7">
                    <animate fill="freeze" attributeName="stroke-dashoffset" begin="0.5s" dur="0.2s" values="8;0" />
                  </path>
                </g>
              </svg>
              Facebook
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}
