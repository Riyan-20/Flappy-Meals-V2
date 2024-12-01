// components/ViewOrders.js
import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import OrderCard from './OrderCard'; // Assuming you have an OrderCard component

export default function ViewOrders() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('availableOrders');
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async (orderStatus) => {
      try {
        const response = await fetch(`/api/orders?orderStatus=${orderStatus}`);
        const data = await response.json();
        console.log('Fetched orders:', data.orders); // Log the fetched orders for debugging
        setOrders(data.orders);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    if (status === 'loading') return; // Wait until session is loaded
    if (!session) {
      router.push('/');
    } else {
      if (session.user.role === 'admin') {
        fetchOrders(activeTab === 'availableOrders' ? 'Pending' : activeTab === 'ongoingOrders' ? 'InProgress' : 'Completed');
      } else {
        router.push('/');
      }
    }
  }, [session, status, activeTab]);

  const handleChangeOrderStatus = async (orderId, newStatus) => {
    try {
      console.log('Updating order status:', { orderId, newStatus });
      const response = await fetch('/api/updateOrderStatus', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ orderId, orderStatus: newStatus }),
      });

      const data = await response.json();
      console.log('Response:', data);

      if (response.ok) {
        setOrders(orders.map(order => order._id === orderId ? { ...order, orderStatus: newStatus } : order));
        alert(data.message);
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error('Error updating order status:', error);
      alert('Failed to update order status.');
    }
  };

  return (
    <div>
      <div className="mb-8">
        <ul className="flex space-x-4">
          <li
            className={`cursor-pointer ${activeTab === 'availableOrders' ? 'font-bold' : ''}`}
            onClick={() => setActiveTab('availableOrders')}
          >
            Available Orders
          </li>
          <li
            className={`cursor-pointer ${activeTab === 'ongoingOrders' ? 'font-bold' : ''}`}
            onClick={() => setActiveTab('ongoingOrders')}
          >
            Ongoing Orders
          </li>
          <li
            className={`cursor-pointer ${activeTab === 'completedOrders' ? 'font-bold' : ''}`}
            onClick={() => setActiveTab('completedOrders')}
          >
            Completed Orders
          </li>
        </ul>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {orders.map(order => (
          <div key={order._id} className="border rounded-lg p-4">
            <h3 className="text-xl font-semibold">Order #{order.orderId}</h3>
            <p className="text-gray-600">Status: {order.orderStatus}</p>
            <p className="text-gray-600">Date: {order.orderDate}</p>
            <div className="space-y-2">
              {order.items.map((item, index) => (
                <div key={index} className="flex justify-between">
                  <span>{item.itemName} x {item.quantity}</span>
                  <span>${item.pricePerItem ? item.pricePerItem.toFixed(2) : 'N/A'}</span>
                </div>
              ))}
            </div>
            <p className="text-lg font-bold mt-4">Total: ${order.totalPrice.toFixed(2)}</p>
            {activeTab !== 'completedOrders' && (
              <div className="mt-4">
                {activeTab === 'availableOrders' && (
                  <button
                    className="bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 mr-2"
                    onClick={() => handleChangeOrderStatus(order._id, 'InProgress')}
                  >
                    Mark as In Progress
                  </button>
                )}
                {activeTab === 'ongoingOrders' && (
                  <button
                    className="bg-green-500 text-white py-2 rounded-lg hover:bg-green-600"
                    onClick={() => handleChangeOrderStatus(order._id, 'Completed')}
                  >
                    Mark as Completed
                  </button>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
