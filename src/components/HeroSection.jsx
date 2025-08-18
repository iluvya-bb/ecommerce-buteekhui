import React from 'react';

const HeroSection = () => {
  return (
    <div className="bg-gray-900 text-white py-20">
      <div className="container mx-auto text-center">
        <h1 className="text-4xl font-bold mb-4">Манай цахим худалдааны дэлгүүрт тавтай морил</h1>
        <p className="text-lg mb-8">Шилдэг бүтээгдэхүүнийг хамгийн хямд үнээр аваарай.</p>
        <button className="bg-blue-500 text-white px-6 py-3 rounded-lg">Дэлгүүр хэсэх</button>
      </div>
    </div>
  );
};

export default HeroSection;
