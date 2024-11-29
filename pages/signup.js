import { useState } from 'react';
import Navbar from '../components/Navbar';
import { signIn } from 'next-auth/react'; // Import NextAuth's signIn function

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
    <div>
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <form onSubmit={handleSubmit} className="max-w-md mx-auto">
          <h2 className="text-2xl font-bold mb-6">Create an Account</h2>
          <div className="space-y-4">
            {error && (
              <div className="bg-red-500 text-white p-2 rounded-md mb-4">
                {error} {/* Display error message */}
              </div>
            )}
            <div>
              <label className="block text-gray-700 mb-2">Email</label>
              <input
                type="text"
                className="w-full border rounded-lg px-4 py-2"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2">Password</label>
              <input
                type="password"
                className="w-full border rounded-lg px-4 py-2"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2">Confirm Password</label>
              <input
                type="password"
                className="w-full border rounded-lg px-4 py-2"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                required
              />
            </div>
            <button
              type="submit"
              className={`w-full bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
              disabled={loading} // Disable button when loading
            >
              {loading ? 'Signing Up...' : 'Sign Up'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
