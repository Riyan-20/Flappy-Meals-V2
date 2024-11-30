// pages/dashboard.js
import Navbar from '../components/Navbar';
import ProductCard from '../components/ProductCard';
import { useRouter } from 'next/router';

export default function Dashboard() {
  const router = useRouter();

  const products = [
    {
      id: 1,
      name: 'Burger Deluxe',
      description: 'Juicy beef patty with fresh vegetables',
      price: 9.99,
      image: '/api/placeholder/300/200'
    },
    {
      id: 2,
      name: 'Veggie Burger',
      description: 'A delicious veggie patty with fresh lettuce, tomatoes, and special sauce',
      price: 8.99,
      image: '/api/placeholder/300/200'
    },
    {
      id: 3,
      name: 'Chicken Sandwich',
      description: 'Grilled chicken with fresh lettuce, tomatoes, and mayo',
      price: 7.99,
      image: '/api/placeholder/300/200'
    },
    {
      id: 4,
      name: 'Fries',
      description: 'Crispy golden fries',
      price: 3.99,
      image: '/api/placeholder/300/200'
    },
    {
      id: 5,
      name: 'Soda',
      description: 'Refreshing soda',
      price: 1.99,
      image: '/api/placeholder/300/200'
    }
  ];

  const handleProductClick = (id) => {
    router.push(`/product/${id}`);
  };

  return (
    <div>
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold mb-6">Our Menu</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map(product => (
            <div key={product.id} onClick={() => handleProductClick(product.id)} className="cursor-pointer">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
