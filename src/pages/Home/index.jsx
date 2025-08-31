import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import API from "../../services/api";
import HeroSection from "../../components/HeroSection";
import HeroBanner from "../../components/HeroBanner";
import ProductGrid from "../../components/ProductGrid";
import NeoProductGrid from "../../components/NeoProductGrid";
import LoadingSpinner from "../../components/LoadingSpinner";

const Home = () => {
	const [featuredProducts, setFeaturedProducts] = useState([]);
	const [featuredCategories, setFeaturedCategories] = useState([]);
	const [productsByCategory, setProductsByCategory] = useState({});
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");

	useEffect(() => {
		const fetchData = async () => {
			try {
				setLoading(true);
				const [productResponse, categoryResponse] = await Promise.all([
					API.getAllProducts(),
					API.getAllCategories(),
				]);

				const allProducts = productResponse.data.data;
				const allCategories = categoryResponse.data.data;

				setFeaturedProducts(allProducts.filter((p) => p.isFeatured));
				const featuredCats = allCategories.filter((c) => c.isFeatured);
				setFeaturedCategories(featuredCats);

				const productsByCat = {};
				featuredCats.forEach((cat) => {
					productsByCat[cat.id] = allProducts
						.filter((p) => p.categories.some((c) => c.id === cat.id))
						.slice(0, 4);
				});
				setProductsByCategory(productsByCat);
			} catch (err) {
				setError("Өгөгдөл татахад алдаа гарлаа.");
			} finally {
				setLoading(false);
			}
		};
		fetchData();
	}, []);

	if (loading) {
		return (
			<div className="flex justify-center items-center h-screen">
				<LoadingSpinner />
			</div>
		);
	}

	if (error) {
		return <div className="text-center py-12 text-red-500">{error}</div>;
	}

	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ duration: 0.5 }}
		>
			<HeroBanner />
			<HeroSection />

			<div className="bg-white py-16">
				<div className="container mx-auto">
					<NeoProductGrid products={featuredProducts} />
				</div>
			</div>

			{/* Featured Categories Sections */}
			{featuredCategories.map((category, index) => {
				const imageUrl = category.imgUrl
					? `${import.meta.env.VITE_API_URL}/${category.imgUrl}`
					: "";
				return (
					<div
						key={category.id}
						className="py-16"
						style={{
							backgroundImage: `url(${imageUrl})`,
							backgroundSize: "cover",
							backgroundPosition: "center",
							backgroundAttachment: "fixed",
						}}
					>
						<div className="container mx-auto">
							<motion.div
								className="p-8 rounded-2xl bg-white/40 backdrop-blur-xl border border-white/30"
								initial={{ opacity: 0, y: 50 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ delay: index * 0.2 }}
							>
								<div className="flex justify-between items-center mb-8">
									<h2 className="text-3xl font-bold text-black drop-shadow-lg">
										{category.name}
									</h2>
									<Link
										to={`/products?category=${category.id}`}
										className="bg-accent text-primary-dark font-bold px-6 py-3 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl active:shadow-inner"
									>
										Бүгдийг харах
									</Link>
								</div>
								<ProductGrid products={productsByCategory[category.id] || []} />
							</motion.div>
						</div>
					</div>
				);
			})}
		</motion.div>
	);
};

export default Home;
