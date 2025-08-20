import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';
import { SettingsContext } from '../context/SettingsContext';
import API from '../services/api';

const Checkout = () => {
  const { cartItems, clearCart } = useContext(CartContext);
  const { user } = useContext(AuthContext);
  const { settings } = useContext(SettingsContext);
  const [contact, setContact] = useState({ name: '', address: '', phone: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('bank');
  const [copied, setCopied] = useState('');
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

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(text);
    setTimeout(() => setCopied(''), 2000);
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
          <div className="mt-8">
            <h2 className="text-2xl font-semibold mb-4">Төлбөрийн хэрэгслүүд</h2>
            <div className="flex border-b">
              <button 
                onClick={() => setPaymentMethod('bank')}
                className={`py-2 px-4 text-sm font-medium transition-colors ${paymentMethod === 'bank' ? 'border-b-2 border-indigo-600 text-indigo-600' : 'text-gray-500 hover:text-indigo-600'}`}
              >
                Дансаар шилжүүлэх
              </button>
              <button 
                onClick={() => setPaymentMethod('qpay')}
                disabled={settings.qpay !== 'true'}
                className={`py-2 px-4 text-sm font-medium transition-colors ${paymentMethod === 'qpay' ? 'border-b-2 border-indigo-600 text-indigo-600' : 'text-gray-500 hover:text-indigo-600'} disabled:text-gray-300 disabled:cursor-not-allowed`}
              >
                QPay
              </button>
            </div>
            <div className="p-6 bg-gray-50 rounded-b-lg">
              {paymentMethod === 'bank' && (
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-500">Банк:</p>
                    <p className="text-lg font-semibold text-gray-800">{settings.bankName}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Дансны нэр:</p>
                    <p className="text-lg font-semibold text-gray-800">{settings.bankAccountName}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Дансны дугаар:</p>
                    <div className="flex items-center justify-between">
                      <p className="text-lg font-semibold text-gray-800 tracking-wider">{settings.bankAccount}</p>
                      <button onClick={() => handleCopy(settings.bankAccount)} className="ml-4 px-3 py-1 text-xs font-medium text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                        {copied === settings.bankAccount ? 'Хуулсан!' : 'Хуулах'}
                      </button>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Төлөх дүн:</p>
                    <div className="flex items-center justify-between">
                      <p className="text-lg font-bold text-indigo-600">₮{total.toFixed(2)}</p>
                      <button onClick={() => handleCopy(total.toFixed(2))} className="ml-4 px-3 py-1 text-xs font-medium text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                        {copied === total.toFixed(2) ? 'Хуулсан!' : 'Хуулах'}
                      </button>
                    </div>
                  </div>
                  <p className="text-sm text-center text-gray-600 pt-4 border-t mt-4">Та төлбөрөө төлснөөр таны захиалга баталгаажина</p>
                </div>
              )}
              {paymentMethod === 'qpay' && (
                <div>
                  <p>QPay-р төлбөр төлөх хэсэг.</p>
                </div>
              )}
            </div>
          </div>
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
                <p>₮{(item.price * item.quantity).toFixed(2)}</p>
              </div>
            ))}
          </div>
          <div className="py-4 mt-4 border-t border-b">
            <div className="flex justify-between">
              <p>Дүн</p>
              <p>₮{subtotal.toFixed(2)}</p>
            </div>
            <div className="flex justify-between mt-2">
              <p>НӨАТ (10%)</p>
              <p>₮{vat.toFixed(2)}</p>
            </div>
          </div>
          <div className="flex justify-between mt-4 text-xl font-bold">
            <p>Нийт</p>
            <p>₮{total.toFixed(2)}</p>
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