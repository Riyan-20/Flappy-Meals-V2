// File: src/components/ProductCard.js
const ProductCard = ({ product }) => {
    return (
      <div className="border rounded-lg overflow-hidden shadow-lg">
        <img
          src={product.image || "/api/placeholder/300/200"}
          alt={product.name}
          className="w-full h-48 object-cover"
        />
        <div className="p-4">
          <h3 className="text-xl font-semibold">{product.name}</h3>
          <p className="text-gray-600">{product.description}</p>
          <div className="mt-4 flex justify-between items-center">
            <span className="text-lg font-bold">${product.price}</span>
            <button className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600">
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    );
  };
  
  export default ProductCard;