// pages/confirm-order.js
import { useState } from 'react';
import { useRouter } from 'next/router';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function ConfirmOrder() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    address: '',
    phone: '',
    paymentMethod: 'card',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Process order
    router.push('/my-orders');
  };

  return (
    <div>
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">Confirm Your Order</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-xl font-semibold mb-4">Delivery Details</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-gray-700 mb-2">Delivery Address</label>
                <textarea
                  className="w-full border rounded-lg px-4 py-2"
                  rows="3"
                  value={formData.address}
                  onChange={(e) => setFormData({...formData, address: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Phone Number</label>
                <input
                  type="tel"
                  className="w-full border rounded-lg px-4 py-2"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Payment Method</label>
                <select
                  className="w-full border rounded-lg px-4 py-2"
                  value={formData.paymentMethod}
                  onChange={(e) => setFormData({...formData, paymentMethod: e.target.value})}
                >
                  <option value="card">Credit Card</option>
                  <option value="cash">Cash on Delivery</option>
                </select>
              </div>
              <button
                type="submit"
                className="w-full bg-orange-500 text-white py-3 rounded-lg hover:bg-orange-600"
              >
                Place Order
              </button>
            </form>
          </div>
          <div>
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
            {/* Add order summary component here */}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}