
import React from 'react';
import { LeafyGreen, Package2, Timer, UsersRound } from "lucide-react";

interface Benefit {
  title: string;
  description: string;
  icon: React.ReactNode;
}

const Benefits: React.FC = () => {
  const benefits: Benefit[] = [
    {
      title: '100% натуральное мясо',
      description: 'Работаем только с проверенными поставщиками и тщательно отбираем сырье',
      icon: <LeafyGreen className="w-12 h-12 text-suretGreen" />
    },
    {
      title: 'Без химии и Е-добавок',
      description: 'В наших продуктах нет консервантов, красителей и усилителей вкуса',
      icon: <LeafyGreen className="w-12 h-12 text-suretGreen" />
    },
    {
      title: 'Удобная и красивая упаковка',
      description: 'Современная вакуумная упаковка сохраняет свежесть и удобна в использовании',
      icon: <Package2 className="w-12 h-12 text-suretGreen" />
    },
    {
      title: 'Экономия времени: готово к жарке',
      description: 'Не нужно мариновать и подготавливать — просто достаньте из упаковки и готовьте',
      icon: <Timer className="w-12 h-12 text-suretGreen" />
    },
    {
      title: 'Для семьи, друзей и кафе',
      description: 'Предлагаем решения как для домашнего использования, так и для бизнеса',
      icon: <UsersRound className="w-12 h-12 text-suretGreen" />
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
