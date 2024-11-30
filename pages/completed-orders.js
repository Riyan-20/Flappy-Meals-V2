// pages/completed-orders.js
import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import OrderCard from '../components/OrderCard';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function CompletedOrders() {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState(null);
  const {data:session} = useSession(); 
  const router = useRouter(); 

  useEffect(() => {

    if(session){
    const fetchOrders = async () => {
      try {
        const response = await fetch(`/api/completedOrders?customerId=${session.user.name}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        setOrders(data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchOrders();
  }else{
      router.push('/login');
  }

  }, []);

  if(session){
  return (
    <div>
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">Completed Orders</h1>
        {error && <p className="text-red-500 mb-4">Error: {error}</p>}
        <div className="max-w-2xl mx-auto">
          {orders.length > 0 ? (
            orders.map((order) => (
              <OrderCard key={order._id} order={order} />
            ))
          ) : (
            <p className="text-xl text-gray-600">No completed orders</p>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
}
