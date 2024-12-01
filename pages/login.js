import { useState } from 'react';
import { signIn, useSession } from 'next-auth/react'; // Import signIn from next-auth
import { useRouter } from 'next/router'; // Import useRouter for redirection
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const {data:session} = useSession();

  const [error, setError] = useState(''); // To hold error message
  const [isLoading, setIsLoading] = useState(false); // To handle loading state
  const router = useRouter(); // To redirect the user after login

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(''); // Reset error before new login attempt

    // Attempt login with NextAuth's signIn method
    const res = await signIn('credentials', {
      redirect: false, // Disable redirect after login
      username: formData.email,
      password: formData.password,
      isSignup : false ,
    });

    setIsLoading(false); // Set loading state to false after request

    if (res?.error) {
      setError('Invalid email or password'); // Show error if login fails
    } else {
        router.push('/dashboard'); // Redirect to dashboard on successful login
    }
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="flex items-center justify-center py-12">
        <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">Login</h2>

          {/* Display error message if any */}
          {error && <div className="text-red-500 text-center mb-4">{error}</div>}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-gray-700 font-medium mb-2">Email</label>
              <input
                type="text"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                placeholder="Enter your email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">Password</label>
              <input
                type="password"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                placeholder="Enter your password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              />
            </div>
            <button
              type="submit"
              className="w-full bg-red-500 text-white font-medium py-2 rounded-lg hover:bg-red-600 transition duration-200"
              disabled={isLoading} // Disable button while loading
            >
              {isLoading ? 'Logging in...' : 'Login'}
            </button>
          </form>

          <div className="text-center mt-6">
            <p className="text-gray-600">
              Don't have an account?{' '}
              <a href="/signup" className="text-red-500 hover:underline">
                Sign up
              </a>
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}