
import React from 'react';
import { Button } from "@/components/ui/button";

const Locations: React.FC = () => {
  return (
    <section id="locations" className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <h2 className="section-title text-center">Где найти SURET</h2>
        <p className="section-subtitle text-center">
          Мы доступны в магазинах города и доставляем напрямую.<br />
          Партнёрам предлагаем стабильное качество и поставки без сбоев.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-12">
          {/* Map */}
          <div className="bg-gray-200 rounded-lg overflow-hidden h-[400px]">
            {/* Placeholder for map - in a real project this would be Google Maps or similar */}
            <div className="w-full h-full flex items-center justify-center">
              <p className="text-gray-500">Карта точек продаж</p>
            </div>
          </div>
          
          {/* Info */}
          <div className="flex flex-col justify-center">
            <h3 className="text-2xl font-semibold mb-6">Точки продаж</h3>
            
            <div className="space-y-4 mb-8">
              <div className="flex items-start">
                <div className="text-suretRed mr-3 mt-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-medium">Гипермаркет "Глобус"</h4>
                  <p className="text-gray-600">ул. Киевская 148, Бишкек</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="text-suretRed mr-3 mt-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-medium">Супермаркет "Народный"</h4>
                  <p className="text-gray-600">пр. Чуй 155, Бишкек</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="text-suretRed mr-3 mt-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-medium">Магазин "Фрунзе"</h4>
                  <p className="text-gray-600">ул. Фрунзе 300, Бишкек</p>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Button className="bg-suretRed hover:bg-red-700">
                Все точки продаж
              </Button>
              <Button variant="outline" className="border-suretRed text-suretRed hover:bg-suretRed hover:text-white">
                Стать партнёром
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Locations;
