import { ArrowLeft } from "lucide-react";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import SEO from "@/components/SEO";

const PrivacyPolicy: React.FC = () => {
  useEffect(() => {
    // Set page title
    document.title = "SURET - Политика конфиденциальности";
    // Scroll to top on page load
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <SEO 
        title="Политика конфиденциальности | SURET - Настоящий шашлык" 
        description="Политика конфиденциальности SURET - информация о сборе, хранении и использовании персональных данных клиентов в Кыргызстане."
        keywords="политика конфиденциальности, персональные данные, шашлык Бишкек, мясные продукты Кыргызстан, SURET"
        canonicalUrl="/privacy-policy"
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
            <span className="inline-flex items-center">
              <span className="mr-2">🔐</span>
              Политика конфиденциальности
            </span>
          </h1>
          <p className="text-gray-500 mb-6">
            Дата вступления в силу: 18 мая 2025 г.
          </p>

          <div className="text-gray-700">
            <p className="mb-4 text-sm leading-relaxed">
              Настоящая Политика конфиденциальности определяет порядок обработки
              персональных данных пользователей сайта SURET в соответствии с
              Законом Кыргызской Республики «О персональных данных».
            </p>

            <section className="mb-4">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                1. Сбор и использование информации
              </h2>
              <p className="mb-1 text-sm leading-relaxed">
                1.1. Сайт собирает минимальный объём информации: имя, номер
                телефона и регион пользователя.
              </p>
              <p className="mb-1 text-sm leading-relaxed">
                1.2. Информация используется исключительно для обратной связи и
                обработки заявок.
              </p>
            </section>

            <section className="mb-4">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                2. Хранение и безопасность
              </h2>
              <p className="mb-1 text-sm leading-relaxed">
                2.1. Данные не сохраняются в базах данных, а используются только
                для передачи в Telegram-бот через защищённый канал.
              </p>
              <p className="mb-1 text-sm leading-relaxed">
                2.2. Мы не передаём данные третьим лицам, кроме как в рамках
                исполнения заявки (доставка, оператор связи).
              </p>
            </section>

            <section className="mb-4">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                3. Права пользователя
              </h2>
              <p className="mb-1 text-sm leading-relaxed">
                3.1. Пользователь имеет право запросить удаление своих данных.
              </p>
              <p className="mb-1 text-sm leading-relaxed">
                3.2. Запрос направляется по email:{" "}
                <a
                  href="mailto:email@suret.kg"
                  className="text-suretRed hover:underline"
                >
                  email@suret.kg
                </a>{" "}
                или через Telegram.
              </p>
            </section>

            <section className="mb-4">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                4. Согласие
              </h2>
              <p className="mb-1 text-sm leading-relaxed">
                Оставляя заявку, пользователь выражает согласие на обработку
                своих персональных данных в указанных целях.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
