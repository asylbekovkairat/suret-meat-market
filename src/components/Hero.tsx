
import React from 'react';
import { Button } from "@/components/ui/button";

const Hero: React.FC = () => {
  return (
    <section id="hero" className="relative h-screen flex items-center justify-center text-white overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <img 
          src="/placeholder.svg" 
          alt="Аппетитный шашлык" 
          className="w-full h-full object-cover"
          loading="eager"
        />
      </div>
      
      <div className="container mx-auto px-4 z-10 text-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 animate-fade-in-up">
          Настоящий шашлык.<br />Без заморочек.
        </h1>
        <p className="text-xl md:text-2xl mb-8 max-w-xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
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
      
      <div className="absolute bottom-10 left-0 right-0 flex justify-center">
        <button 
          onClick={() => document.getElementById('about')?.scrollIntoView()}
          className="animate-bounce"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-10 w-10" 
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
