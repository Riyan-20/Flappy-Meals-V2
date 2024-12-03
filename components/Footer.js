import Link from 'next/link';
// import { FaFacebookF, FaTwitter, FaLinkedinIn } from 'react-icons/all';

const Footer = () => {
  return (
    
    <footer className="bg-white text-red-600 py-8 shadow-md">
      <div className="container mx-auto px-4">
         {/* Divider */}
         <div className="border-t border-gray-300 mt-8"></div>
        {/* Top Section */}
        <div className="flex flex-col md:flex-row justify-between gap-8">
          {/* Newsletter */}
          <div className="flex-1">
            <h3 className="text-4xl font-bold mb-4" style={{ fontFamily: 'Jomhuria' }}>
              Flappy Meals
            </h3>
            <p className="text-lg font-semibold">Newsletter</p>
            <p className="text-gray-600 mb-4">Subscribe to our newsletter for weekly updates and promotions.</p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Your email address"
                className="border border-red-500 rounded-full px-4 py-2 flex-grow focus:outline-none"
              />
              <button
                className="bg-red-600 text-white font-medium px-4 py-2 rounded-full hover:bg-red-700 transition"
              >
                Subscribe
              </button>
            </div>
          </div>

          {/* Links Section */}
          <div className="flex-1 grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <h4 className="text-2xl font-bold mb-2" style={{ fontFamily: 'Jomhuria' }}>
                Product
              </h4>
              <Link href="#" className="block text-gray-600 hover:text-red-500">
                Features
              </Link>
              <Link href="#" className="block text-gray-600 hover:text-red-500">
                Testimonials
              </Link>
              <Link href="#" className="block text-gray-600 hover:text-red-500">
                Highlights
              </Link>
              <Link href="#" className="block text-gray-600 hover:text-red-500">
                Pricing
              </Link>
              <Link href="#" className="block text-gray-600 hover:text-red-500">
                FAQs
              </Link>
            </div>
            <div>
              <h4 className="text-2xl font-bold mb-2" style={{ fontFamily: 'Jomhuria' }}>
                Company
              </h4>
              <Link href="#" className="block text-gray-600 hover:text-red-500">
                About Us
              </Link>
              <Link href="#" className="block text-gray-600 hover:text-red-500">
                Careers
              </Link>
              <Link href="#" className="block text-gray-600 hover:text-red-500">
                Press
              </Link>
            </div>
            <div>
              <h4 className="text-2xl font-bold mb-2" style={{ fontFamily: 'Jomhuria' }}>
                Legal
              </h4>
              <Link href="#" className="block text-gray-600 hover:text-red-500">
                Terms
              </Link>
              <Link href="#" className="block text-gray-600 hover:text-red-500">
                Privacy
              </Link>
              <Link href="#" className="block text-gray-600 hover:text-red-500">
                Contact
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
