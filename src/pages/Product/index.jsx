import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import API from '../../services/api';
import RelatedProducts from '../../components/RelatedProducts';
import { CartContext } from '../../context/CartContext';

const ProductPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState('');
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await API.getProduct(id);
        setProduct(response.data.data);
        if (response.data.data.featuredImage) {
          setSelectedImage(`${import.meta.env.VITE_API_URL}/${response.data.data.featuredImage}`);
        } else if (response.data.data.images && response.data.data.images.length > 0) {
          setSelectedImage(`${import.meta.env.VITE_API_URL}/${response.data.data.images[0].url}`);
        }
      } catch (err) {
        setError("Бүтээгдэхүүн татахад алдаа гарлаа.");
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value > 0) {
      setQuantity(value);
    } else if (e.target.value === '') {
      setQuantity('');
    }
  };

  if (loading) {
    return <div className="text-center py-12">Ачааллаж байна...</div>;
  }

  if (error) {
    return <div className="text-center py-12 text-red-500">{error}</div>;
  }

  if (!product) {
    return <div className="text-center py-12">Бүтээгдэхүүн олдсонгүй.</div>;
  }

  return (
    <div>
      <div className="container mx-auto py-12">
        <div className="flex flex-col lg:flex-row">
          {/* Image Gallery */}
          <div className="w-full lg:w-1/2">
            <div className="relative w-full mb-4" style={{ paddingTop: '100%' }}>
              <img src={selectedImage} alt={product.name} className="absolute top-0 left-0 w-full h-full object-cover rounded-lg" />
            </div>
            <div className="flex">
              {product.images.map((image) => (
                <img
                  key={image.id}
                  src={`${import.meta.env.VITE_API_URL}/${image.url}`}
                  alt={`${product.name} thumbnail`}
                  className={`w-24 h-24 object-contain rounded-lg cursor-pointer mr-2 ${selectedImage.endsWith(image.url) ? 'border-2 border-blue-500' : ''}`}
                  onClick={() => setSelectedImage(`${import.meta.env.VITE_API_URL}/${image.url}`)}
                />
              ))}
            </div>
          </div>
          {/* Product Details */}
          <div className="w-full lg:w-1/2 lg:pl-12 mt-8 lg:mt-0">
            <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
            <p className="text-gray-500 mb-4">{product.categories.map(c => c.name).join(', ')}</p>
            <p className="text-2xl font-bold mb-4">${parseFloat(product.price).toFixed(2)}</p>
            <div className="mb-8 ql-snow"><div className="ql-editor" dangerouslySetInnerHTML={{ __html: product.description }}></div></div>
            <div className="flex items-center mb-8">
              <button onClick={() => setQuantity(quantity > 1 ? quantity - 1 : 1)} className="bg-gray-200 px-4 py-2 rounded-lg">-</button>
              <input type="number" value={quantity} onChange={handleQuantityChange} className="w-16 text-center mx-2 border rounded" />
              <button onClick={() => setQuantity(quantity + 1)} className="bg-gray-200 px-4 py-2 rounded-lg">+</button>
            </div>
            <button onClick={() => addToCart(product, quantity)} className="bg-blue-500 text-white px-6 py-3 rounded-lg">Сагсанд хийх</button>
          </div>
        </div>
      </div>
      {/* <RelatedProducts products={relatedProducts} /> */}
    </div>
  );
};

export default ProductPage;