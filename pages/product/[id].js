// pages/product/[id].js
import { useRouter } from 'next/router';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

export default function ProductDetails() {
  const router = useRouter();
  const { id } = router.query;

  // Mock product data - replace with actual API call
  const products = [
    {
      id: 1,
      name: 'Burger Deluxe',
      description: 'A juicy beef patty with fresh lettuce, tomatoes, and our special sauce',
      price: 9.99,
      image: '/api/placeholder/500/300',
      ingredients: ['Beef Patty', 'Lettuce', 'Tomatoes', 'Special Sauce', 'Sesame Bun'],
    },
    {
      id: 2,
      name: 'Veggie Burger',
      description: 'A delicious veggie patty with fresh lettuce, tomatoes, and special sauce',
      price: 8.99,
      image: '/api/placeholder/500/300',
      ingredients: ['Veggie Patty', 'Lettuce', 'Tomatoes', 'Special Sauce', 'Sesame Bun'],
    },
    {
      id: 3,
      name: 'Chicken Sandwich',
      description: 'Grilled chicken with fresh lettuce, tomatoes, and mayo',
      price: 7.99,
      image: '/api/placeholder/500/300',
      ingredients: ['Grilled Chicken', 'Lettuce', 'Tomatoes', 'Mayo', 'Bun'],
    },
    {
      id: 4,
      name: 'Fries',
      description: 'Crispy golden fries',
      price: 3.99,
      image: '/api/placeholder/500/300',
      ingredients: ['Potatoes', 'Salt', 'Oil'],
    },
    {
      id: 5,
      name: 'Soda',
      description: 'Refreshing soda',
      price: 1.99,
      image: '/api/placeholder/500/300',
      ingredients: ['Carbonated Water', 'Sugar', 'Flavoring'],
    }
  ];

  const product = products.find(p => p.id === parseInt(id));

  const addToCart = () => {
    // Add to cart logic
    router.push('/cart');
  };

  if (!product) {
    return <div>Product not found</div>;
  }

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
