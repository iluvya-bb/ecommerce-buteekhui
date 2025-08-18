import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import API from '../../services/api';
import HeroSection from '../../components/HeroSection';
import ProductGrid from '../../components/ProductGrid';

const getRandomGradient = () => {
  const colors = [
    ['#ff9a9e', '#fad0c4'],
    ['#a18cd1', '#fbc2eb'],
    ['#fad0c4', '#ffd1ff'],
    ['#ffecd2', '#fcb69f'],
    ['#d4fc79', '#96e6a1'],
    ['#a1c4fd', '#c2e9fb'],
  ];
  const randomColor = colors[Math.floor(Math.random() * colors.length)];
  return `linear-gradient(to right, ${randomColor[0]}, ${randomColor[1]})`;
};

const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [featuredCategories, setFeaturedCategories] = useState([]);
  const [productsByCategory, setProductsByCategory] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

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

        setFeaturedProducts(allProducts.filter(p => p.isFeatured));
        const featuredCats = allCategories.filter(c => c.isFeatured);
        setFeaturedCategories(featuredCats);

        const productsByCat = {};
        featuredCats.forEach(cat => {
          productsByCat[cat.id] = allProducts
            .filter(p => p.categories.some(c => c.id === cat.id))
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
    return <div className="text-center py-12">Ачааллаж байна...</div>;
  }

  if (error) {
    return <div className="text-center py-12 text-red-500">{error}</div>;
  }

  return (
    <div>
      <HeroSection />
      
      <div className="container mx-auto py-12">
        <h2 className="text-3xl font-bold text-center mb-8">Онцлох бүтээгдэхүүн</h2>
        <ProductGrid products={featuredProducts} />
      </div>

      {/* Featured Categories Sections */}
      <div className="container mx-auto py-12">
        {featuredCategories.map(category => (
          <div 
            key={category.id} 
            className="p-8 mb-12 text-white rounded-2xl relative overflow-hidden" // Card container
            style={{ 
              backgroundImage: category.imgUrl ? `url(http://localhost:8002/${category.imgUrl})` : 'none', 
              backgroundSize: 'cover', 
              backgroundPosition: 'center' 
            }}
          >
            {/* Gradient Overlay */}
            <div 
              className="absolute inset-0"
              style={{ background: getRandomGradient(), opacity: 0.9 }}
            ></div>
            
            {/* Content */}
            <div className="relative z-10">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-3xl font-bold">{category.name}</h2>
                <Link to={`/products?category=${category.id}`} className="bg-white text-gray-800 font-bold px-6 py-3 rounded-lg hover:bg-gray-200">
                  Бүгдийг харах
                </Link>
              </div>
              <ProductGrid products={productsByCategory[category.id] || []} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
