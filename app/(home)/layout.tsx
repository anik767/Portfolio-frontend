// app/layout.tsx
import Navbar from '../component/nav/page';
import Footer from '../component/footer/page';
import '../global.css' 

export const metadata = {
  title: 'My Website',
  description: 'Welcome to my website',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    
      <main>
        <Navbar />
        <main className='min-h-screen '>{children}</main>
        <Footer />
        </main>
  );
}
