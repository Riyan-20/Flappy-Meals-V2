import { useState } from 'react';
import Navbar from '../components/Navbar';
import { signIn } from 'next-auth/react';
import Footer from '../components/Footer';

export default function SignUp() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [error, setError] = useState(null); 
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);

   
    const response = await signIn('credentials', {
      redirect: false,
      username: formData.email, 
      password: formData.password,
      isSignup: "true", 
    });

    if (response?.error) {
      setError(response.error); 
    } else {
      window.location.href = "/dashboard";
    }

    setLoading(false); 
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="flex items-center justify-center py-12">
        <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">Create an Account</h2>

          {error && (
            <div className="text-red-600 bg-red-100 border border-red-600 text-center rounded-lg p-3 mb-4">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-gray-700 font-medium mb-2">Email</label>
              <input
                type="text"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-600"
                placeholder="Enter your email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">Password</label>
              <input
                type="password"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-600"
                placeholder="Enter your password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">Confirm Password</label>
              <input
                type="password"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-600"
                placeholder="Confirm your password"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                required
              />
            </div>
            <button
              type="submit"
              className={`w-full bg-red-600 text-white font-medium py-2 rounded-lg hover:bg-red-700 transition duration-200 ${
                loading ? 'opacity-50 cursor-not-allowed' : ''
              }`}
              disabled={loading}
            >
              {loading ? 'Signing Up...' : 'Sign Up'}
            </button>
          </form>

          <div className="text-center mt-6">
            <p className="text-gray-600">
              Already have an account?{' '}
              <a href="/login" className="text-red-600 hover:underline">
                Login
              </a>
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
