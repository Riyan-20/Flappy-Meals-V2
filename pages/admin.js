// pages/admin.js
import { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function Admin() {
  const [activeTab, setActiveTab] = useState('manageProducts');
  const [products, setProducts] = useState([
    {
      id: 1,
      name: 'Burger Deluxe',
      description: 'Juicy beef patty with fresh vegetables',
      price: 9.99,
      image: '/api/placeholder/300/200'
    },
    // Add more products
  ]);

  const [newProduct, setNewProduct] = useState({
    name: '',
    description: '',
    price: '',
    image: ''
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

  const handleAddProduct = (e) => {
    e.preventDefault();
    const product = {
      id: products.length + 1,
      ...newProduct,
      price: parseFloat(newProduct.price)
    };
    setProducts([...products, product]);
    setNewProduct({ name: '', description: '', price: '', image: '' });
  };

  const handleRemoveProduct = (id) => {
    setProducts(products.filter(product => product.id !== id));
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
              className={`cursor-pointer ${activeTab === 'manageUsers' ? 'font-bold' : ''}`}
              onClick={() => setActiveTab('manageUsers')}
            >
              Manage Users
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
                  onChange={(e) => setNewProduct({...newProduct, image: e.target.value})}
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
                <div key={product.id} className="border rounded-lg p-4">
                  <h3 className="text-xl font-semibold">{product.name}</h3>
                  <p className="text-gray-600">{product.description}</p>
                  <p className="text-lg font-bold">${product.price}</p>
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-48 object-cover mt-4 rounded-lg"
                  />
                  <button
                    className="mt-4 bg-red-500 text-white py-2 rounded-lg hover:bg-red-600"
                    onClick={() => handleRemoveProduct(product.id)}
                  >
                    Remove Product
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
        {activeTab === 'manageUsers' && (
          <div>
            <h2 className="text-xl font-semibold mb-4">Add New User</h2>
            <form onSubmit={handleAddUser} className="space-y-4 mb-8">
              <div>
                <label className="block text-gray-700 mb-2">Name</label>
                <input
                  type="text"
                  className="w-full border rounded-lg px-4 py-2"
                  value={newUser.name}
                  onChange={(e) => setNewUser({...newUser, name: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  className="w-full border rounded-lg px-4 py-2"
                  value={newUser.email}
                  onChange={(e) => setNewUser({...newUser, email: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Role</label>
                <select
                  className="w-full border rounded-lg px-4 py-2"
                  value={newUser.role}
                  onChange={(e) => setNewUser({...newUser, role: e.target.value})}
                >
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
              <button
                type="submit"
                className="w-full bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600"
              >
                Add User
              </button>
            </form>
            <h2 className="text-xl font-semibold mb-4">User List</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {users.map(user => (
                <div key={user.id} className="border rounded-lg p-4">
                  <h3 className="text-xl font-semibold">{user.name}</h3>
                  <p className="text-gray-600">{user.email}</p>
                  <p className="text-lg font-bold">{user.role}</p>
                  <button
                    className="mt-4 bg-red-500 text-white py-2 rounded-lg hover:bg-red-600"
                    onClick={() => handleRemoveUser(user.id)}
                  >
                    Remove User
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
