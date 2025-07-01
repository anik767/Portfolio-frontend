// app/(home)/layout.tsx
import Footer from '../component/footer/page';
import Navbar from '../component/nav/page';

export const metadata = {
  title: 'My Website',
  description: 'Welcome to my website',
};

export default function HomeLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
