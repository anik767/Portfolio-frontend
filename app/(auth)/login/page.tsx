'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Link from 'next/link';

// Helper to read cookie by name (for CSRF token)
function getCookie(name: string) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(';').shift() || '';
  return '';
}

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  useEffect(() => {
    async function checkAuth() {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/user`, {
          credentials: 'include',
        });
        if (res.ok) {
          router.push('/admin');
          return;
        }
      } catch {
        // Not authenticated
      }

      const savedEmail = localStorage.getItem('rememberedEmail');
      const savedPasswordEncoded = localStorage.getItem('rememberedPassword');

      if (savedEmail && savedPasswordEncoded) {
        setEmail(savedEmail);
        setPassword(atob(savedPasswordEncoded));
        setRememberMe(true);
      } else if (savedEmail) {
        setEmail(savedEmail);
        setRememberMe(true);
      }
    }
    checkAuth();
  }, [router]);

  const handleRememberMeChange = (checked: boolean) => {
    setRememberMe(checked);
    if (!checked) {
      localStorage.removeItem('rememberedEmail');
      localStorage.removeItem('rememberedPassword');
      setPassword('');
    }
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!email.trim() || !password) {
      toast.error('Please enter both email and password.');
      return;
    }

    setLoading(true);

    try {
      const csrfRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/sanctum/csrf-cookie`, {
        credentials: 'include',
      });
      if (!csrfRes.ok) throw new Error('Failed to get CSRF cookie');

      const csrfToken = getCookie('XSRF-TOKEN');

      const loginRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-XSRF-TOKEN': decodeURIComponent(csrfToken),
        },
        credentials: 'include',
        body: JSON.stringify({ email, password }),
      });

      if (!loginRes.ok) {
        const data = await loginRes.json().catch(() => ({}));
        throw new Error(data.message || 'Login failed');
      }

      const userRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/user`, {
        credentials: 'include',
      });

      if (!userRes.ok) {
        throw new Error('Failed to fetch user info after login');
      }

      if (rememberMe) {
        localStorage.setItem('rememberedEmail', email);
        localStorage.setItem('rememberedPassword', btoa(password));
      } else {
        localStorage.removeItem('rememberedEmail');
        localStorage.removeItem('rememberedPassword');
      }

      toast.success('Login successful!');
      router.push('/admin?login=success');
    } catch (err: any) {
      toast.error(err.message || 'Something went wrong');
      setPassword('');
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="relative w-full h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <div
          className="w-full h-full bg-cover bg-center"
          style={{
            backgroundImage: "url('/Image/Login/login_background.jpg')",
            filter: 'blur(4px)',
          }}
        />
        <div className="absolute inset-0 bg-black/50" />
      </div>

      <div className="relative z-10 w-[70%] h-[70%] bg-white/20 backdrop-blur-sm grid grid-cols-[30%70%] rounded-2xl shadow-lg">
        <div className="w-full h-full px-5 flex flex-col justify-center">
          <h2 className="text-2xl font-bold text-black/80">Login</h2>
          <p className="text-sm mt-4 text-black/80">If you have an account, please login</p>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div>
              <label className="block text-black/80">Email Address</label>
              <input
                type="email"
                placeholder="Enter Email Address"
                className="w-full px-4 py-3 rounded-lg mt-2 border border-black/50 focus:outline-none"
                autoFocus
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="relative">
              <label className="block text-black/80">Password</label>
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter Password"
                className="w-full px-4 py-3 rounded-lg mt-2 border border-black/50 focus:outline-none"
                required
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-[70%] transform -translate-y-1/2 focus:outline-none"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={29}
                    height={29}
                    viewBox="0 0 36 36"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path d="M2 2l32 32" />
                    <path d="M10 10a12 12 0 0116 16" />
                    <path d="M14 14a8 8 0 0110 10" />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={30}
                    height={30}
                    viewBox="0 0 36 36"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <circle cx="18" cy="18" r="4" />
                    <path d="M1 18c4-7 11-12 17-12s13 5 17 12c-4 7-11 12-17 12S5 25 1 18z" />
                  </svg>
                )}
              </button>
            </div>

            <div className="flex items-center">
              <input
                id="rememberMe"
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => handleRememberMeChange(e.target.checked)}
                className="mr-2"
              />
              <label htmlFor="rememberMe" className="text-sm">
                Remember me
              </label>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:bg-blue-400 transition"
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>

            <Link
              href="/"
              className="text-sm text-blue-700 hover:underline inline-block mt-3"
            >
              Back to Home Page
            </Link>

          </form>
        </div>

        <div className="w-full h-full md:block hidden">
          <img
            src="https://static.vecteezy.com/system/resources/previews/024/570/420/non_2x/illustration-of-a-young-man-working-at-the-computer-in-the-office-nerdy-boy-is-programming-at-a-computer-in-a-room-ai-generated-free-photo.jpg"
            alt="Login Illustration"
            className="w-full h-full object-cover rounded-r-2xl"
          />
        </div>
      </div>
    </section>
  );
}
