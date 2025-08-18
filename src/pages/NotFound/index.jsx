import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold mb-4">404 - Хуудас олдсонгүй</h1>
      <p className="text-lg mb-8">Таны хайсан хуудас байхгүй байна.</p>
      <Link to="/" className="bg-blue-500 text-white px-6 py-3 rounded-lg">Нүүр хуудас руу буцах</Link>
    </div>
  );
};

export default NotFound;
