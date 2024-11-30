import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

export default function ProductDetails() {
  const router = useRouter();
  const { id } = router.query; // Extract `id` from the route

  const [product, setProduct] = useState(null); // Product state
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  useEffect(() => {
    // Fetch product details if `id` is available
    if (!id) return;

    const fetchProduct = async () => {
      try {
        const response = await fetch(`/api/items/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch product details');
        }
        const data = await response.json();
        setProduct(data); // Set product data
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]); // Re-run when `id` changes

  const addToCart = () => {
    // Add to cart logic
    router.push('/cart');
  };

  if (loading) {
    return (
      <div>
        <Navbar />
        <main className="container mx-auto px-4 py-8">
          <h2 className="text-xl">Loading product details...</h2>
        </main>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <Navbar />
        <main className="container mx-auto px-4 py-8">
          <h2 className="text-xl text-red-500">Error: {error}</h2>
        </main>
        <Footer />
      </div>
    );
  }

  if (!product) {
    return (
      <div>
        <Navbar />
        <main className="container mx-auto px-4 py-8">
          <h2 className="text-xl">Product not found</h2>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <img
              src={product.imageUrl}
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
                {product.ingredients?.map((ingredient, index) => (
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
