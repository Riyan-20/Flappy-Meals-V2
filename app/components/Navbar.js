// File: src/components/Navbar.js
import { useState } from 'react';
import Link from 'next/link';

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  return (
    <nav className="bg-orange-500 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-white">
          Flappy Meals
        </Link>
        <div className="flex space-x-4">
          {!isLoggedIn ? (
            <>
              <Link href="/login" className="text-white hover:text-orange-200">
                Login
              </Link>
              <Link href="/signup" className="text-white hover:text-orange-200">
                Sign Up
              </Link>
            </>
          ) : (
            <>
              <Link href="/dashboard" className="text-white hover:text-orange-200">
                Menu
              </Link>
              <Link href="/cart" className="text-white hover:text-orange-200">
                Cart
              </Link>
              <Link href="/my-orders" className="text-white hover:text-orange-200">
                My Orders
              </Link>
              {isAdmin && (
                <Link href="/admin" className="text-white hover:text-orange-200">
                  Admin
                </Link>
              )}
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;