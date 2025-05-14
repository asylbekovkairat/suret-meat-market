
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import OrderModal from "@/components/OrderModal";

interface Product {
  id: number;
  name: string;
  description: string;
  image: string;
  feature: string;
  icon: string;
}

const Products: React.FC = () => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const products: Product[] = [
    {
      id: 1,
      name: 'Куриный шашлык',
      description: 'Лёгкий и сочный — то, что любят дети и взрослые',
      image: '/placeholder.svg',
      feature: 'Вакуумная упаковка для свежести',
      icon: '✅'
    },
    {
      id: 2,
      name: 'Куриные крылышки',
      description: 'Маринованные крылышки — идеальная закуска для пикника',
      image: '/placeholder.svg',
      feature: 'Готовы за 10 минут',
      icon: '⏱'
    },
    {
      id: 3,
      name: 'Стейки',
      description: 'Мясо премиум-класса для жарки на гриле или в духовке',
      image: '/placeholder.svg',
      feature: 'Минимум усилий — максимум вкуса',
      icon: '🔥'
    },
    {
      id: 4,
      name: 'Рёбра',
      description: 'Сочные рёбрышки в фирменном маринаде — настоящий деликатес',
      image: '/placeholder.svg',
      feature: 'Тают во рту',
      icon: '🔥'
    }
  ];

  const handleOrder = (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <section id="products" className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <h2 className="section-title text-center">Готовое мясо — только открой и жарь</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
          {products.map((product) => (
            <div key={product.id} className="product-card">
              <div className="relative overflow-hidden">
                <img 
                  src={product.image}
                  alt={product.name}
                  className="product-image transition-transform duration-500 hover:scale-110"
                  loading="lazy"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2 text-gray-800">{product.name}</h3>
                <p className="text-gray-600 mb-4">{product.description}</p>
                <div className="flex items-center text-suretRed mb-4">
                  <span className="mr-2">{product.icon}</span>
                  <span className="font-medium">{product.feature}</span>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" className="flex-1 border-suretRed text-suretRed hover:bg-suretRed hover:text-white">
                    Подробнее
                  </Button>
                  <Button 
                    className="flex-1 bg-suretRed hover:bg-red-800 text-white"
                    onClick={() => handleOrder(product)}
                  >
                    Заказать
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {selectedProduct && (
        <OrderModal 
          isOpen={isModalOpen} 
          onClose={handleCloseModal} 
          product={selectedProduct}
        />
      )}
    </section>
  );
};

export default Products;
