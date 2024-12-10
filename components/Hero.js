import Image from 'next/image';
import { useRouter } from 'next/router';
import VectorImage from '../public/Vector.png';

const Hero = () => {
  const router = useRouter();

  const navigateToOrder = () => {
    router.push('/login');
  };

  return (
    <section className="bg-white relative">
      <div className="container mx-auto px-4 py-16 flex flex-col md:flex-row items-center justify-between">
        
        <div className="flex-1 max-w-lg text-center md:text-left mb-10 md:mb-0 animate__animated animate__slideInLeft">
          <div>
            <button className="bg-red-600 text-white px-4 py-2 rounded-full font-medium tracking-wider hover:bg-red-700 transition mb-4">
              SUPER FAST DELIVERY
            </button>
          </div>
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Food Delivery</h1>
          <h1 className="text-4xl font-bold text-gray-800">
            Within <span className="text-red-600">10 minutes</span>
          </h1>
          <p className="text-gray-600 text-lg mt-4">
            FAST 1st In-campus Food Delivery System. Drinks, Food & much more.
          </p>
          <div className="mt-6">
            <button
              onClick={navigateToOrder}
              className="bg-red-600 text-white px-6 py-2 rounded-full mr-4 font-medium hover:bg-red-700 transition"
            >
              Order Now
            </button>
          </div>
        </div>
       
        <div className="flex-1 text-center md:text-right">
          <Image src={VectorImage} alt="Delivery" width={500} height={500} />
        </div>
      </div>
    </section>
  );
};

export default Hero;
