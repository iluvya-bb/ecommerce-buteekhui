import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import API from '../../services/api';
import Sidebar from '../../components/Sidebar';
import FilteredProductGrid from '../../components/FilteredProductGrid';
import CompactProductGrid from '../../components/CompactProductGrid';

const Products = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchParams] = useSearchParams();

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
    const fetchAllProducts = async () => {
      try {
        const productResponse = await API.getAllProducts();
        setAllProducts(productResponse.data.data);
      } catch (err) {
        // This error is less critical, so we can just log it
        console.error("Failed to fetch all products for featured section:", err);
      }
    };
    fetchAllProducts();
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const params = {};
        const categoryId = searchParams.get('category');
        const searchQuery = searchParams.get('q');
        const maxPrice = searchParams.get('maxPrice');

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
      } catch (err) {
        setError("Бүтээгдэхүүн татахад алдаа гарлаа.");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [searchParams]);

  if (loading) {
    return <div className="text-center py-12">Ачааллаж байна...</div>;
  }

  if (error) {
    return <div className="text-center py-12 text-red-500">{error}</div>;
  }

  const featuredProducts = allProducts.filter(p => p.isFeatured);

  return (
    <div className="flex">
      <Sidebar categories={categories} />
      <div className="flex-grow">
        <CompactProductGrid products={featuredProducts} />
        <div className="px-8 py-4">
          <div className="border-t border-gray-300"></div>
          <div className="flex flex-col items-center pt-2">
            <span className="text-gray-500 mt-2">{filteredProducts.length} бүтээгдэхүүн олдлоо</span>
          </div>
        </div>
        <FilteredProductGrid products={filteredProducts} />
      </div>
    </div>
  );
};

export default Products;
