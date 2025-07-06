
import React, { useState } from 'react';
import { Search, ShoppingCart, User, Heart, Menu, X } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { useWishlist } from '../contexts/WishlistContext';
import { useAuth } from '../contexts/AuthContext';
import LoginModal from './LoginModal';
import Cart from './Cart';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  const { items } = useCart();
  const { items: wishlistItems } = useWishlist();
  const { user, logout } = useAuth();

  const cartItemsCount = items.reduce((sum, item) => sum + item.quantity, 0);

  const categories = ['Electronics', 'Clothing', 'Home & Garden', 'Sports', 'Books'];

  return (
    <>
      <header className="bg-white shadow-md sticky top-0 z-50">
        {/* Top Bar */}
        <div className="bg-blue-600 text-white text-sm py-2">
          <div className="container mx-auto px-4 text-center">
            Free shipping on orders over $50! | Customer Service: 1-800-EASYMART
          </div>
        </div>

        {/* Main Header */}
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center space-x-4">
              <button
                className="md:hidden"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
              <h1 className="text-2xl font-bold text-blue-600">EasyMart</h1>
            </div>

            {/* Search Bar */}
            <div className="hidden md:flex flex-1 max-w-2xl mx-8">
              <div className="relative w-full">
                <input
                  type="text"
                  placeholder="Search products..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button className="bg-blue-600 text-white px-6 py-2 rounded-r-lg hover:bg-blue-700 transition-colors">
                  <Search size={20} />
                </button>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center space-x-4">
              <button className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <Heart size={24} />
                {wishlistItems.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center">
                    {wishlistItems.length}
                  </span>
                )}
              </button>
              
              <button 
                className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors"
                onClick={() => setIsCartOpen(true)}
              >
                <ShoppingCart size={24} />
                {cartItemsCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-blue-500 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center">
                    {cartItemsCount}
                  </span>
                )}
              </button>

              <div className="relative">
                {user ? (
                  <div className="flex items-center space-x-2">
                    <span className="hidden md:inline text-sm">Hi, {user.name}</span>
                    <button 
                      onClick={logout}
                      className="text-sm text-blue-600 hover:text-blue-800"
                    >
                      Logout
                    </button>
                  </div>
                ) : (
                  <button 
                    onClick={() => setIsLoginOpen(true)}
                    className="flex items-center space-x-1 p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <User size={24} />
                    <span className="hidden md:inline text-sm">Login</span>
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Mobile Search */}
          <div className="md:hidden mt-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search products..."
                className="w-full px-4 py-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button className="absolute right-0 top-0 bg-blue-600 text-white px-4 py-2 rounded-r-lg hover:bg-blue-700 transition-colors">
                <Search size={20} />
              </button>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className={`${isMenuOpen ? 'block' : 'hidden'} md:block bg-gray-100 border-t`}>
          <div className="container mx-auto px-4">
            <ul className="flex flex-col md:flex-row md:justify-center space-y-2 md:space-y-0 md:space-x-8 py-4">
              {categories.map((category) => (
                <li key={category}>
                  <a
                    href="#"
                    className="block px-4 py-2 text-gray-700 hover:text-blue-600 hover:bg-white rounded-lg transition-colors"
                  >
                    {category}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </nav>
      </header>

      <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
      <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
};

export default Header;
