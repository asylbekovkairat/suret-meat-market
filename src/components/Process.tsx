
import React from 'react';

interface Step {
  number: number;
  title: string;
  description: string;
}

const Process: React.FC = () => {
  const steps: Step[] = [
    {
      number: 1,
      title: 'Выбираем лучшее мясо',
      description: 'От проверенных поставщиков с контролем качества'
    },
    {
      number: 2,
      title: 'Маринуем по авторским рецептам',
      description: 'Без усилителей вкуса и консервантов'
    },
    {
      number: 3,
      title: 'Упаковываем вакуумно',
      description: 'Сохраняем свежесть и вкус продукта'
    },
    {
      number: 4,
      title: 'Доставляем в охлаждённом виде',
      description: 'Строго соблюдая температурный режим'
    },
    {
      number: 5,
      title: 'Ты просто открываешь — и жаришь',
      description: 'Наслаждаешься вкусным мясом без хлопот'
    }
  ];

  return (
    <section id="process" className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <h2 className="section-title text-center">Как рождается вкус</h2>
        
        <div className="mt-16 relative">
          {/* Progress Line */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-1 bg-suretRed transform -translate-x-1/2"></div>
          
          <div className="space-y-24">
            {steps.map((step, index) => (
              <div 
                key={index} 
                className={`relative flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-center`}
              >
                {/* Step Number Circle */}
                <div className="z-10 flex items-center justify-center w-16 h-16 bg-suretRed text-white rounded-full font-bold text-xl mb-4 md:mb-0">
                  {step.number}
                </div>
                
                {/* Content */}
                <div 
                  className={`md:w-5/12 p-6 bg-white rounded-lg shadow-md ${
                    index % 2 === 0 ? 'md:ml-8' : 'md:mr-8'
                  }`}
                >
                  <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Process;
