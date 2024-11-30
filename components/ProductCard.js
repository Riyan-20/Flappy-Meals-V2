// components/ProductCard.js
import { useCart } from '../context/CartContext';

const ProductCard = ({ product }) => {
  const { dispatch } = useCart();

  const addToCart = () => {
    dispatch({ type: 'ADD_TO_CART', item: product });
  };

  return (
    <div className="border rounded-lg overflow-hidden shadow-lg">
      <img
        src={product.imageUrl}
        alt={product.name}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-xl font-semibold">{product.name}</h3>
        <p className="text-gray-600">{product.description}</p>
        <div className="mt-4 flex justify-between items-center">
          <span className="text-lg font-bold">${product.price}</span>
          <button
            onClick={addToCart}
            className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
