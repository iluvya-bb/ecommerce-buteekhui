import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import API from '../../services/api';
import { AuthContext } from '../../context/AuthContext';

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [phone, setPhone] = useState('');
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchOrders = async () => {
      if (!user) {
        setLoading(false);
        return;
      };
      try {
        const response = await API.getOrders();
        setOrders(response.data.data);
      } catch (err) {
        setError("Захиалга татахад алдаа гарлаа.");
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, [user]);

  const handleSearch = async () => {
    if (!phone) return;
    setLoading(true);
    setError('');
    try {
      const response = await API.getOrdersByContact(phone);
      setOrders(response.data.data);
    } catch (err) {
      setError("Утасны дугаараар захиалга хайхад алдаа гарлаа.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">Миний захиалгууд</h2>
      <div className="flex mb-4">
        <input
          type="text"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="Утасны дугаараар хайх"
          className="w-full p-2 border rounded-l-lg"
        />
        <button onClick={handleSearch} className="bg-blue-500 text-white px-4 py-2 rounded-r-lg">Хайх</button>
      </div>
      {loading && <div>Ачааллаж байна...</div>}
      {error && <div className="text-red-500">{error}</div>}
      {!loading && !error && (
        <div className="space-y-4">
          {orders.length === 0 ? (
            <p>Захиалга олдсонгүй.</p>
          ) : (
            orders.map(order => (
              <Link to={`/orders/${order.id}`} key={order.id} className="block p-4 border rounded-lg hover:bg-gray-50">
                <div className="flex justify-between">
                  <p className="font-semibold">Захиалга #{order.id}</p>
                  <p className="font-semibold">${parseFloat(order.total).toFixed(2)}</p>
                </div>
                <p className="text-sm text-gray-600">Огноо: {new Date(order.createdAt).toLocaleDateString()}</p>
                <p className="text-sm text-gray-600">Төлөв: {order.status}</p>
              </Link>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default MyOrders;
