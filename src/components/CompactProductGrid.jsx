import React from 'react';
import CompactProductCard from './CompactProductCard';

const CompactProductGrid = ({ products }) => {
  return (
    <div className="container mx-auto py-8">
      <h2 className="text-2xl font-bold mb-4">Онцлох бүтээгдэхүүн</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
        {products.map((product) => (
          <CompactProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default CompactProductGrid;
