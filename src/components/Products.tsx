import OrderModal from "@/components/OrderModal";
import ProductDetailsModal from "@/components/ProductDetailsModal";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";

interface Product {
  id: number;
  name: string;
  description: string;
  image: string;
  feature: string;
  icon: string;
  type?: string;
}

const Products: React.FC = () => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDetailsProduct, setSelectedDetailsProduct] =
    useState<Product | null>(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);

  // We'll create individual carousel refs for each product in the mapping function

  const products: Product[] = [
    {
      id: 1,
      name: "Куриный шашлык",
      description: "Лёгкий и сочный — то, что любят дети и взрослые",
      image: "/placeholder.svg",
      feature: "Вакуумная упаковка для свежести",
      icon: "✅",
      type: "kebab",
    },
    {
      id: 2,
      name: "Куриные крылышки",
      description: "Маринованные крылышки — идеальная закуска для пикника",
      image: "/placeholder.svg",
      feature: "Готовы за 10 минут",
      icon: "⏱",
      type: "chicken",
    },
    {
      id: 3,
      name: "Стейки",
      description: "Мясо премиум-класса для жарки на гриле или в духовке",
      image: "/placeholder.svg",
      feature: "Минимум усилий — максимум вкуса",
      icon: "🔥",
      type: "steak",
    },
    {
      id: 4,
      name: "Ребрышки",
      description: "Сочные ребрышки в фирменном маринаде — тают во рту",
      image: "/placeholder.svg",
      feature: "Идеальны для барбекю",
      icon: "🍖",
      type: "ribs",
    },
  ];

  const handleOrder = (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleShowDetails = (product: Product) => {
    setSelectedDetailsProduct(product);
    setIsDetailsModalOpen(true);
  };

  const handleCloseDetailsModal = () => {
    setIsDetailsModalOpen(false);
  };

  return (
    <section id="products" className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <h2 className="section-title text-center">
          Готовое мясо — только открой и жарь
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12 mx-auto max-w-6xl">
          {products.map((product) => {
            return (
              <div
                key={product.id}
                className="product-card flex flex-col h-full"
              >
                {/* Static product image */}
                <div className="relative overflow-hidden rounded-t-md">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="product-image w-full h-48 object-cover transition-transform duration-500 hover:scale-105"
                    loading="lazy"
                  />
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-xl font-semibold mb-2 text-gray-800">
                    {product.name}
                  </h3>
                  <p className="text-gray-600 mb-4">{product.description}</p>
                  <div className="flex items-center text-suretRed mb-4">
                    <span className="mr-2">{product.icon}</span>
                    <span className="font-medium">{product.feature}</span>
                  </div>
                  <div className="flex gap-2 mt-auto pt-4">
                    <Button
                      variant="outline"
                      className="flex-1 border-suretRed text-suretRed hover:bg-suretRed hover:text-white"
                      onClick={() => handleShowDetails(product)}
                    >
                      Подробнее
                    </Button>
                    <Button
                      className="flex-1 bg-suretRed hover:bg-red-800 text-white"
                      onClick={() => handleOrder(product)}
                    >
                      Заказать
                    </Button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {selectedProduct && (
        <OrderModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          product={selectedProduct}
        />
      )}

      {selectedDetailsProduct && (
        <ProductDetailsModal
          isOpen={isDetailsModalOpen}
          onClose={handleCloseDetailsModal}
          product={selectedDetailsProduct}
        />
      )}
    </section>
  );
};

export default Products;
