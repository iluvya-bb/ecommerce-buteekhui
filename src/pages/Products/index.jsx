import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import API from "../../services/api";
import Sidebar from "../../components/Sidebar";
import FilteredProductGrid from "../../components/FilteredProductGrid";
import Pagination from "../../components/Pagination";
import LoadingSpinner from "../../components/LoadingSpinner";

const Products = () => {
	const [filteredProducts, setFilteredProducts] = useState([]);
	const [categories, setCategories] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");
	const [searchParams, setSearchParams] = useSearchParams();
	const [pagination, setPagination] = useState(null);
	const currentPage = parseInt(searchParams.get("page") || "1", 10);

	useEffect(() => {
		const fetchCategories = async () => {
			try {
				const categoryResponse = await API.getAllCategories();
				setCategories(categoryResponse.data.data);
			} catch (err) {
				setError("Ангилал татахад алдаа гарлаа.");
			}
		};
		fetchCategories();
	}, []);

	useEffect(() => {
		const fetchProducts = async () => {
			try {
				setLoading(true);
				const params = {
					page: currentPage,
					limit: 12,
				};
				const categoryId = searchParams.get("category");
				const searchQuery = searchParams.get("q");
				const maxPrice = searchParams.get("maxPrice");

				if (categoryId) {
					params.categoryId = categoryId;
				}
				if (searchQuery) {
					params.q = searchQuery;
				}
				if (maxPrice) {
					params.maxPrice = maxPrice;
				}

				const productResponse = await API.getAllProducts(params);
				setFilteredProducts(productResponse.data.data);
				setPagination(productResponse.data.pagination);
			} catch (err) {
				setError("Бүтээгдэхүүн татахад алдаа гарлаа.");
			} finally {
				setLoading(false);
			}
		};
		fetchProducts();
	}, [searchParams, currentPage]);

	const handlePageChange = (page) => {
		const newSearchParams = new URLSearchParams(searchParams);
		newSearchParams.set("page", page);
		setSearchParams(newSearchParams);
	};

	if (error) {
		return <div className="text-center py-12 text-red-500">{error}</div>;
	}

	return (
		<div className="bg-secondary py-16">
			<div className="container mx-auto">
				<div className="flex flex-col lg:flex-row gap-12">
					<Sidebar categories={categories} />
					<div className="flex-grow">
						{loading ? (
							<div className="flex justify-center items-center h-96">
								<LoadingSpinner />
							</div>
						) : (
							<motion.div
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								transition={{ duration: 0.5 }}
							>
								<div className="px-8 py-4 bg-secondary rounded-2xl neumorphic-outer mb-8">
									<div className="flex justify-between items-center">
										<span className="text-text">
											{pagination?.total || 0} бүтээгдэхүүн олдлоо
										</span>
									</div>
								</div>
								<FilteredProductGrid products={filteredProducts} />
								{pagination && pagination.pages > 1 && (
									<Pagination
										currentPage={currentPage}
										totalPages={pagination.pages}
										onPageChange={handlePageChange}
									/>
								)}
							</motion.div>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default Products;
