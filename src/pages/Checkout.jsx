import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';
import API from '../services/api';

const Checkout = () => {
  const { cartItems, clearCart } = useContext(CartContext);
  const { user } = useContext(AuthContext);
  const [contact, setContact] = useState({ name: '', address: '', phone: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      setContact({
        name: user.name || '',
        address: '', // Address is not in the user model, so it remains empty
        phone: user.phone || '',
      });
    }
  }, [user]);

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const vat = subtotal * 0.10;
  const total = subtotal + vat;

  const handleContactChange = (e) => {
    setContact({ ...contact, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const orderData = {
      contact,
      items: cartItems.map(p => ({
        productId: p.id,
        quantity: p.quantity,
      })),
    };

    try {
      await API.checkout(orderData);
      clearCart();
      // Redirect to a success page or the homepage
      navigate('/order-success'); 
    } catch (err) {
      setError("Захиалга үүсгэхэд алдаа гарлаа. Та мэдээллээ шалгаад дахин оролдоно уу.");
      setLoading(false);
    }
  };

  if (cartItems.length === 0 && !loading) {
    return (
      <div className="container mx-auto py-12 text-center">
        <h1 className="text-4xl font-bold mb-8">Таны сагс хоосон байна</h1>
        <p>Захиалга хийхийн тулд сагсандаа бараа нэмнэ үү.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-12">
      <h1 className="text-4xl font-bold text-center mb-8">Тооцоо хийх</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Contact Form */}
        <div>
          <h2 className="text-2xl font-semibold mb-6">Холбоо барих мэдээлэл</h2>
          <form id="checkout-form" onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">Нэр</label>
              <input type="text" name="name" id="name" value={contact.name} onChange={handleContactChange} required className="w-full px-3 py-2 mt-1 border rounded-md"/>
            </div>
            <div>
              <label htmlFor="address" className="block text-sm font-medium text-gray-700">Хүргэлтийн хаяг</label>
              <textarea name="address" id="address" value={contact.address} onChange={handleContactChange} required className="w-full px-3 py-2 mt-1 border rounded-md"/>
            </div>
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Утасны дугаар</label>
              <input type="text" name="phone" id="phone" value={contact.phone} onChange={handleContactChange} required className="w-full px-3 py-2 mt-1 border rounded-md"/>
            </div>
          </form>
        </div>

        {/* Order Summary */}
        <div className="p-8 bg-gray-100 rounded-lg">
          <h2 className="text-2xl font-semibold mb-6">Таны захиалга</h2>
          <div className="space-y-4">
            {cartItems.map(item => (
              <div key={item.id} className="flex justify-between items-center">
                <div>
                  <p className="font-semibold">{item.name}</p>
                  <p className="text-sm text-gray-600">Тоо ширхэг: {item.quantity}</p>
                </div>
                <p>${(item.price * item.quantity).toFixed(2)}</p>
              </div>
            ))}
          </div>
          <div className="py-4 mt-4 border-t border-b">
            <div className="flex justify-between">
              <p>Дүн</p>
              <p>${subtotal.toFixed(2)}</p>
            </div>
            <div className="flex justify-between mt-2">
              <p>НӨАТ (10%)</p>
              <p>${vat.toFixed(2)}</p>
            </div>
          </div>
          <div className="flex justify-between mt-4 text-xl font-bold">
            <p>Нийт</p>
            <p>${total.toFixed(2)}</p>
          </div>
          {error && <p className="text-sm text-red-600 mt-4">{error}</p>}
          <button 
            type="submit" 
            form="checkout-form" 
            disabled={loading}
            className="w-full px-4 py-3 mt-6 font-bold text-white bg-indigo-600 rounded-md hover:bg-indigo-700 disabled:bg-gray-400"
          >
            {loading ? 'Түр хүлээнэ үү...' : 'Захиалга баталгаажуулах'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;