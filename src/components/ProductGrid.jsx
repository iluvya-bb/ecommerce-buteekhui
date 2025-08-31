import React from "react";
import ProductCard from "./NonNeuroProductCard.jsx";

const ProductGrid = ({ products }) => {
	if (!products || products.length === 0) {
		return <p className="text-center">Бүтээгдэхүүн олдсонгүй.</p>;
	}

	return (
		<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
			{products.map((product) => (
				<ProductCard key={product.id} product={product} />
			))}
		</div>
	);
};

export default ProductGrid;
