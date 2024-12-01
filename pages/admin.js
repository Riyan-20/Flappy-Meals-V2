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
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
        <div className="mb-8">
          <ul className="flex space-x-4">
            <li
              className={`cursor-pointer ${activeTab === 'manageProducts' ? 'font-bold' : ''}`}
              onClick={() => setActiveTab('manageProducts')}
            >
              Manage Products
            </li>
            <li
              className={`cursor-pointer ${activeTab === 'viewOrders' ? 'font-bold' : ''}`}
              onClick={() => setActiveTab('viewOrders')}
            >
              View Orders
            </li>
          </ul>
        </div>
        {activeTab === 'manageProducts' && <ManageProducts />}
        {activeTab === 'viewOrders' && <ViewOrders />}
      </main>
      <Footer />
    </div>
  );
}
