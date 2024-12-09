// components/ProductCard.js
import Image from 'next/image';
import { useCart } from '../context/CartContext';

const ProductCard = ({ product }) => {
  const { dispatch } = useCart();

  const addToCart = () => {
    dispatch({ type: 'ADD_TO_CART', item: product });
  };

  return (
    <div className="border rounded-lg shadow-md bg-gray-50 p-4 hover:shadow-lg transition-shadow duration-200">
      <div className="relative w-full h-48 mb-4">
        <Image
          src={product.imageUrl}
          alt={product.name}
          layout="fill"
          objectFit="cover"
          className="rounded-md"
        />
      </div>
      <div>
        <h3 className="text-xl font-bold text-gray-800 font-josefin mb-2">
          {product.name}
        </h3>
        <p className="text-gray-600 font-josefin mb-4">{product.description}</p>
        <div className="flex justify-between items-center">
          <span className="text-lg font-semibold text-red-600 font-josefin">
            ${product.price}
          </span>
          <button
            onClick={addToCart}
            className="bg-red-600 text-white px-4 py-2 rounded-full font-josefin font-bold hover:bg-red-700 transition-colors duration-200"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
