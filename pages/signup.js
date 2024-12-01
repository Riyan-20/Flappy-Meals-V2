import { useState } from 'react';
import Navbar from '../components/Navbar';
import { signIn } from 'next-auth/react'; // Import NextAuth's signIn function
import Footer from '../components/Footer';

export default function SignUp() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [error, setError] = useState(null); // State for error handling
  const [loading, setLoading] = useState(false); // Loading state for the button

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if password and confirm password match
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true); // Set loading to true while submitting

    // Call NextAuth's signIn function with credentials
    const response = await signIn('credentials', {
      redirect: false, // Don't redirect automatically
      username: formData.email, // Use email as the username
      password: formData.password,
      isSignup: "true", // Indicate it's a signup request
    });

    if (response?.error) {
      setError(response.error); // Display the error message from NextAuth
    } else {
      // Redirect to the dashboard or another page on successful signup
      window.location.href = "/dashboard";
    }

    setLoading(false); // Set loading to false after submission
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="flex items-center justify-center py-12">
        <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">Create an Account</h2>

          {/* Display error message if any */}
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
              disabled={loading} // Disable button when loading
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
