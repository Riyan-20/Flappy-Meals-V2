// components/ManageProducts.js
import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import Image from 'next/image';
export default function ManageProducts() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name: '',
    description: '',
    price: '',
    imageUrl: ''
  });

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch(`/api/items`);
      const initialProducts = await response.json();
      setProducts(initialProducts);
    };

    if (status === 'loading') return; 
    if (!session) {
      router.push('/');
    } else {
      if (session.user.role === 'admin') {
        fetchProducts();
      } else {
        router.push('/');
      }
    }
  }, [session, status]);

  const handleAddProduct = async (e) => {
    e.preventDefault();

    const product = {
      ...newProduct,
      price: parseFloat(newProduct.price), 
    };

    try {
      const response = await fetch('/api/add-products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(product),
      });

      const data = await response.json();

      if (response.ok) {
        setProducts([...products, data.product]);
        setNewProduct({ name: '', description: '', price: '', image: '' }); 
      } else {
        console.error('Error adding product:', data.message);
      }
    } catch (error) {
      console.error('Error during API call:', error);
    }
  };

  const handleRemoveProduct = async (id) => {
    try {
      const role = session?.user?.role;

      if (!role || role !== 'admin') {
        alert('You are not authorized to delete this product.');
        return;
      }

      const response = await fetch('/api/delete-products', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id, role }),
      });

      const data = await response.json();

      if (response.ok) {
        setProducts(products.filter(product => product._id !== id));
        alert(data.message);
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error('Error deleting product:', error);
      alert('Failed to delete product.');
    }
  };

  return (
    <div>

      <h2 className="text-3xl font-bold text-red-600 mb-6">Add New Product</h2>
      <form onSubmit={handleAddProduct} className="bg-white shadow-lg rounded-lg p-6 mb-10">
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Product Name</label>
          <input
            type="text"
            className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring focus:border-red-500"
            value={newProduct.name}
            onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Description</label>
          <textarea
            className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring focus:border-red-500"
            value={newProduct.description}
            onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Price</label>
          <input
            type="number"
            step="0.01"
            className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring focus:border-red-500"
            value={newProduct.price}
            onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Image URL</label>
          <input
            type="text"
            className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring focus:border-red-500"
            value={newProduct.imageUrl}
            onChange={(e) => setNewProduct({ ...newProduct, imageUrl: e.target.value })}
          />
        </div>
        <button
          type="submit"
          className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition duration-300"
        >
          Add Product
        </button>
      </form>

      <h2 className="text-3xl font-bold text-red-600 mb-6">Product List</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.map((product) => (
          <div
            key={product._id}
            className="bg-white border rounded-lg shadow-lg p-6 flex flex-col justify-between"
          >
            <div>
              <h3 className="text-xl font-semibold text-gray-800">{product.name}</h3>
              <p className="text-gray-600 mt-2">{product.description}</p>
              <p className="text-lg font-bold text-gray-800 mt-4">${product.price.toFixed(2)}</p>
            

<div className="relative w-full h-48 mb-4">
        <Image
          src={product.imageUrl}
          alt={product.name}
          layout="fill"
          // width={80}
          // height={80}
          objectFit="cover"
          className="rounded-md"
        />
      </div>
            </div>
            <button
              className="mt-6 bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition duration-300"
              onClick={() => handleRemoveProduct(product._id)}
            >
              Remove Product
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}