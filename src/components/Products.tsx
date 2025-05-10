
import React from 'react';
import { Button } from "@/components/ui/button";

interface Product {
  id: number;
  name: string;
  description: string;
  image: string;
  feature: string;
  icon: string;
}

const Products: React.FC = () => {
  const products: Product[] = [
    {
      id: 1,
      name: 'Шашлык из говядины',
      description: 'Нежная вырезка, маринованная в луке и специях',
      image: '/placeholder.svg',
      feature: 'Готов за 15 минут',
      icon: '⏱'
    },
    {
      id: 2,
      name: 'Шашлык из баранины',
      description: 'Традиционный восточный вкус — для ценителей',
      image: '/placeholder.svg',
      feature: 'Натуральный маринад без консервантов',
      icon: '🧄'
    },
    {
      id: 3,
      name: 'Куриный шашлык',
      description: 'Лёгкий и сочный — то, что любят дети и взрослые',
      image: '/placeholder.svg',
      feature: 'Вакуумная упаковка для свежести',
      icon: '✅'
    },
    {
      id: 4,
      name: 'Стейки и рёбра',
      description: 'Мясо премиум-класса для жарки на гриле или в духовке',
      image: '/placeholder.svg',
      feature: 'Минимум усилий — максимум вкуса',
      icon: '🔥'
    }
  ];

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
                <Button variant="outline" className="w-full border-suretRed text-suretRed hover:bg-suretRed hover:text-white">
                  Подробнее
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Products;
