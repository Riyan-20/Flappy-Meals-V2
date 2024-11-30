// pages/my-orders.js
import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import OrderCard from '../components/OrderCard';
import { useSession } from 'next-auth/react';

export default function MyOrders() {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState(null);
  const {data:session} = useSession(); 

  useEffect(() => {

    if(session.user.name){
    const fetchOrders = async () => {
      try {
        const response = await fetch('/api/CurrentOrderForUser', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ customerId: session.user.name }), // Replace with the actual customerId
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        console.log('Fetched orders:', data); // Log the fetched orders for debugging
        setOrders(data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchOrders();
  }
  }, []);

  return (
    <div>
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">My Orders</h1>
        {error && <p className="text-red-500 mb-4">Error: {error}</p>}
        <div className="max-w-2xl mx-auto">
          {orders.length > 0 ? (
            orders.map((order) => (
              <OrderCard key={order._id} order={order} />
            ))
          ) : (
            <p className="text-xl text-gray-600">No current orders</p>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
