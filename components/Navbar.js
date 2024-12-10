import { useEffect, useState } from 'react';
import Link from 'next/link';
import { signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session) {
      setIsLoggedIn(true);
      if (session.user.role === 'admin') {
        setIsAdmin(true);
      }
    } else {
      setIsLoggedIn(false);
    }
  }, [session]);

  const handleLogout = () => {
    signOut();
  };

  return (
    <nav className="bg-white shadow-none text-[#D91919] py-4">
      <div className="container mx-auto flex justify-between items-center">

        <Link href="/" className="text-4xl font-bold no-underline hover:text-[#A70D0D]" style={{ fontFamily: 'Jomhuria' }}>
          Flappy Meals
        </Link>

        <div className="flex space-x-6 items-center">
          {!isLoggedIn ? (
            <>
              <Link href="/login" className="text-2xl font-bold no-underline hover:text-[#A70D0D]" style={{ fontFamily: 'Jomhuria' }}>
                Login
              </Link>
              <Link
                href="/signup"
                className="text-2xl font-bold no-underline hover:text-[#A70D0D]" style={{ fontFamily: 'Jomhuria' }}
              >
                Sign Up
              </Link>
            </>
          ) : (
            <>
              <Link href="/dashboard" className="text-lg font-semibold hover:text-[#A70D0D] no-underline">
                Menu
              </Link>
              <Link href="/cart" className="text-lg font-semibold hover:text-[#A70D0D] no-underline">
                Cart
              </Link>
              <Link href="/my-orders" className="text-lg font-semibold hover:text-[#A70D0D] no-underline">
                My Orders
              </Link>
              <Link
                onClick={handleLogout}
                href=""
                className="text-lg font-semibold hover:text-[#A70D0D] no-underline"
              >
                Logout
              </Link>
              {isAdmin && (
                <Link href="/admin" className="text-lg font-semibold hover:text-[#A70D0D] no-underline">
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
