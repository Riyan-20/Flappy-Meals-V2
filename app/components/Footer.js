// components/Footer.js
const Footer = () => {
    return (
      <footer className="bg-orange-500 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Flappy Meals</h3>
              <p>Delicious food delivered to your doorstep</p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Contact</h3>
              <p>Email: support@flappymeals.com</p>
              <p>Phone: (555) 123-4567</p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Hours</h3>
              <p>Mon-Sun: 10:00 AM - 10:00 PM</p>
            </div>
          </div>
          <div className="mt-8 text-center">
            <p>© 2024 Flappy Meals. All rights reserved.</p>
          </div>
        </div>
      </footer>
    );
  };
  
  export default Footer;