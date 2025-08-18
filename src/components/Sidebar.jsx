import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

const Sidebar = ({ categories }) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [maxPrice, setMaxPrice] = useState(10000000);

  useEffect(() => {
    const price = searchParams.get('maxPrice');
    if (price) {
      setMaxPrice(parseInt(price));
    }
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
    <div className="w-64 p-4 bg-gray-100">
      <h2 className="text-xl font-bold mb-4">Ангилал</h2>
      <ul>
        <li className="mb-2">
          <a href="#" onClick={() => handleCategoryClick('all')} className="text-gray-700 hover:text-orange-600 cursor-pointer">
            Бүгд
          </a>
        </li>
        {categories.map((cat) => (
          <li key={cat.id} className="mb-2">
            <a href="#" onClick={() => handleCategoryClick(cat.id)} className="text-gray-700 hover:text-orange-600 cursor-pointer">
              {cat.name}
            </a>
          </li>
        ))}
      </ul>
      <h2 className="text-xl font-bold mb-4 mt-8">Шүүлтүүр</h2>
      <div>
        <label className="block mb-2">Үнэ (дээд тал нь: {maxPrice}₮)</label>
        <input
          type="range"
          min="0"
          max="10000000"
          step="100000"
          value={maxPrice}
          onChange={handlePriceChange}
          className="w-full"
        />
      </div>
    </div>
  );
};

export default Sidebar;