import { useState, useEffect } from 'react';
import OrderCard from './OrderCard';
import { useSession } from 'next-auth/react';

const OngoingOrders = () => {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState(null);
  const { data: session } = useSession();

  useEffect(() => {
    if (session) {
      const fetchOngoingOrders = async () => {
        try {
          const response = await fetch('/api/CurrentOrderForUser', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ customerId: session.user.name }),
          });

          if (!response.ok) {
            throw new Error('Network response was not ok');
          }

          const data = await response.json();
          console.log(data,session.user.name)
       
          const sortedOrders = data.sort((a, b) => {
            const dateA = new Date(`${a.orderDate}T${a.orderTime}`);
            const dateB = new Date(`${b.orderDate}T${b.orderTime}`);
            return dateB - dateA;
          });

          setOrders(sortedOrders);
        } catch (error) {
          setError(error.message);
        }
      };

      fetchOngoingOrders();
    }
  }, [session]);

  return (
    <div>
      {error && (
        <p className="text-red-500 text-lg font-medium mb-6 text-center">
          Error: {error}
        </p>
      )}
      {orders.length > 0 ? (
        orders.map((order) => <OrderCard key={order._id} order={order} />)
      ) : (
        <p className="text-xl text-gray-600 text-center">No ongoing orders</p>
      )}
    </div>
  );
};

export default OngoingOrders;
