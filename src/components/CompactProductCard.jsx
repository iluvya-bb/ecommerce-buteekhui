import React from "react";
import { Link } from "react-router-dom";

const CompactProductCard = ({ product }) => {
  const imageUrl = product.featuredImage
    ? `${import.meta.env.VITE_API_URL}/${product.featuredImage}`
    : product.images && product.images[0]
      ? `${import.meta.env.VITE_API_URL}/${product.images[0].url}`
      : "https://via.placeholder.com/150";
  const categoryText = product.categories
    ? product.categories.map((c) => c.name).join(", ")
    : "";

  return (
    <Link to={`/product/${product.id}`}>
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <img
          src={imageUrl}
          alt={product.name}
          className="w-full h-32 object-contain"
        />
        <div className="p-2">
          <h3 className="text-sm font-semibold h-10 truncate">
            {product.name}
          </h3>
          <p className="text-xs text-gray-500 h-6">{categoryText}</p>
          <div className="mt-1">
            <p className="text-sm font-bold">₮{product.price}</p>
            <button className="bg-blue-500 text-white px-2 py-1 rounded-lg text-xs w-full mt-2">
              Сагсанд хийх
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CompactProductCard;
