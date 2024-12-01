import { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import CompletedOrders from '../components/CompletedOrders';
import OngoingOrders from '../components/OngoingOrders';

export default function MyOrders() {
  const [view, setView] = useState('ongoing'); // State to toggle between views

  const handleViewChange = (newView) => {
    setView(newView);
  };

  return (
    <div>
      <Navbar />
      <main className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold text-red-600 mb-6 text-center">My Orders</h1>

        {/* Tabs for toggling between views */}
        <div className="flex justify-center mb-8">
          <button
            onClick={() => handleViewChange('ongoing')}
            className={`px-6 py-2 rounded-t-lg font-semibold ${
              view === 'ongoing' ? 'bg-red-500 text-white' : 'bg-gray-200 text-gray-700'
            }`}
          >
            Ongoing Orders
          </button>
          <button
            onClick={() => handleViewChange('completed')}
            className={`px-6 py-2 rounded-t-lg font-semibold ${
              view === 'completed' ? 'bg-red-500 text-white' : 'bg-gray-200 text-gray-700'
            }`}
          >
            Completed Orders
          </button>
        </div>

        {/* Conditionally render the ongoing or completed orders */}
        <div className="max-w-2xl mx-auto">
          {view === 'ongoing' ? <OngoingOrders /> : <CompletedOrders />}
        </div>
      </main>
      <Footer />
    </div>
  );
}
