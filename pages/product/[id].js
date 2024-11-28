// pages/product/[id].js
import { useRouter } from 'next/router';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

export default function ProductDetails() {
  const router = useRouter();
  const { id } = router.query;

  // Mock product data - replace with actual API call
  const product = {
    id: id,
    name: 'Burger Deluxe',
    description: 'A juicy beef patty with fresh lettuce, tomatoes, and our special sauce',
    price: 9.99,
    image: '/api/placeholder/500/300',
    ingredients: ['Beef Patty', 'Lettuce', 'Tomatoes', 'Special Sauce', 'Sesame Bun'],
  };

  const addToCart = () => {
    // Add to cart logic
    router.push('/cart');
  };

  return (
    <div>
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <img
              src={product.image}
              alt={product.name}
              className="w-full rounded-lg shadow-lg"
            />
          </div>
          <div>
            <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
            <p className="text-gray-600 mb-4">{product.description}</p>
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-2">Ingredients:</h2>
              <ul className="list-disc list-inside">
                {product.ingredients.map((ingredient, index) => (
                  <li key={index}>{ingredient}</li>
                ))}
              </ul>
            </div>
            <div className="mb-6">
              <span className="text-2xl font-bold">${product.price}</span>
            </div>
            <button
              onClick={addToCart}
              className="w-full bg-orange-500 text-white py-3 rounded-lg hover:bg-orange-600"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}