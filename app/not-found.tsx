// app/not-found.tsx
"use client";

import Link from "next/link";
import Image from "next/image";

export default function NotFound() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-6 text-center ">
      <div className="max-w-2xl w-full">
        <Image
          src="/Image/404.gif"
          alt="404"
          width={800}
          height={600}
          unoptimized
          className="w-full h-auto mb-8 rounded "
        />
        <h1 className="text-4xl font-bold text-gray-800 mb-4">404 - Page Not Found</h1>
        <p className="text-gray-600 mb-6">
        Sorry, the page you are looking for does not exist or has been moved.
        </p>
        <Link
          href="/"
          className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Go Back Home
        </Link>
      </div>
    </main>
  );
}
