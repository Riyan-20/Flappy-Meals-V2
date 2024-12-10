import { useState, useEffect } from 'react';
import OrderCard from './OrderCard';
import { useSession } from 'next-auth/react';

const CompletedOrders = () => {
  const [completedOrders, setCompletedOrders] = useState([]);
  const [error, setError] = useState(null);
  const { data: session } = useSession();

  useEffect(() => {
    if (session) {
      const fetchCompletedOrders = async () => {
        try {
          const response = await fetch('/api/completedOrders', {
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
          setCompletedOrders(data);
        } catch (error) {
          setError(error.message);
        }
      };

      fetchCompletedOrders();
    }
  }, [session]);

  return (
    <div>
      {error && (
        <p className="text-red-500 text-lg font-medium mb-6 text-center">
          Error: {error}
        </p>
      )}
      {completedOrders.length > 0 ? (
        completedOrders.map((order) => <OrderCard key={order._id} order={order} />)
      ) : (
        <p className="text-xl text-gray-600 text-center">No completed orders</p>
      )}
    </div>
  );
};

export default CompletedOrders;
