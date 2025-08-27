import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import { X } from "lucide-react";

const CartDrawer = ({ isOpen, onClose }) => {
	const { cartItems, removeFromCart, updateQuantity } = useContext(CartContext);
	const navigate = useNavigate();

	const handleCheckout = () => {
		onClose(); // Close the drawer first
		navigate("/checkout");
	};

	const subtotal = cartItems.reduce(
		(acc, item) => acc + item.price * item.quantity,
		0,
	);

	return (
		<div
			className={`fixed top-0 right-0 h-full w-96 bg-white shadow-lg transform transition-transform ${isOpen ? "translate-x-0" : "translate-x-full"} z-20`}
		>
			<div className="p-4 flex justify-between items-center border-b">
				<h2 className="text-2xl font-bold">Таны сагс</h2>
				<button onClick={onClose}>
					<X />
				</button>
			</div>
			<div className="p-4 overflow-y-auto h-[calc(100%-140px)]">
				{cartItems.length === 0 ? (
					<p>Таны сагс хоосон байна.</p>
				) : (
					cartItems.map((item) => {
						const imageUrl = item.featuredImage
							? `${import.meta.env.VITE_API_URL}/${item.featuredImage}`
							: item.images && item.images[0]
								? `${import.meta.env.VITE_API_URL}/${item.images[0].url}`
								: "https://via.placeholder.com/150";
						return (
							<div key={item.id} className="flex items-center mb-4">
								<img
									src={imageUrl}
									alt={item.name}
									className="w-20 h-20 object-cover rounded-lg mr-4"
								/>
								<div className="flex-grow">
									<h3 className="font-semibold">{item.name}</h3>
									<p className="text-gray-500">₮{item.price}</p>
									<div className="flex items-center mt-2">
										<button
											onClick={() => updateQuantity(item.id, item.quantity - 1)}
											className="bg-gray-200 px-2 rounded-lg"
										>
											-
										</button>
										<span className="mx-2">{item.quantity}</span>
										<button
											onClick={() => updateQuantity(item.id, item.quantity + 1)}
											className="bg-gray-200 px-2 rounded-lg"
										>
											+
										</button>
									</div>
								</div>
								<button
									onClick={() => removeFromCart(item.id)}
									className="text-red-500"
								>
									<X size={20} />
								</button>
							</div>
						);
					})
				)}
			</div>
			<div className="absolute bottom-0 left-0 w-full p-4 border-t bg-white">
				<div className="flex justify-between mb-2">
					<span className="font-semibold">Нийт дүн:</span>
					<span>₮{subtotal.toFixed(2)}</span>
				</div>
				<button
					onClick={handleCheckout}
					className="w-full bg-blue-500 text-white py-3 rounded-lg mt-4"
				>
					Тооцоо хийх
				</button>
			</div>
		</div>
	);
};

export default CartDrawer;
