import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import SEO from "@/components/SEO";

const UserAgreement: React.FC = () => {
  useEffect(() => {
    // Set page title
    document.title = "SURET - Пользовательское соглашение";
    // Scroll to top on page load
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <SEO 
        title="Пользовательское соглашение | SURET - Настоящий шашлык" 
        description="Пользовательское соглашение SURET - правила использования сайта, описание услуг, ответственность сторон и другие юридические положения для клиентов в Кыргызстане."
        keywords="пользовательское соглашение, правила использования, шашлык Бишкек, мясные продукты Кыргызстан, SURET"
        canonicalUrl="/user-agreement"
      />
      <div className="container mx-auto px-3 py-6 md:py-8">
        <Link 
          to="/" 
          className="inline-flex items-center text-gray-600 hover:text-suretRed transition-colors mb-6"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Вернуться на главную
        </Link>

        <div className="prose max-w-3xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Пользовательское соглашение
          </h1>
          <p className="text-gray-500 mb-6">
            Дата вступления в силу: 18 мая 2025 г.
          </p>

          <div className="text-gray-700">
            <p className="mb-4 text-sm leading-relaxed">
              Настоящее Пользовательское соглашение (далее — «Соглашение») регулирует использование сайта 
              <a href="https://suret.kg" className="text-suretRed hover:underline"> https://suret.kg</a> (далее — «Сайт»), 
              принадлежащего бренду SURET, осуществляющего деятельность на территории Кыргызской Республики.
            </p>

            <section className="mb-4">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">1. Общие положения</h2>
              <p className="mb-1 text-sm leading-relaxed">1.1. Используя данный Сайт, пользователь подтверждает своё согласие с условиями настоящего Соглашения.</p>
              <p className="mb-1 text-sm leading-relaxed">1.2. Если пользователь не согласен с условиями — использование сайта должно быть прекращено.</p>
            </section>

            <section className="mb-4">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">2. Описание услуг</h2>
              <p className="mb-1 text-sm leading-relaxed">2.1. Сайт предоставляет информацию о продуктах бренда и возможность отправки заявки на приобретение мясной продукции (шашлык, стейки и др.) без онлайн-оплаты.</p>
              <p className="mb-1 text-sm leading-relaxed">2.2. Доставка и расчёт осуществляются отдельно, после подтверждения заявки через мессенджеры.</p>
            </section>

            <section className="mb-4">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">3. Персональные данные</h2>
              <p className="mb-1 text-sm leading-relaxed">3.1. Пользователь добровольно предоставляет имя, телефон и город проживания при оформлении заявки.</p>
              <p className="mb-1 text-sm leading-relaxed">3.2. Обработка данных осуществляется согласно Закону Кыргызской Республики «О персональных данных».</p>
            </section>

            <section className="mb-4">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">4. Ответственность сторон</h2>
              <p className="mb-1 text-sm leading-relaxed">4.1. Компания не несёт ответственности за временные сбои в работе сайта.</p>
              <p className="mb-1 text-sm leading-relaxed">4.2. Пользователь обязуется не использовать сайт в противоправных целях.</p>
            </section>

            <section className="mb-4">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">5. Интеллектуальная собственность</h2>
              <p className="mb-1 text-sm leading-relaxed">5.1. Все изображения, тексты и элементы дизайна защищены законодательством и являются собственностью Компании.</p>
              <p className="mb-1 text-sm leading-relaxed">5.2. Их копирование и использование без разрешения запрещено.</p>
            </section>

            <section className="mb-4">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">6. Изменения в соглашении</h2>
              <p className="mb-1 text-sm leading-relaxed">Компания оставляет за собой право вносить изменения в настоящее Соглашение без предварительного уведомления.</p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserAgreement;
