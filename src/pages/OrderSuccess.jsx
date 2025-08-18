import React from 'react';
import { Link } from 'react-router-dom';

const OrderSuccess = () => {
  return (
    <div className="container mx-auto py-12 text-center">
      <h1 className="text-4xl font-bold text-green-500 mb-4">Захиалга амжилттай!</h1>
      <p className="text-lg mb-8">Таны захиалгыг хүлээн авлаа. Бид тантай удахгүй холбогдох болно.</p>
      <Link to="/" className="bg-blue-500 text-white px-6 py-3 rounded-lg">
        Нүүр хуудас руу буцах
      </Link>
    </div>
  );
};

export default OrderSuccess;
