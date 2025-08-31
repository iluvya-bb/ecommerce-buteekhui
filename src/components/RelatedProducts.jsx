import React from 'react';
import ProductCard from './ProductCard';

const RelatedProducts = ({ products }) => {
  if (!products || products.length === 0) {
    return null;
  }

  return (
    <div className="bg-secondary py-16">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12 text-primary">Төстэй бүтээгдэхүүн</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default RelatedProducts;