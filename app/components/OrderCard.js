// components/OrderCard.js
const OrderCard = ({ order }) => {
    return (
      <div className="border rounded-lg p-4 mb-4 shadow-md">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Order #{order.id}</h3>
          <span className={`px-3 py-1 rounded-full text-sm ${
            order.status === 'completed' ? 'bg-green-100 text-green-800' :
            order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
            'bg-red-100 text-red-800'
          }`}>
            {order.status}
          </span>
        </div>
        <div className="space-y-2">
          {order.items.map((item, index) => (
            <div key={index} className="flex justify-between">
              <span>{item.name} x {item.quantity}</span>
              <span>${item.price.toFixed(2)}</span>
            </div>
          ))}
        </div>
        <div className="mt-4 pt-4 border-t">
          <div className="flex justify-between font-bold">
            <span>Total</span>
            <span>${order.total.toFixed(2)}</span>
          </div>
        </div>
      </div>
    );
  };
  
  export default OrderCard;