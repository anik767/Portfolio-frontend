"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      router.push("/admin");
    }

    const savedEmail = localStorage.getItem("rememberedEmail");
    const savedPassword = localStorage.getItem("rememberedPassword");
    if (savedEmail && savedPassword) {
      setEmail(savedEmail);
      setPassword(savedPassword);
      setRememberMe(true);
    }
  }, [router]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!email.trim() || !password) {
      toast.error("Please enter both email and password.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.message || "Login failed");
      }

      const data = await res.json();
      localStorage.setItem("token", data.token);

      if (rememberMe) {
        localStorage.setItem("rememberedEmail", email);
        localStorage.setItem("rememberedPassword", password);
      } else {
        localStorage.removeItem("rememberedEmail");
        localStorage.removeItem("rememberedPassword");
      }

      toast.success("Login successful!");
      router.push("/admin");
    } catch (err: any) {
      toast.error(err.message || "Something went wrong");
      setPassword("");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="relative w-full h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        {/* Blurred background image */}
        <div
          className="w-full h-full bg-cover bg-center"
          style={{
            backgroundImage: "url('/Image/Login/login_background.jpg')",
            filter: "blur(4px)",
          }}
        ></div>

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/50 bg-opacity-50"></div>
      </div>

      {/* Optional Overlay */}
      <div className="absolute inset-0 bg-black/10 z-0" />

      {/* Login Card */}
      <div className="relative z-10 w-[70%] h-[70%] bg-white/20 backdrop-blur-sm grid grid-cols-[30%70%] rounded-2xl shadow-lg">
        {/* Form Side */}
        <div className="w-full h-full px-5 flex flex-col justify-center">
          <h2 className="text-2xl font-bold text-black/80">Login</h2>
          <p className="text-sm mt-4 text-black/80">
            If you have an account, please login
          </p>

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
                type={showPassword ? "text" : "password"}
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
                className="absolute right-3 top-[70%] transform -translate-y-1/2  focus:outline-none"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  // Eye-off icon (closed eye)
                  <svg xmlns="http://www.w3.org/2000/svg" width={29} height={29} viewBox="0 0 36 36">
                    <path fill="currentColor" d="M33.62 17.53c-3.37-6.23-9.28-10-15.82-10S5.34 11.3 2 17.53l-.28.47l.26.48c3.37 6.23 9.28 10 15.82 10s12.46-3.72 15.82-10l.26-.48Zm-15.82 8.9C12.17 26.43 7 23.29 4 18c3-5.29 8.17-8.43 13.8-8.43S28.54 12.72 31.59 18c-3.05 5.29-8.17 8.43-13.79 8.43" className="clr-i-outline clr-i-outline-path-1"></path>
                    <path fill="currentColor" d="M18.09 11.17A6.86 6.86 0 1 0 25 18a6.86 6.86 0 0 0-6.91-6.83m0 11.72A4.86 4.86 0 1 1 23 18a4.87 4.87 0 0 1-4.91 4.89" className="clr-i-outline clr-i-outline-path-2"></path>
                    <path fill="none" d="M0 0h36v36H0z"></path>
                  </svg>
                ) : (
                  // Eye icon (open eye)
                  <svg xmlns="http://www.w3.org/2000/svg" width={30} height={30} viewBox="0 0 36 36">
                    <path fill="currentColor" d="M25.19 20.4a6.8 6.8 0 0 0 .43-2.4a6.86 6.86 0 0 0-6.86-6.86a6.8 6.8 0 0 0-2.37.43L18 13.23a5 5 0 0 1 .74-.06A4.87 4.87 0 0 1 23.62 18a5 5 0 0 1-.06.74Z" className="clr-i-outline clr-i-outline-path-1"></path>
                    <path fill="currentColor" d="M34.29 17.53c-3.37-6.23-9.28-10-15.82-10a16.8 16.8 0 0 0-5.24.85L14.84 10a14.8 14.8 0 0 1 3.63-.47c5.63 0 10.75 3.14 13.8 8.43a17.8 17.8 0 0 1-4.37 5.1l1.42 1.42a19.9 19.9 0 0 0 5-6l.26-.48Z" className="clr-i-outline clr-i-outline-path-2"></path>
                    <path fill="currentColor" d="m4.87 5.78l4.46 4.46a19.5 19.5 0 0 0-6.69 7.29l-.26.47l.26.48c3.37 6.23 9.28 10 15.82 10a16.9 16.9 0 0 0 7.37-1.69l5 5l1.75-1.5l-26-26Zm9.75 9.75l6.65 6.65a4.8 4.8 0 0 1-2.5.72A4.87 4.87 0 0 1 13.9 18a4.8 4.8 0 0 1 .72-2.47m-1.45-1.45a6.85 6.85 0 0 0 9.55 9.55l1.6 1.6a14.9 14.9 0 0 1-5.86 1.2c-5.63 0-10.75-3.14-13.8-8.43a17.3 17.3 0 0 1 6.12-6.3Z" className="clr-i-outline clr-i-outline-path-3"></path>
                    <path fill="none" d="M0 0h36v36H0z"></path>
                  </svg>
                )}
              </button>
            </div>


            <div className="flex items-center">
              <input
                id="rememberMe"
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
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
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>
        </div>

        {/* Image Side */}
        <div className="w-full h-full md:block hidden">
          <img
            src="https://static.vecteezy.com/system/resources/previews/024/570/420/non_2x/illustration-of-a-young-man-working-at-the-computer-in-the-office-nerdy-boy-is-programming-at-a-computer-in-a-room-ai-generated-free-photo.jpg"
            alt="Login Illustration"
            className="w-full h-full object-cover rounded-r-2xl"
          />
        </div>
      </div>
      <ToastContainer position="top-right" autoClose={3000} />
    </section>
  );
}
