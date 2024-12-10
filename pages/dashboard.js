import useSWR from 'swr';
import Navbar from '../components/Navbar';
import ProductCard from '../components/ProductCard';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import { useEffect } from 'react';
import Footer from '../components/Footer';

const fetcher = async (url) => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Failed to fetch products');
  }
  return response.json();
};

export default function Dashboard({ initialProducts }) {
  const router = useRouter();
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    }
  }, [status, router]);

  const { data: products, error } = useSWR('/api/items', fetcher, {
    fallbackData: initialProducts,
    revalidateOnFocus: true,
  });

  const handleProductClick = (id) => {
    router.push(`/product/${id}`);
  };

  if (status === 'loading') {
    return (
      <div>
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <h2 className="text-xl">Loading...</h2>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <h2 className="text-xl text-red-500">Error: {error.message}</h2>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold mb-8 text-red-600 font-jomhuria">
          Our Menu
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products?.map((product) => (
            <div
              key={product._id}
              onClick={() => handleProductClick(product._id)}
              className="cursor-pointer"
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export async function getServerSideProps() {
  try {
    const response = await fetch("http://localhost:3000/api/items");
    const initialProducts = await response.json();

    return {
      props: {
        initialProducts,
      },
    };
  } catch (error) {
    console.error('Error fetching products:', error);
    return {
      props: {
        initialProducts: [],
      },
    };
  }
}