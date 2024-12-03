import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { useCart } from '../../context/CartContext';
import { useSession } from "next-auth/react";

export default function ProductDetails() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const { id } = router.query; // Extract `id` from the route
  const { dispatch } = useCart();
  const [product, setProduct] = useState(null); // Product state
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  // Redirect to login if unauthenticated
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  // Fetch product details if authenticated and `id` is available
  useEffect(() => {
    if (status === "authenticated" && id) {
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
    }
  }, [id, status]);

  // Show a loading state while determining authentication or fetching data
  if (status === "loading" || loading) {
    return (
      <div>
        <Navbar />
        <main className="container mx-auto px-4 py-8 text-center">
          <h2 className="text-2xl font-bold text-red-600">Loading...</h2>
        </main>
        <Footer />
      </div>
    );
  }

  // Error or unauthenticated handling
  if (error) {
    return (
      <div>
        <Navbar />
        <main className="container mx-auto px-4 py-8 text-center">
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
        <main className="container mx-auto px-4 py-8 text-center">
          <h2 className="text-xl text-red-600">Product not found</h2>
        </main>
        <Footer />
      </div>
    );
  }

  const addToCart = () => {
    // Add to cart logic
    dispatch({ type: 'ADD_TO_CART', item: product });
    router.push('/cart');
  };

  return (
    <div>
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <img
              src={product.imageUrl}
              alt={product.name}
              className="w-full rounded-lg shadow-lg border-2 border-black-500"
            />
          </div>
          <div>
            <h1 className="text-4xl font-bold text-red-600 mb-4">{product.name}</h1>
            <p className="text-gray-700 text-lg mb-4">{product.description}</p>
            <div className="mb-6">
              <h2 className="text-2xl font-semibold text-red-600 mb-3">Ingredients:</h2>
              <ul className="list-disc list-inside space-y-1 text-gray-700">
                {product.ingredients?.map((ingredient, index) => (
                  <li key={index}>{ingredient}</li>
                ))}
              </ul>
            </div>
            <div className="mb-6">
              <span className="text-3xl font-bold text-red-600">Rs {product.price}/-</span>
            </div>
            <button
              onClick={addToCart}
              className="w-full bg-red-600 text-white py-3 rounded-lg font-bold text-lg hover:bg-red-700"
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
