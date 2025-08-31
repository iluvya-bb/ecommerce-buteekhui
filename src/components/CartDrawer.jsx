import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import { X, Plus, Minus } from "lucide-react";

const CartDrawer = ({ isOpen, onClose }) => {
	const { cartItems, removeFromCart, updateQuantity } = useContext(CartContext);
	const navigate = useNavigate();

	const handleCheckout = () => {
		onClose();
		navigate("/checkout");
	};

	const subtotal = cartItems.reduce(
		(acc, item) => acc + item.price * item.quantity,
		0,
	);

	return (
		<div
			className={`fixed top-0 right-0 h-full w-96 bg-secondary/80 backdrop-blur-lg transform transition-transform ${isOpen ? "translate-x-0" : "translate-x-full"} z-50 shadow-2xl flex flex-col`}
		>
			<div className="p-4 flex justify-between items-center border-b border-gray-300/50">
				<h2 className="text-2xl font-bold text-primary">Таны сагс</h2>
				<button onClick={onClose} className="p-2 rounded-md hover:bg-black/10 transition-all">
					<X className="text-text"/>
				</button>
			</div>
			<div className="p-4 overflow-y-auto flex-grow">
				{cartItems.length === 0 ? (
					<p className="text-text-light text-center mt-8">Таны сагс хоосон байна.</p>
				) : (
					cartItems.map((item) => {
						const imageUrl = item.featuredImage
							? `${import.meta.env.VITE_API_URL}/${item.featuredImage}`
							: item.images && item.images[0]
								? `${import.meta.env.VITE_API_URL}/${item.images[0].url}`
								: "https://via.placeholder.com/150";
						return (
							<div key={item.id} className="flex items-center mb-4 p-2 rounded-lg neumorphic-outer bg-secondary">
								<img
									src={imageUrl}
									alt={item.name}
									className="w-20 h-20 object-cover rounded-lg mr-4"
								/>
								<div className="flex-grow">
									<h3 className="font-semibold text-primary">{item.name}</h3>
									<p className="text-text-light">₮{item.price.toLocaleString()}</p>
									<div className="flex items-center mt-2">
										<button
											onClick={() => updateQuantity(item.id, item.quantity - 1)}
											className="p-1 rounded-md neumorphic-outer active:neumorphic-inner transition-all"
										>
											<Minus size={16} className="text-text"/>
										</button>
										<span className="mx-3 font-semibold text-text">{item.quantity}</span>
										<button
											onClick={() => updateQuantity(item.id, item.quantity + 1)}
											className="p-1 rounded-md neumorphic-outer active:neumorphic-inner transition-all"
										>
											<Plus size={16} className="text-text"/>
										</button>
									</div>
								</div>
								<button
									onClick={() => removeFromCart(item.id)}
									className="text-accent p-2 rounded-md hover:neumorphic-inner transition-all"
								>
									<X size={20} />
								</button>
							</div>
						);
					})
				)}
			</div>
			<div className="p-4 border-t border-gray-300/50 bg-secondary/80">
				<div className="flex justify-between mb-4 text-lg">
					<span className="font-semibold text-text">Нийт дүн:</span>
					<span className="font-bold text-primary">₮{subtotal.toLocaleString()}</span>
				</div>
				<button
					onClick={handleCheckout}
					disabled={cartItems.length === 0}
					className="w-full bg-accent text-primary-dark font-bold py-3 rounded-lg neumorphic-outer active:neumorphic-inner transition-all disabled:opacity-50 disabled:cursor-not-allowed"
				>
					Тооцоо хийх
				</button>
			</div>
		</div>
	);
};

export default CartDrawer;