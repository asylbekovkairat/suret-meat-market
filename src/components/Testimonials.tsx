
import React from 'react';

interface Testimonial {
  id: number;
  content: string;
  author: string;
  location: string;
}

const Testimonials: React.FC = () => {
  const testimonials: Testimonial[] = [
    {
      id: 1,
      content: 'Это не просто полуфабрикат — это реально вкусный шашлык. Мясо мягкое, вкус — как на даче у дяди!',
      author: 'Айбек',
      location: 'Бишкек'
    },
    {
      id: 2,
      content: 'Готовлю дома на сковородке — дети в восторге. Супер удобно и без возни.',
      author: 'Динара',
      location: 'Ош'
    },
    {
      id: 3,
      content: 'Используем в нашем кафе уже полгода. Клиенты довольны, качество стабильное, а нам меньше хлопот с заготовкой.',
      author: 'Ресторан "У Тимура"',
      location: 'Бишкек'
    }
  ];

  return (
    <section id="testimonials" className="bg-suretGray py-16 md:py-24">
      <div className="container mx-auto px-4">
        <h2 className="section-title text-center">Что говорят наши клиенты</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="testimonial-card">
              <div className="flex flex-col h-full">
                <div className="text-4xl text-suretRed mb-4">"</div>
                <p className="text-gray-700 mb-4 flex-grow">{testimonial.content}</p>
                <div className="border-t pt-4 mt-auto">
                  <p className="font-semibold text-gray-800">{testimonial.author}</p>
                  <p className="text-gray-500">{testimonial.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
