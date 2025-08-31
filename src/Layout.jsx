import React, { useState, useContext } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Armchair,
  Search,
  ShoppingCart,
  User,
  Menu,
  X,
} from "lucide-react";
import { CartProvider, CartContext } from "./context/CartContext";
import CartDrawer from "./components/CartDrawer";
import { AuthContext } from "./context/AuthContext";
import { SettingsContext } from "./context/SettingsContext";

export default function Layout() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const { settings } = useContext(SettingsContext);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const logo = settings.logo ? `${import.meta.env.VITE_API_URL}/${settings.logo}` : null;

  const navLinks = [
    { to: "/products", text: "Бүтээгдэхүүн" },
    { to: "/about", text: "Бидний тухай" },
    { to: "/contact", text: "Холбоо барих" },
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/products?q=${searchTerm.trim()}`);
    }
  };

  const { itemAdded } = useContext(CartContext);

  return (
    <CartProvider>
      <div className="bg-secondary min-h-screen font-sans text-text w-screen flex flex-col">
        {/* Header & Navigation */}
        <header className="bg-secondary/80 backdrop-blur-lg sticky top-0 z-50 shadow-sm">
          <div className="max-w-[1800px] mx-auto px-6">
            <div className="flex justify-between items-center py-4">
              <motion.a
                href="/"
                className="flex items-center space-x-2 text-2xl font-bold text-primary"
                whileHover={{ scale: 1.05 }}
              >
                {logo ? (
                  <img src={logo} alt="Buteekhui.com" className="h-10" />
                ) : (
                  <Armchair size={28} />
                )}
                <span>Buteekhui.com</span>
              </motion.a>

              <div className="hidden lg:flex items-center space-x-8">
                {navLinks.map((link) => (
                  <motion.div key={link.to} whileHover={{ y: -2 }}>
                    <Link
                      to={link.to}
                      className="text-text hover:text-accent transition-colors duration-300"
                    >
                      {link.text}
                    </Link>
                  </motion.div>
                ))}
              </div>

              <div className="flex items-center space-x-4">
                <form onSubmit={handleSearch} className="relative">
                  <input
                    type="text"
                    placeholder="Хайх..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-48 px-4 py-2 border border-gray-300 rounded-lg bg-secondary text-text focus:outline-none focus:ring-2 focus:ring-accent"
                  />
                  <button
                    type="submit"
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-text-light hover:text-accent"
                  >
                    <Search size={22} />
                  </button>
                </form>
                <Link
                  to={user ? "/profile" : "/login"}
                  className="p-3 rounded-full neumorphic-outer active:neumorphic-inner transition-all"
                >
                  <User size={22} className="text-text-light hover:text-accent"/>
                </Link>
                <motion.button
                  onClick={() => setIsCartOpen(true)}
                  className="relative p-3 rounded-full neumorphic-outer active:neumorphic-inner transition-all"
                >
                  <ShoppingCart size={22} className="text-text-light hover:text-accent"/>
                  <CartItemsCount />
                </motion.button>
                <div className="lg:hidden">
                  <motion.button
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    aria-label="Toggle menu"
                    whileTap={{ scale: 0.9 }}
                    className="p-3 rounded-full neumorphic-outer active:neumorphic-inner transition-all"
                  >
                    {isMenuOpen ? <X size={24} className="text-text"/> : <Menu size={24} className="text-text"/>}
                  </motion.button>
                </div>
              </div>
            </div>
          </div>

          <AnimatePresence>
            {isMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="lg:hidden bg-white/80 backdrop-blur-md"
              >
                <div className="p-4">
                  {navLinks.map((link) => (
                    <Link
                      key={link.to}
                      to={link.to}
                      onClick={() => setIsMenuOpen(false)}
                      className="block text-center py-2 px-4 text-text-light hover:bg-secondary rounded-lg transition-colors duration-300"
                    >
                      {link.text}
                    </Link>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </header>

        <main className="flex-grow">
          <Outlet />
        </main>

        {/* Footer */}
        <footer className="bg-secondary text-text">
          <div className="max-w-[1800px] mx-auto px-6 py-12">
            <div className="grid md:grid-cols-4 gap-8">
              <div>
                <h3 className="text-lg font-bold mb-4 text-primary">Buteekhui.com</h3>
                <p className="text-text-light">
                  Сургалтын орчныг чанартай, загварлаг тавилгаар тохижуулна.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-bold mb-4 text-primary">Нэмэлт холбоос</h3>
                <ul className="space-y-2">
                  <li>
                    <Link
                      to="/about"
                      className="text-text-light hover:text-accent"
                    >
                      Бидний тухай
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/privacy"
                      className="text-text-light hover:text-accent"
                    >
                      Нууцлалын бодлого
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/terms"
                      className="text-text-light hover:text-accent"
                    >
                      Үйлчилгээний нөхцөл
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-bold mb-4 text-primary">Ангилал</h3>
                <ul className="space-y-2">
                  <li>
                    <Link
                      to="/categories/desks"
                      className="text-text-light hover:text-accent"
                    >
                      Ширээ, сандал
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/categories/library"
                      className="text-text-light hover:text-accent"
                    >
                      Номын сан
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/categories/classroom"
                      className="text-text-light hover:text-accent"
                    >
                      Анги танхим
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-bold mb-4 text-primary">Холбоо барих</h3>
                <ul className="space-y-2 text-text-light">
                  <li>Имэйл: {settings.contactEmail}</li>
                  <li>Утас: {settings.contactPhoneNumber}</li>
                </ul>
              </div>
            </div>
            <div className="mt-12 border-t border-gray-300 pt-8 text-center text-text-light">
              <p>
                &copy; {new Date().getFullYear()} Buteekhui.com. Бүх эрх хуулиар
                хамгаалагдсан.
              </p>
            </div>
          </div>
        </footer>
        <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      </div>
    </CartProvider>
  );
}

const CartItemsCount = () => {
  const { cartItems, itemAdded } = useContext(CartContext);
  const count = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return count > 0 ? (
    <motion.span 
      className="absolute -top-2 -right-2 min-w-[20px] h-5 px-1 bg-red-500 text-white text-xs rounded-full flex items-center justify-center z-10"
      animate={{ scale: itemAdded ? 1.5 : 1 }}
      transition={{ type: 'spring', stiffness: 500, damping: 10 }}
    >
      {count}
    </motion.span>
  ) : null;
};
