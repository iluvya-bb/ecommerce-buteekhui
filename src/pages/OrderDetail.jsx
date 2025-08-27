import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import API from "../services/api";

const OrderDetail = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await API.getOrder(id);
        setOrder(response.data.data);
      } catch (err) {
        setError("Захиалгын дэлгэрэнгүйг татахад алдаа гарлаа.");
      } finally {
        setLoading(false);
      }
    };
    fetchOrder();
  }, [id]);

  if (loading) return <div>Ачааллаж байна...</div>;
  if (error) return <div className="text-red-500">{error}</div>;
  if (!order) return <div>Захиалга олдсонгүй.</div>;

  return (
    <div className="container mx-auto py-12">
      <h1 className="text-4xl font-bold mb-8">
        Захиалгын дэлгэрэнгүй #{order.id}
      </h1>
      <div className="p-8 bg-white rounded-lg shadow-md">
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div>
            <p>
              <span className="font-semibold">Огноо:</span>{" "}
              {new Date(order.createdAt).toLocaleDateString()}
            </p>
            <p>
              <span className="font-semibold">Төлөв:</span> {order.status}
            </p>
          </div>
          <div>
            <p>
              <span className="font-semibold">Нийт дүн:</span> ₮
              {parseFloat(order.total).toFixed(2)}
            </p>
          </div>
        </div>
        <div>
          <h2 className="text-2xl font-bold mb-4">Бүтээгдэхүүнүүд</h2>
          <div className="space-y-4">
            {order.products.map((product) => (
              <div key={product.id} className="flex items-center">
                <img
                  src={
                    product.featuredImage
                      ? `${import.meta.env.VITE_API_URL}/${product.featuredImage}`
                      : "https://via.placeholder.com/150"
                  }
                  alt={product.name}
                  className="w-20 h-20 object-cover rounded-lg mr-4"
                />
                <div>
                  <h3 className="font-semibold">{product.name}</h3>
                  <p className="text-gray-500">
                    Тоо ширхэг: {product.OrderItem.quantity}
                  </p>
                  <p className="text-gray-500">
                    Үнэ: ₮{parseFloat(product.OrderItem.price).toFixed(2)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetail;
