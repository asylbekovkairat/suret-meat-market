
import React from 'react';

const About: React.FC = () => {
  return (
    <section id="about" className="bg-suretGray py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="section-title">Вкус, который собирает семью за столом</h2>
          
          <div className="space-y-6 text-lg md:text-xl text-gray-700">
            <p>
              Мы — <span className="text-suretRed font-semibold">SURET</span>. Готовим мясо так, как делали бы для себя:
              из качественного сырья, без усилителей вкуса и химии.
            </p>
            <p>
              У нас нет секретов — только честный продукт и традиции, которые объединяют.
            </p>
          </div>
          
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md transform transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
              <div className="text-suretRed text-4xl font-bold mb-3">01</div>
              <h3 className="text-xl font-semibold mb-2">Натуральность</h3>
              <p className="text-gray-600">Только проверенное мясо и специи. Никаких усилителей вкуса и консервантов.</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md transform transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
              <div className="text-suretRed text-4xl font-bold mb-3">02</div>
              <h3 className="text-xl font-semibold mb-2">Семейность</h3>
              <p className="text-gray-600">Создаём продукты, которые помогают собирать близких людей за одним столом.</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md transform transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
              <div className="text-suretRed text-4xl font-bold mb-3">03</div>
              <h3 className="text-xl font-semibold mb-2">Честность</h3>
              <p className="text-gray-600">Прозрачный состав и открытые технологии — показываем как делаем.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
