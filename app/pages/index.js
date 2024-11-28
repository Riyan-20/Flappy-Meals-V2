// File: pages/index.js
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Link from 'next/link';

export default function Home() {
  return (
    <div>
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Welcome to Flappy Meals</h1>
          <p className="text-xl text-gray-600 mb-8">Delicious food delivered to your doorstep</p>
          <Link 
            href="/dashboard" 
            className="bg-orange-500 text-white px-8 py-3 rounded-lg text-lg hover:bg-orange-600"
          >
            Order Now
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}