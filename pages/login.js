import { useState } from 'react';
import { signIn, useSession } from 'next-auth/react'; // Import signIn from next-auth
import { useRouter } from 'next/router'; // Import useRouter for redirection
import Navbar from '../components/Navbar';

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
    <div>
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <form onSubmit={handleSubmit} className="max-w-md mx-auto">
          <h2 className="text-2xl font-bold mb-6">Login</h2>

          {/* Display error message if any */}
          {error && <div className="text-red-500 mb-4">{error}</div>}

          <div className="space-y-4">
            <div>
              <label className="block text-gray-700 mb-2">Email</label>
              <input
                type="text"
                className="w-full border rounded-lg px-4 py-2"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2">Password</label>
              <input
                type="password"
                className="w-full border rounded-lg px-4 py-2"
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
              />
            </div>
            <button
              type="submit"
              className="w-full bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600"
              disabled={isLoading} // Disable button while loading
            >
              {isLoading ? 'Logging in...' : 'Login'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
