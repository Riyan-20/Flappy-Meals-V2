// File: pages/index.js
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Hero from '../components/Hero';

export default function Home() {
  return (
    <div>
      <Navbar />
      <main>
        <Hero />
      </main>
      <Footer />
    </div>
  );
}
