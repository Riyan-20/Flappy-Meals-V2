// pages/admin.js
import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import ManageProducts from '../components/ManageProducts';
import ViewOrders from '../components/ViewOrders';

export default function Admin() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('manageProducts');

  useEffect(() => {
    if (status === 'loading') return; // Wait until session is loaded
    if (!session) {
      router.push('/');
    } else {
      if (session.user.role === 'admin') {
        // Do nothing, admin is already on the page
      } else {
        router.push('/');
      }
    }
  }, [session, status]);

  return (
    <div>
      <Navbar />
      <main className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold text-red-600 text-center mb-10">
          Admin Dashboard
        </h1>
        
        {/* Tab Navigation */}
        <div className="flex justify-center mb-10 border-b-2">
          <button
            className={`px-6 py-2 font-semibold rounded-t-lg transition-colors duration-200 ${
              activeTab === 'manageProducts'
                ? 'bg-red-500 text-white'
                : 'bg-gray-200 text-gray-700'
            }`}
            onClick={() => setActiveTab('manageProducts')}
          >
            Manage Products
          </button>
          <button
            className={`px-6 py-2 font-semibold rounded-t-lg transition-colors duration-200 ${
              activeTab === 'viewOrders'
                ? 'bg-red-500 text-white'
                : 'bg-gray-200 text-gray-700'
            }`}
            onClick={() => setActiveTab('viewOrders')}
          >
            View Orders
          </button>
        </div>

        {/* Tab Content */}
        <div className="bg-white rounded-lg shadow-lg p-6 max-w-5xl mx-auto">
          {activeTab === 'manageProducts' && <ManageProducts />}
          {activeTab === 'viewOrders' && <ViewOrders />}
        </div>
      </main>
      <Footer />
    </div>
  );
}