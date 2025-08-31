import React, { useContext } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { SettingsContext } from "../context/SettingsContext";
import { Link } from "react-router-dom";

const HeroBanner = () => {
	const { settings } = useContext(SettingsContext);

	const heroData = {
		headline: settings.heroHeadline || "Шинэ Цуглуулга Ирлээ",
		subheadline:
			settings.heroSubheadline ||
			"Тав тухтай, загварлаг оффис тавилгыг танилцуулж байна.",
		cta: settings.heroCta || "Дэлгэрэнгүй",
		link: settings.heroLink || "/products",
		image: settings.heroImage
			? `${import.meta.env.VITE_API_URL}/${settings.heroImage}`
			: "https://images.unsplash.com/photo-1592078615290-033ee584e267?q=80&w=2760&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
		backgroundImage: settings.heroBackgroundImage
			? `${import.meta.env.VITE_API_URL}/${settings.heroBackgroundImage}`
			: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
	};

	return (
		<div
			className="py-24 bg-secondary"
			style={{
				backgroundImage: `url(${heroData.backgroundImage})`,
				backgroundSize: "cover",
				backgroundPosition: "center",
				backgroundAttachment: "fixed",
			}}
		>
			<div className="container mx-auto px-6">
				<div className="flex flex-col md:flex-row items-center rounded-3xl overflow-hidden shadow-2xl bg-white/40 backdrop-blur-xl border border-white/30">
					{/* Text Content */}
					<div className="md:w-1/2 p-12 text-center md:text-left">
						<motion.div
							initial={{ opacity: 0, x: -50 }}
							animate={{ opacity: 1, x: 0 }}
							transition={{ duration: 0.8 }}
						>
							<h1 className="text-5xl md:text-6xl font-bold text-primary leading-tight mb-4">
								{heroData.headline}
							</h1>
							<p className="text-lg text-text-light mb-8">
								{heroData.subheadline}
							</p>
							<Link to={heroData.link}>
								<motion.button
									className="bg-accent text-primary-dark font-bold py-3 px-6 rounded-lg flex items-center justify-center mx-auto md:mx-0 gap-2 shadow-lg transition-all duration-300 hover:shadow-xl active:shadow-inner"
									whileHover={{ gap: "1rem" }}
									transition={{ type: "spring", stiffness: 400 }}
								>
									{heroData.cta}
									<ArrowRight />
								</motion.button>
							</Link>
						</motion.div>
					</div>
					{/* Image Content */}
					<motion.div
						className="md:w-1/2"
						initial={{ opacity: 0, scale: 0.9 }}
						animate={{ opacity: 1, scale: 1 }}
						transition={{ duration: 0.8, delay: 0.2 }}
					>
						<img
							src={heroData.image}
							alt="Modern Office Furniture"
							className="w-full h-full object-cover"
						/>
					</motion.div>
				</div>
			</div>
		</div>
	);
};

export default HeroBanner;
