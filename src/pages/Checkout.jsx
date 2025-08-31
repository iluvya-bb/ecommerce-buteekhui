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
  const [contact, setContact] = useState({ name: '', email: '', address: '', phone: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('bank');
  const [copied, setCopied] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      setContact({
        name: user.name || '',
        email: user.email || '',
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
    <div className="bg-secondary py-12">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8 text-primary">Тооцоо хийх</h1>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* Left Column: Form and Payment */}
          <div className="space-y-8">
            {/* Contact Form */}
            <div className="p-8 rounded-2xl neumorphic-outer bg-secondary">
              <h2 className="text-2xl font-semibold mb-6 text-primary">Холбоо барих мэдээлэл</h2>
              <form id="checkout-form" onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-text mb-1">Нэр</label>
                  <input type="text" name="name" id="name" value={contact.name} onChange={handleContactChange} required className="w-full px-3 py-2 mt-1 rounded-lg bg-secondary neumorphic-inner"/>
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-text mb-1">И-мэйл</label>
                  <input type="email" name="email" id="email" value={contact.email} onChange={handleContactChange} required disabled={!!user} className="w-full px-3 py-2 mt-1 rounded-lg bg-secondary neumorphic-inner disabled:cursor-not-allowed"/>
                </div>
                <div>
                  <label htmlFor="address" className="block text-sm font-medium text-text mb-1">Хүргэлтийн хаяг</label>
                  <textarea name="address" id="address" value={contact.address} onChange={handleContactChange} required rows="3" className="w-full px-3 py-2 mt-1 rounded-lg bg-secondary neumorphic-inner"/>
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-text mb-1">Утасны дугаар</label>
                  <input type="text" name="phone" id="phone" value={contact.phone} onChange={handleContactChange} required className="w-full px-3 py-2 mt-1 rounded-lg bg-secondary neumorphic-inner"/>
                </div>
              </form>
            </div>

            {/* Payment Methods */}
            <div className="p-8 rounded-2xl neumorphic-outer bg-secondary">
              <h2 className="text-2xl font-semibold mb-4">Төлбөрийн хэрэгслүүд</h2>
              <div className="flex gap-4 mb-4">
                <button 
                  onClick={() => setPaymentMethod('bank')}
                  className={`py-2 px-4 rounded-lg transition-all duration-300 ${paymentMethod === 'bank' ? 'neumorphic-inner text-accent' : 'neumorphic-outer active:neumorphic-inner'}`}
                >
                  Дансаар шилжүүлэх
                </button>
                <button 
                  onClick={() => setPaymentMethod('qpay')}
                  disabled={settings.qpay !== 'true'}
                  className={`py-2 px-4 rounded-lg transition-all duration-300 ${paymentMethod === 'qpay' ? 'neumorphic-inner text-accent' : 'neumorphic-outer active:neumorphic-inner'} disabled:opacity-50 disabled:cursor-not-allowed`}
                >
                  QPay
                </button>
              </div>
              <div className="p-6 rounded-lg neumorphic-inner bg-secondary">
                {paymentMethod === 'bank' && (
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-text-light">Банк:</p>
                      <p className="text-lg font-semibold text-primary">{settings.bankName}</p>
                    </div>
                    <div>
                      <p className="text-sm text-text-light">Дансны нэр:</p>
                      <p className="text-lg font-semibold text-primary">{settings.bankAccountName}</p>
                    </div>
                    <div>
                      <p className="text-sm text-text-light">Дансны дугаар:</p>
                      <div className="flex items-center justify-between">
                        <p className="text-lg font-semibold text-primary tracking-wider">{settings.bankAccount}</p>
                        <button onClick={() => handleCopy(settings.bankAccount)} className="ml-4 px-3 py-1 text-xs font-medium rounded-md neumorphic-outer active:neumorphic-inner">
                          {copied === settings.bankAccount ? 'Хуулсан!' : 'Хуулах'}
                        </button>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-text-light">Төлөх дүн:</p>
                      <div className="flex items-center justify-between">
                        <p className="text-lg font-bold text-accent">₮{total.toLocaleString()}</p>
                        <button onClick={() => handleCopy(total.toFixed(2))} className="ml-4 px-3 py-1 text-xs font-medium rounded-md neumorphic-outer active:neumorphic-inner">
                          {copied === total.toFixed(2) ? 'Хуулсан!' : 'Хуулах'}
                        </button>
                      </div>
                    </div>
                    <p className="text-sm text-center text-text-light pt-4 border-t border-gray-300/50 mt-4">Та төлбөрөө төлснөөр таны захиалга баталгаажина</p>
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

          {/* Right Column: Order Summary */}
          <div className="p-8 rounded-2xl neumorphic-outer bg-secondary h-fit">
            <h2 className="text-2xl font-semibold mb-6 text-primary">Таны захиалга</h2>
            <div className="space-y-4">
              {cartItems.map(item => (
                <div key={item.id} className="flex justify-between items-center text-sm">
                  <div>
                    <p className="font-semibold text-primary">{item.name}</p>
                    <p className="text-text-light">Тоо ширхэг: {item.quantity}</p>
                  </div>
                  <p className="text-text">₮{(item.price * item.quantity).toLocaleString()}</p>
                </div>
              ))}
            </div>
            <div className="py-4 mt-4 border-t border-b border-gray-300/50">
              <div className="flex justify-between text-sm">
                <p className="text-text-light">Дүн</p>
                <p className="text-text">₮{subtotal.toLocaleString()}</p>
              </div>
              <div className="flex justify-between mt-2 text-sm">
                <p className="text-text-light">НӨАТ (10%)</p>
                <p className="text-text">₮{vat.toLocaleString()}</p>
              </div>
            </div>
            <div className="flex justify-between mt-4 text-lg font-bold">
              <p className="text-primary">Нийт</p>
              <p className="text-accent">₮{total.toLocaleString()}</p>
            </div>
            {error && <p className="text-sm text-red-600 mt-4">{error}</p>}
            <button 
              type="submit" 
              form="checkout-form" 
              disabled={loading}
              className="w-full px-4 py-3 mt-6 font-bold text-primary-dark bg-accent rounded-lg neumorphic-outer active:neumorphic-inner disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Түр хүлээнэ үү...' : 'Захиалга баталгаажуулах'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
