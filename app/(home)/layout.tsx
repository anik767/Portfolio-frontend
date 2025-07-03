// app/(home)/layout.tsx
import Footer from '../component/footer/page';
import Navbar from '../component/nav/page';

export const metadata = {
  title: 'My Website',
  description: 'Welcome to my website',
};

export default function HomeLayout({ children }: { children: React.ReactNode }) {
  return (
    
      <div className="flex flex-col">
        <Navbar />
        <main className="flex-grow min-h-[100vh]">{children}</main>
        <Footer />
      </div>
   
  );
}
