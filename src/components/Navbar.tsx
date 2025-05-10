
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'}`}>
      <div className="container mx-auto px-4 flex justify-between items-center">
        <a href="#" className="flex items-center">
          <span className={`font-display font-bold text-2xl ${isScrolled ? 'text-suretRed' : 'text-white'}`}>SURET</span>
        </a>
        
        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-6">
          <a href="#about" className={`${isScrolled ? 'text-gray-800' : 'text-white'} hover:text-suretRed transition-colors`}>О нас</a>
          <a href="#products" className={`${isScrolled ? 'text-gray-800' : 'text-white'} hover:text-suretRed transition-colors`}>Продукция</a>
          <a href="#benefits" className={`${isScrolled ? 'text-gray-800' : 'text-white'} hover:text-suretRed transition-colors`}>Преимущества</a>
          <a href="#process" className={`${isScrolled ? 'text-gray-800' : 'text-white'} hover:text-suretRed transition-colors`}>Как мы готовим</a>
          <a href="#testimonials" className={`${isScrolled ? 'text-gray-800' : 'text-white'} hover:text-suretRed transition-colors`}>Отзывы</a>
          <a href="#locations" className={`${isScrolled ? 'text-gray-800' : 'text-white'} hover:text-suretRed transition-colors`}>Где купить</a>
          <a href="#contact">
            <Button variant="default" className="bg-suretRed hover:bg-red-700">
              Контакты
            </Button>
          </a>
        </div>
        
        {/* Mobile menu button */}
        <button 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className={`h-6 w-6 ${isScrolled ? 'text-gray-800' : 'text-white'}`}
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            {isMobileMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>
      
      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white w-full shadow-lg animate-fade-in">
          <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
            <a href="#about" onClick={() => setIsMobileMenuOpen(false)} className="text-gray-800 hover:text-suretRed transition-colors">О нас</a>
            <a href="#products" onClick={() => setIsMobileMenuOpen(false)} className="text-gray-800 hover:text-suretRed transition-colors">Продукция</a>
            <a href="#benefits" onClick={() => setIsMobileMenuOpen(false)} className="text-gray-800 hover:text-suretRed transition-colors">Преимущества</a>
            <a href="#process" onClick={() => setIsMobileMenuOpen(false)} className="text-gray-800 hover:text-suretRed transition-colors">Как мы готовим</a>
            <a href="#testimonials" onClick={() => setIsMobileMenuOpen(false)} className="text-gray-800 hover:text-suretRed transition-colors">Отзывы</a>
            <a href="#locations" onClick={() => setIsMobileMenuOpen(false)} className="text-gray-800 hover:text-suretRed transition-colors">Где купить</a>
            <a href="#contact" onClick={() => setIsMobileMenuOpen(false)}>
              <Button variant="default" className="w-full bg-suretRed hover:bg-red-700">
                Контакты
              </Button>
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
