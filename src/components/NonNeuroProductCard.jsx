import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ShoppingCart } from "lucide-react";
import { CartContext } from "../context/CartContext";

const NonNeuroProductCard = ({ product }) => {
	const { addToCart } = useContext(CartContext);
	const imageUrl = product.featuredImage
		? `${import.meta.env.VITE_API_URL}/${product.featuredImage}`
		: product.images && product.images[0]
			? `${import.meta.env.VITE_API_URL}/${product.images[0].url}`
			: "https://via.placeholder.com/150";
	const categoryText = product.categories
		? product.categories.map((c) => c.name).join(", ")
		: "";

	const handleAddToCart = (e) => {
		e.preventDefault();
		e.stopPropagation();
		addToCart(product, 1);
	};

	return (
		<motion.div
			className="bg-white rounded-2xl overflow-hidden h-full flex flex-col"
			whileHover={{
				y: -8,
			}}
			transition={{ duration: 0.3, type: "spring", stiffness: 300 }}
		>
			<Link to={`/product/${product.id}`} className="group flex-grow">
				<div className="relative">
					<img
						src={imageUrl}
						alt={product.name}
						className="w-full h-48 object-contain"
					/>
					<div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-50 transition-opacity duration-300"></div>
				</div>
				<div className="p-4 flex-grow flex flex-col">
					<p className="text-sm text-text-light mb-1">{categoryText}</p>
					<h3 className="text-lg font-semibold text-primary-dark truncate flex-grow">
						{product.name}
					</h3>
					<div className="mt-4">
						<p className="text-xl font-bold text-primary">
							₮{product.price.toLocaleString()}
						</p>
					</div>
				</div>
			</Link>
			<div className="p-4 pt-0">
				<button
					onClick={handleAddToCart}
					className="w-full flex items-center justify-center gap-2 py-2 px-4 rounded-lg bg-secondary neumorphic-outer active:neumorphic-inner transition-all"
					aria-label="Сагсанд хийх"
				>
					<ShoppingCart size={20} className="text-accent" />
					<span className="text-text font-semibold">Сагсанд хийх</span>
				</button>
			</div>
		</motion.div>
	);
};

export default NonNeuroProductCard;
