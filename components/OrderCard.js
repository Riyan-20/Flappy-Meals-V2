const OrderCard = ({ order }) => {
  return (
    <div className="border rounded-lg shadow-md bg-gray-50 p-4 mb-4 hover:shadow-lg transition-shadow duration-200">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Order #{order.orderId}</h3>
        <span className={`px-3 py-1 rounded-full text-sm ${
          order.orderStatus === 'Completed' ? 'bg-green-100 text-green-800' :
          order.orderStatus === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
          'bg-red-100 text-red-800'
        }`}>
          {order.orderStatus}
        </span>
      </div>
      <div className="space-y-2">
        {order.items.map((item, index) => (
          <div key={index} className="flex justify-between">
            <span>{item.name} x {item.quantity}</span>
            <span>${item.totalPrice ? item.totalPrice.toFixed(2) : 'N/A'}</span>
          </div>
        ))}
      </div>
      <div className="mt-4 pt-4 border-t">
        <div className="flex justify-between font-bold">
          <span>Pickup Location</span>
          <span>{order.pickupLocation}</span>
        </div>
        <div className="flex justify-between font-bold">
          <span>Destination Location</span>
          <span>{order.destinationLocation}</span>
        </div>
        <div className="flex justify-between font-bold">
          <span>Total</span>
          <span>${order.totalPrice ? order.totalPrice.toFixed(2) : 'N/A'}</span>
        </div>
      </div>
    </div>
  );
};

export default OrderCard;
