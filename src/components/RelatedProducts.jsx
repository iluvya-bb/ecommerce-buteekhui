import React from 'react';
import ProductCard from './ProductCard';

const RelatedProducts = ({ products }) => {
  return (
    <div className="container mx-auto py-12">
      <h2 className="text-2xl font-bold mb-4">Төстэй бүтээгдэхүүн</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default RelatedProducts;
