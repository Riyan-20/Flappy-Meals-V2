// components/ManageProducts.js
import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

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

    if (status === 'loading') return; // Wait until session is loaded
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
      price: parseFloat(newProduct.price), // Ensure price is a number
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
        setNewProduct({ name: '', description: '', price: '', image: '' }); // Reset input fields
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
      <h2 className="text-xl font-semibold mb-4">Add New Product</h2>
      <form onSubmit={handleAddProduct} className="space-y-4 mb-8">
        <div>
          <label className="block text-gray-700 mb-2">Product Name</label>
          <input
            type="text"
            className="w-full border rounded-lg px-4 py-2"
            value={newProduct.name}
            onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
          />
        </div>
        <div>
          <label className="block text-gray-700 mb-2">Description</label>
          <textarea
            className="w-full border rounded-lg px-4 py-2"
            value={newProduct.description}
            onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
          />
        </div>
        <div>
          <label className="block text-gray-700 mb-2">Price</label>
          <input
            type="number"
            step="0.01"
            className="w-full border rounded-lg px-4 py-2"
            value={newProduct.price}
            onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
          />
        </div>
        <div>
          <label className="block text-gray-700 mb-2">Image URL</label>
          <input
            type="text"
            className="w-full border rounded-lg px-4 py-2"
            value={newProduct.imageUrl}
            onChange={(e) => setNewProduct({ ...newProduct, imageUrl: e.target.value })}
          />
        </div>
        <button
          type="submit"
          className="w-full bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600"
        >
          Add Product
        </button>
      </form>
      <h2 className="text-xl font-semibold mb-4">Product List</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map(product => (
          <div key={product._id} className="border rounded-lg p-4">
            <h3 className="text-xl font-semibold">{product.name}</h3>
            <p className="text-gray-600">{product.description}</p>
            <p className="text-lg font-bold">${product.price}</p>
            <img
              src={product.imageUrl}
              alt={product.name}
              className="w-full h-48 object-cover mt-4 rounded-lg"
            />
            <button
              className="mt-4 bg-red-500 text-white py-2 rounded-lg hover:bg-red-600"
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
