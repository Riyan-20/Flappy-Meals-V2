// pages/my-orders.js
import { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import OrderCard from '../components/OrderCard';

export default function MyOrders() {
  const [orders] = useState([
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

  return (
    <div>
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">My Orders</h1>
        <div className="max-w-2xl mx-auto">
          {orders.map((order) => (
            <OrderCard key={order.id} order={order} />
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}