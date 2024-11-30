// pages/confirm-order.js
import { useState } from 'react';
import { useRouter } from 'next/router';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useCart } from '../context/CartContext';

export default function ConfirmOrder() {
  const router = useRouter();
  const { state: cartItems, dispatch } = useCart();
  const [formData, setFormData] = useState({
    pickupLocation: '',
    deliveryLocation: '',
    phone: '',
    specialInstructions: '',
    paymentMethod: 'card',
  });

  const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/saveOrder', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          customerId: '21L1790', // Replace with actual customerId
          items: cartItems.map(item => ({
            id: item.id,
            name: item.name,
            quantity: item.quantity,
            price: item.price,
            image: item.image,
          })),
          totalPrice: total + 50,
          orderStatus: 'Pending',
          pickupLocation: formData.pickupLocation,
          destinationLocation: formData.deliveryLocation,
          specialInstructions: formData.specialInstructions,
          customerContact: formData.phone,
          orderId: `179${Math.floor(100000 + Math.random() * 900000)}`,
          orderDate: new Date().toISOString().split('T')[0],
          orderTime: new Date().toTimeString().split(' ')[0],
        }),
      });

      if (response.ok) {
        // Clear the cart and redirect to my-orders page
        dispatch({ type: 'CLEAR_CART' });
        localStorage.removeItem('cartItems');
        router.push('/my-orders');
      } else {
        const errorData = await response.json();
        console.error('Error saving order:', errorData);
      }
    } catch (error) {
      console.error('Error saving order:', error);
    }
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
                <label className="block text-gray-700 mb-2">Pickup Location</label>
                <input
                  type="text"
                  className="w-full border rounded-lg px-4 py-2"
                  value={formData.pickupLocation}
                  onChange={(e) => setFormData({ ...formData, pickupLocation: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Delivery Location</label>
                <input
                  type="text"
                  className="w-full border rounded-lg px-4 py-2"
                  value={formData.deliveryLocation}
                  onChange={(e) => setFormData({ ...formData, deliveryLocation: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Phone Number</label>
                <input
                  type="tel"
                  className="w-full border rounded-lg px-4 py-2"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Special Instructions</label>
                <textarea
                  className="w-full border rounded-lg px-4 py-2"
                  rows="3"
                  value={formData.specialInstructions}
                  onChange={(e) => setFormData({ ...formData, specialInstructions: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Payment Method</label>
                <select
                  className="w-full border rounded-lg px-4 py-2"
                  value={formData.paymentMethod}
                  onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value })}
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
            <div className="space-y-2">
              {cartItems.map((item) => (
                <div key={item.id} className="flex justify-between">
                  <span>{item.name} x {item.quantity}</span>
                  <span>${item.price.toFixed(2)}</span>
                </div>
              ))}
              <div className="flex justify-between font-bold pt-2 border-t">
                <span>Subtotal</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-bold">
                <span>Delivery Fee</span>
                <span>$50.00</span>
              </div>
              <div className="flex justify-between font-bold">
                <span>Total</span>
                <span>${(total + 50).toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
