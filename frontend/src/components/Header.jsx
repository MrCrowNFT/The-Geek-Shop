import React from "react";
import { FaFacebook, FaTwitter, FaInstagram, FaEnvelope, FaHeart, FaShoppingCart } from "react-icons/fa"; // Using react-icons for social media and icons

const Header = () => {
  return (
    <header className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        {/* Left Side - Social Media and Mail Icon */}
        <div className="flex space-x-4">
          <a href="https://facebook.com" className="hover:text-blue-500">
            <FaFacebook size={24} />
          </a>
          <a href="https://twitter.com" className="hover:text-blue-400">
            <FaTwitter size={24} />
          </a>
          <a href="https://instagram.com" className="hover:text-pink-500">
            <FaInstagram size={24} />
          </a>
          <a href="mailto:info@marketplace.com" className="hover:text-gray-300">
            <FaEnvelope size={24} />
          </a>
        </div>

        {/* Center - Logo */}
        <div className="flex items-center space-x-4">
          <img src="/logo.png" alt="Marketplace Logo" className="h-8" />
          <span className="text-2xl font-bold">Marketplace</span>
        </div>

        {/* Right Side - Authentication & Icons */}
        <div className="flex items-center space-x-6">
          {/* Log In and Sign Up */}
          <div className="flex space-x-4">
            <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
              Log In
            </button>
            <button className="px-4 py-2 bg-yellow-400 text-black rounded hover:bg-yellow-500">
              Sign Up
            </button>
          </div>

          {/* Heart and Cart */}
          <div className="flex space-x-6">
            <a href="/liked" className="text-white hover:text-red-500">
              <FaHeart size={24} />
            </a>
            <a href="/cart" className="text-white hover:text-green-500">
              <FaShoppingCart size={24} />
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;