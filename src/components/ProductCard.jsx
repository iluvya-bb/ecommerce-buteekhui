import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext';

const ProductCard = ({ product }) => {
  const { addToCart } = useContext(CartContext);
  const imageUrl = product.featuredImage ? `${import.meta.env.VITE_API_URL}/${product.featuredImage}` : (product.images && product.images[0] ? `${import.meta.env.VITE_API_URL}/${product.images[0].url}` : 'https://via.placeholder.com/150');
  const categoryText = product.categories ? product.categories.map(c => c.name).join(', ') : '';

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
  };

  return (
    <Link to={`/product/${product.id}`}>
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <img src={imageUrl} alt={product.name} className="w-full h-48 object-contain" />
        <div className="p-4">
          <h3 className="text-base font-semibold">{product.name}</h3>
          <p className="text-sm text-gray-500">{categoryText}</p>
          <div className="mt-2 flex justify-between items-center">
            <p className="text-lg font-bold">${product.price}</p>
            <button onClick={handleAddToCart} className="bg-blue-500 text-white px-3 py-1 rounded-lg text-sm">Сагсанд хийх</button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;