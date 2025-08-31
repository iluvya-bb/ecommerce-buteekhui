import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import API from "../../services/api";
import RelatedProducts from "../../components/RelatedProducts";
import { CartContext } from "../../context/CartContext";
import { ShoppingCart, Plus, Minus } from "lucide-react";

const ProductPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState("");
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await API.getProduct(id);
        const currentProduct = response.data.data;
        setProduct(currentProduct);

        if (currentProduct.featuredImage) {
          setSelectedImage(`${import.meta.env.VITE_API_URL}/${currentProduct.featuredImage}`);
        } else if (currentProduct.images && currentProduct.images.length > 0) {
          setSelectedImage(`${import.meta.env.VITE_API_URL}/${currentProduct.images[0].url}`);
        }

        if (currentProduct.categories && currentProduct.categories.length > 0) {
          const categoryId = currentProduct.categories[0].id;
          const relatedResponse = await API.getAllProducts({ categoryId });
          // Filter out the current product from the related products list
          setRelatedProducts(relatedResponse.data.data.filter(p => p.id !== currentProduct.id));
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
    } else if (e.target.value === "") {
      setQuantity("");
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
    <div className="bg-secondary">
      <div className="container mx-auto py-12">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Image Gallery */}
          <div className="w-full lg:w-1/2">
            <div className="relative w-full mb-4 rounded-2xl neumorphic-outer overflow-hidden">
              <img
                src={selectedImage}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex gap-4">
              {product.images.map((image) => (
                <div
                  key={image.id}
                  className={`rounded-xl cursor-pointer transition-all duration-300 ${selectedImage.endsWith(image.url) ? "neumorphic-inner" : "neumorphic-outer active:neumorphic-inner"}`}
                  onClick={() => setSelectedImage(`${import.meta.env.VITE_API_URL}/${image.url}`)}
                >
                  <img
                    src={`${import.meta.env.VITE_API_URL}/${image.url}`}
                    alt={`${product.name} thumbnail`}
                    className="w-24 h-24 object-contain rounded-lg p-1"
                  />
                </div>
              ))}
            </div>
          </div>
          {/* Product Details */}
          <div className="w-full lg:w-1/2">
            <div className="p-8 rounded-2xl neumorphic-outer bg-secondary h-full flex flex-col">
              <h1 className="text-3xl font-bold mb-2 text-primary">{product.name}</h1>
              <p className="text-sm text-text-light mb-4">
                {product.categories.map((c) => c.name).join(", ")}
              </p>
              <p className="text-2xl font-bold mb-4 text-accent">
                ₮{product.price.toLocaleString()}
              </p>
              
              <div className="border-t border-gray-300/70 my-4"></div>

              {/* Additional Info */}
              <div className="space-y-2 text-sm mb-6">
                <div className="flex justify-between">
                  <span className="font-semibold text-text-light">Барааны код:</span>
                  <span className="text-primary font-mono">{product.sku || 'N/A'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold text-text-light">Үлдэгдэл:</span>
                  <span className="font-semibold text-green-600">{product.stock > 0 ? 'Бэлэн байгаа' : 'Захиалгаар ирнэ'}</span>
                </div>
              </div>

              <div className="flex items-center mb-6">
                <label className="mr-4 font-semibold text-text">Тоо ширхэг:</label>
                <button
                  onClick={() => setQuantity(quantity > 1 ? quantity - 1 : 1)}
                  className="p-3 rounded-full neumorphic-outer active:neumorphic-inner transition-all"
                >
                  <Minus size={16} className="text-text"/>
                </button>
                <input
                  type="text"
                  value={quantity}
                  onChange={handleQuantityChange}
                  className="w-16 text-center mx-2 p-2 rounded-lg bg-secondary neumorphic-inner text-lg font-bold text-primary"
                />
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-3 rounded-full neumorphic-outer active:neumorphic-inner transition-all"
                >
                  <Plus size={16} className="text-text"/>
                </button>
              </div>
              <button
                onClick={() => addToCart(product, quantity)}
                className="w-full flex items-center justify-center gap-2 py-3 px-6 rounded-lg bg-accent text-primary-dark font-bold neumorphic-outer active:neumorphic-inner transition-all"
              >
                <ShoppingCart size={20}/>
                Сагсанд хийх
              </button>
            </div>
          </div>
        </div>
        {/* Description */}
        <div className="mt-16 p-8 rounded-2xl neumorphic-outer bg-secondary">
          <h2 className="text-xl font-bold mb-4 text-primary">Бүтээгдэхүүний дэлгэрэнгүй</h2>
          <div className="prose max-w-none text-text" dangerouslySetInnerHTML={{ __html: product.description }}></div>
        </div>
      </div>
      <RelatedProducts products={relatedProducts} />
    </div>
  );
};

export default ProductPage;
