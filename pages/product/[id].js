import { useRouter } from 'next/router';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

export default function ProductDetails({ product }) {
  const router = useRouter();

  if (router.isFallback) {
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

  const addToCart = () => {
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
              className="w-full rounded-lg shadow-lg"
            />
          </div>
          <div>
            <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
            <p className="text-gray-600 mb-4">{product.description}</p>
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

export async function getStaticPaths() {
  const res = await fetch(`http://localhost:3000/api/items`);
  const products = await res.json();

  const paths = products.map((product) => ({
    params: { id: product._id },
  }));

  return { paths, fallback: true };
}

export async function getStaticProps({ params }) {
  const res = await fetch(`http://localhost:3000/api/items/${params.id}`);
  const product = await res.json();

  if (!product) {
    return { notFound: true };
  }

  return {
    props: { product },
    revalidate: 360, // Revalidate every 10 seconds
  };
}
