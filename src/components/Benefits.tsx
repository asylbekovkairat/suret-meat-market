
import React from 'react';
import { LeafyGreen, Package2, Timer, UsersRound, BadgeCheck, Star, Snowflake, Award } from "lucide-react";

interface Benefit {
  title: string;
  description: string;
  icon: React.ReactNode;
}

const Benefits: React.FC = () => {
  const benefits: Benefit[] = [
    {
      title: 'Специи из Италии',
      description: 'Используем только лучшие специи, доставленные напрямую из Италии',
      icon: <Star className="w-12 h-12 text-suretGreen" />
    },
    {
      title: 'Высокое качество продукции',
      description: 'Работаем только с проверенными поставщиками и тщательно отбираем сырье',
      icon: <BadgeCheck className="w-12 h-12 text-suretGreen" />
    },
    {
      title: 'Хранение до 90 суток',
      description: 'Продукция сохраняет все свои качества при температуре -18°C до 90 суток',
      icon: <Snowflake className="w-12 h-12 text-suretGreen" />
    },
    {
      title: 'Халяльная продукция',
      description: 'Вся наша продукция соответствует стандартам Халяль',
      icon: <BadgeCheck className="w-12 h-12 text-suretGreen" />
    },
    {
      title: 'Международные стандарты',
      description: 'Производство и контроль качества по международным стандартам',
      icon: <Award className="w-12 h-12 text-suretGreen" />
    },
    {
      title: 'Удобная и красивая упаковка',
      description: 'Современная вакуумная упаковка сохраняет свежесть и удобна в использовании',
      icon: <Package2 className="w-12 h-12 text-suretGreen" />
    }
  ];

  return (
    <section id="benefits" className="bg-suretGray py-16 md:py-24">
      <div className="container mx-auto px-4">
        <h2 className="section-title text-center">Почему выбирают SURET</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {benefits.map((benefit, index) => (
            <div key={index} className="benefit-card transform transition-all duration-300 hover:-translate-y-1">
              <div className="flex flex-col items-center text-center">
                <div className="mb-4">
                  {benefit.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2 text-gray-800">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Benefits;
