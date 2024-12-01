// pages/cart.js
import { useRouter } from 'next/router';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useCart } from '../context/CartContext';

export default function Cart() {
  const router = useRouter();
  const { state, dispatch } = useCart();
  const cartItems = state;

  const updateQuantity = (id, newQuantity) => {
    dispatch({ type: 'UPDATE_QUANTITY', id, quantity: newQuantity });
  };

  const removeItem = (id) => {
    dispatch({ type: 'REMOVE_ITEM', id });
  };

  const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <div>
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">Your Cart</h1>
        {cartItems.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              {cartItems.map((item) => (
                <div key={item.id} className="flex items-center border-b py-4">
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded"
                  />
                  <div className="ml-4 flex-grow">
                    <h3 className="font-semibold">{item.name}</h3>
                    <p className="text-gray-600">${item.price}</p>
                  </div>
                  <div className="flex items-center">
                    <button
                      className="px-2 py-1 border rounded"
                      onClick={() => updateQuantity(item.id, Math.max(0, item.quantity - 1))}
                    >
                      -
                    </button>
                    <span className="mx-2">{item.quantity}</span>
                    <button
                      className="px-2 py-1 border rounded"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    >
                      +
                    </button>
                    <button
                      className="ml-4 text-red-500"
                      onClick={() => removeItem(item.id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div>
              <div className="border rounded-lg p-4 sticky top-4">
                <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Delivery Fee</span>
                    <span>$50.00</span>
                  </div>
                  <div className="flex justify-between font-bold pt-2 border-t">
                    <span>Total</span>
                    <span>${(total + 50).toFixed(2)}</span>
                  </div>
                </div>
                <button
                  onClick={() => router.push('/confirm-order')}
                  className="w-full bg-red-500 text-white py-2 rounded-lg mt-4 hover:bg-red-600"
                >
                  Proceed to Checkout
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-xl text-gray-600">Your cart is empty</p>
            <button
              onClick={() => router.push('/dashboard')}
              className="mt-4 bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600"
            >
              Browse Menu
            </button>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
