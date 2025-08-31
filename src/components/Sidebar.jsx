import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';

const Sidebar = ({ categories }) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [maxPrice, setMaxPrice] = useState(10000000);
  const [activeCategory, setActiveCategory] = useState(null);

  useEffect(() => {
    const price = searchParams.get('maxPrice');
    if (price) {
      setMaxPrice(parseInt(price));
    }
    const category = searchParams.get('category');
    setActiveCategory(category || 'all');
  }, [searchParams]);

  const handleCategoryClick = (categoryId) => {
    const params = new URLSearchParams(searchParams);
    if (categoryId === 'all') {
      params.delete('category');
    } else {
      params.set('category', categoryId);
    }
    navigate(`/products?${params.toString()}`);
  };

  const handlePriceChange = (e) => {
    const price = e.target.value;
    setMaxPrice(price);
    const params = new URLSearchParams(searchParams);
    params.set('maxPrice', price);
    navigate(`/products?${params.toString()}`);
  };

  return (
    <motion.div 
      className="w-full lg:w-80 p-6 bg-secondary rounded-2xl neumorphic-outer"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-2xl font-bold mb-6 text-primary">Ангилал</h2>
      <ul className="space-y-2">
        <li>
          <a 
            href="#" 
            onClick={() => handleCategoryClick('all')} 
            className={`block px-4 py-2 rounded-md transition-all duration-300 ${activeCategory === 'all' ? 'neumorphic-inner text-accent' : 'text-text hover:neumorphic-inner'}`}
          >
            Бүгд
          </a>
        </li>
        {categories.map((cat) => (
          <li key={cat.id}>
            <a 
              href="#" 
              onClick={() => handleCategoryClick(cat.id)} 
              className={`block px-4 py-2 rounded-md transition-all duration-300 ${activeCategory === cat.id ? 'neumorphic-inner text-accent' : 'text-text hover:neumorphic-inner'}`}
            >
              {cat.name}
            </a>
          </li>
        ))}
      </ul>
      <h2 className="text-2xl font-bold mb-6 mt-10 text-primary">Шүүлтүүр</h2>
      <div>
        <div className="flex justify-between items-center mb-2">
          <label className="text-text">Үнэ</label>
          <span className="text-primary font-semibold">{maxPrice.toLocaleString()}₮</span>
        </div>
        <input
          type="range"
          min="0"
          max="10000000"
          step="100000"
          value={maxPrice}
          onChange={handlePriceChange}
          className="w-full h-2 bg-secondary rounded-lg appearance-none cursor-pointer neumorphic-inner"
        />
      </div>
    </motion.div>
  );
};

export default Sidebar;
