import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { useCart } from '../../context/CartContext';
import { useSession, getSession } from "next-auth/react";

export default function ProductDetails({ product, error }) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const { dispatch } = useCart();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  const addToCart = () => {
    
    dispatch({ type: 'ADD_TO_CART', item: product });
    router.push('/cart');
  };

  
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

export async function getServerSideProps(context) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }

  const { id } = context.params;

  try {
    const response = await fetch(`http://localhost:3000/api/items/${id}`);
    if (!response.ok) {
      throw new Error('Failed to fetch product details');
    }
    const product = await response.json();

    return {
      props: {
        product,
      },
    };
  } catch (err) {
    return {
      props: {
        error: err.message,
      },
    };
  }
}
