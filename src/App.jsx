import React from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import Home from "./pages/Home";
import Categories from "./pages/Categories";
import Featured from "./pages/Featured";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import Desks from "./pages/Desks";
import Library from "./pages/Library";
import Classroom from "./pages/Classroom";
import NotFound from "./pages/NotFound";
import Products from "./pages/Products";
import ProductPage from "./pages/Product";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import Checkout from "./pages/Checkout";
import OrderSuccess from "./pages/OrderSuccess";
import OrderDetail from "./pages/OrderDetail";
import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";
import { SettingsProvider } from "./context/SettingsContext";
import ProtectedRoute from "./components/ProtectedRoute";

// NOTE: Make sure you have framer-motion and lucide-react installed:
// npm install framer-motion lucide-react

// Main App Component - E-commerce Homepage
export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <SettingsProvider>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="products" element={<Products />} />
              <Route path="product/:id" element={<ProductPage />} />
              <Route path="categories" element={<Categories />} />
              <Route path="featured" element={<Featured />} />
              <Route path="about" element={<About />} />
              <Route path="contact" element={<Contact />} />
              <Route path="privacy" element={<Privacy />} />
              <Route path="terms" element={<Terms />} />
              <Route path="categories/desks" element={<Desks />} />
              <Route path="categories/library" element={<Library />} />
              <Route path="categories/classroom" element={<Classroom />} />
              <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/order-success" element={<OrderSuccess />} />
              <Route path="/orders/:id" element={<ProtectedRoute><OrderDetail /></ProtectedRoute>} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </SettingsProvider>
      </CartProvider>
    </AuthProvider>
  );
}
