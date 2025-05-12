
import React from 'react';
import { Button } from "@/components/ui/button";
import { AspectRatio } from "@/components/ui/aspect-ratio";

const Hero: React.FC = () => {
  return (
    <section id="hero" className="py-16 md:py-24 bg-white relative">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
          {/* Левая часть с текстом */}
          <div className="w-full md:w-1/2 text-left">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-gray-800 animate-fade-in-up">
              Настоящий шашлык.<br />Без заморочек.
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-gray-600 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              Свежие мясные полуфабрикаты в натуральном маринаде — просто открой и готовь.
              Идеально для мангала, гриля и сковородки.
            </p>
            <Button 
              className="btn-primary text-lg px-8 py-6 animate-fade-in-up"
              style={{ animationDelay: '0.4s' }}
              onClick={() => document.getElementById('products')?.scrollIntoView()}
            >
              Посмотреть продукцию
            </Button>
          </div>
          
          {/* Правая часть с изображением */}
          <div className="w-full md:w-1/2 mt-8 md:mt-0 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
            <div className="rounded-2xl overflow-hidden shadow-xl">
              <AspectRatio ratio={4/3} className="bg-gray-100">
                <img 
                  src="/placeholder.svg" 
                  alt="Аппетитный шашлык" 
                  className="w-full h-full object-cover"
                  loading="eager"
                />
              </AspectRatio>
            </div>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-10 left-0 right-0 flex justify-center">
        <button 
          onClick={() => document.getElementById('about')?.scrollIntoView()}
          className="animate-bounce"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-10 w-10 text-suretRed" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </button>
      </div>
    </section>
  );
};

export default Hero;
