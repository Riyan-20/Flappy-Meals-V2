// pages/admin.js
import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useSession } from 'next-auth/react';
import Router, { useRouter } from 'next/router';

export default function Admin() {
  const { data: session, status } = useSession();  // status gives loading state

  const [activeTab, setActiveTab] = useState('manageProducts');
  const [products, setProducts] = useState([
    // Add more products
  ]);


  const router = useRouter();

  const fetchProducts = async () => {
    const response = await fetch(`/api/items`);
    const initialProducts = await response.json();

    setProducts(initialProducts); 
  }


  const checkSession = async () => {
    // await console.log(data); 
  }
  useEffect(() => {
    // Ensure session is available before proceeding
    if (status === 'loading') return; // Wait until session is loaded
    if (!session) {
      // Redirect to login if no session
      router.push('/');
    } else {
      if(session.user.role === 'admin'){
      fetchProducts();
      }else{
        router.push('/')
      }
    }
  }, [session, status]);  // Trigger when session or status changes


  const [newProduct, setNewProduct] = useState({
    _id : '',
    name: '',
    description: '',
    price: '',
    imageUrl: ''
  });

  const [users, setUsers] = useState([
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'user' },
    // Add more users
  ]);

  const [orders, setOrders] = useState([
    {
      id: '1001',
      status: 'completed',
      date: '2024-03-20',
      items: [
        { name: 'Burger Deluxe', quantity: 2, price: 9.99 },
        { name: 'Fries', quantity: 1, price: 3.99 }
      ],
      total: 23.97
    },
    // Add more orders
  ]);
  const handleAddProduct = async (e) => {
    e.preventDefault();
  
    const product = {
      // _id: products._id + 1, // Automatically calculate the ID
      ...newProduct,
      price: parseFloat(newProduct.price), // Ensure price is a number
    };
  
    console.log(product);
    try {
      // Make API call to add the product
      const response = await fetch('/api/add-products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(product),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        // Update local state with the new product
        setProducts([...products, data.product]);
        setNewProduct({ name: '', description: '', price: '', image: '' }); // Reset input fields
        console.log('Product added successfully:', data.product);
      } else {
        console.error('Error adding product:', data.message);
      }
    } catch (error) {
      console.error('Error during API call:', error);
    }
  };
  

  const handleRemoveProduct = async (id) => {
    try {
      // Fetch the role from the session
      const role = session?.user?.role;
  
      if (!role || role !== 'admin') {
        alert('You are not authorized to delete this product.');
        return;
      }
  
      // Call the delete-product API
      const response = await fetch('/api/delete-products', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id, role }),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        // If the product was successfully deleted, update the local state
        setProducts(products.filter(product => product._id !== id));
        alert(data.message);
      } else {
        // Handle any errors returned by the API
        alert(data.message);
      }
    } catch (error) {
      console.error('Error deleting product:', error);
      alert('Failed to delete product.');
    }
  };
  

  const handleAddUser = (e) => {
    e.preventDefault();
    const user = {
      id: users.length + 1,
      name: newUser.name,
      email: newUser.email,
      role: newUser.role
    };
    setUsers([...users, user]);
    setNewUser({ name: '', email: '', role: 'user' });
  };

  const handleRemoveUser = (id) => {
    setUsers(users.filter(user => user.id !== id));
  };

  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    role: 'user'
  });

if(session){
  if(session.user.role === 'admin'){
  return (
    <div>
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
        <div className="mb-8">
          <ul className="flex space-x-4">
            <li
              className={`cursor-pointer ${activeTab === 'manageProducts' ? 'font-bold' : ''}`}
              onClick={() => setActiveTab('manageProducts')}
            >
              Manage Products
            </li>
            <li
              className={`cursor-pointer ${activeTab === 'viewOrders' ? 'font-bold' : ''}`}
              onClick={() => setActiveTab('viewOrders')}
            >
              View Orders
            </li>
          </ul>
        </div>
        {activeTab === 'manageProducts' && (
          <div>
            <h2 className="text-xl font-semibold mb-4">Add New Product</h2>
            <form onSubmit={handleAddProduct} className="space-y-4 mb-8">
              <div>
                <label className="block text-gray-700 mb-2">Product Name</label>
                <input
                  type="text"
                  className="w-full border rounded-lg px-4 py-2"
                  value={newProduct.name}
                  onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Description</label>
                <textarea
                  className="w-full border rounded-lg px-4 py-2"
                  value={newProduct.description}
                  onChange={(e) => setNewProduct({...newProduct, description: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Price</label>
                <input
                  type="number"
                  step="0.01"
                  className="w-full border rounded-lg px-4 py-2"
                  value={newProduct.price}
                  onChange={(e) => setNewProduct({...newProduct, price: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Image URL</label>
                <input
                  type="text"
                  className="w-full border rounded-lg px-4 py-2"
                  value={newProduct.image}
                  onChange={(e) => setNewProduct({...newProduct, imageUrl: e.target.value})}
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
        )}

        {activeTab === 'viewOrders' && (
          <div>
            <h2 className="text-xl font-semibold mb-4">Order List</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {orders.map(order => (
                <div key={order.id} className="border rounded-lg p-4">
                  <h3 className="text-xl font-semibold">Order #{order.id}</h3>
                  <p className="text-gray-600">Status: {order.status}</p>
                  <p className="text-gray-600">Date: {order.date}</p>
                  <div className="space-y-2">
                    {order.items.map((item, index) => (
                      <div key={index} className="flex justify-between">
                        <span>{item.name} x {item.quantity}</span>
                        <span>${item.price.toFixed(2)}</span>
                      </div>
                    ))}
                  </div>
                  <p className="text-lg font-bold mt-4">Total: ${order.total.toFixed(2)}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
}
}
