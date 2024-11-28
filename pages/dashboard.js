// File: pages/dashboard.js
import Navbar from '../components/Navbar';
import ProductCard from '../components/ProductCard';

export default function Dashboard() {
  const products = [
    {
      id: 1,
      name: 'Burger Deluxe',
      description: 'Juicy beef patty with fresh vegetables',
      price: 9.99,
      image: '/api/placeholder/300/200'
    },
    // Add more products
  ];

  return (
    <div>
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold mb-6">Our Menu</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}