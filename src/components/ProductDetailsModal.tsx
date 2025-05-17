import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import useEmblaCarousel from "embla-carousel-react";
import React, { useState } from "react";
import { Button } from "./ui/button";

interface Product {
  id: number;
  name: string;
  description: string;
  image: string;
  feature: string;
  icon: string;
  type?: string;
  images: string[];
}

interface ProductDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product;
  onOrder?: (product: Product) => void;
}

const ProductDetailsModal: React.FC<ProductDetailsModalProps> = ({
  isOpen,
  onClose,
  product,
  onOrder,
}) => {
  // Desktop carousel setup with autoplay
  const [desktopEmblaRef, desktopEmblaApi] = useEmblaCarousel({ loop: true });

  // Mobile carousel setup with autoplay
  const [mobileEmblaRef, mobileEmblaApi] = useEmblaCarousel({ loop: true });

  // Track current slide indices
  const [desktopCurrentSlide, setDesktopCurrentSlide] = useState(0);
  const [mobileCurrentSlide, setMobileCurrentSlide] = useState(0);

  // Set up desktop slide change handler
  React.useEffect(() => {
    if (!desktopEmblaApi) return;

    // Update current slide index when slide changes
    const onSelect = () => {
      setDesktopCurrentSlide(desktopEmblaApi.selectedScrollSnap());
    };

    // Subscribe to select event
    desktopEmblaApi.on("select", onSelect);

    // Auto-advance slides
    const autoplay = setInterval(() => {
      if (desktopEmblaApi.canScrollNext()) {
        desktopEmblaApi.scrollNext();
      } else {
        desktopEmblaApi.scrollTo(0);
      }
    }, 4000);

    // Initial call to set correct initial state
    onSelect();

    // Cleanup
    return () => {
      desktopEmblaApi.off("select", onSelect);
      clearInterval(autoplay);
    };
  }, [desktopEmblaApi]);

  // Set up mobile slide change handler
  React.useEffect(() => {
    if (!mobileEmblaApi) return;

    // Update current slide index when slide changes
    const onSelect = () => {
      setMobileCurrentSlide(mobileEmblaApi.selectedScrollSnap());
    };

    // Subscribe to select event
    mobileEmblaApi.on("select", onSelect);

    // Auto-advance slides
    const autoplay = setInterval(() => {
      if (mobileEmblaApi.canScrollNext()) {
        mobileEmblaApi.scrollNext();
      } else {
        mobileEmblaApi.scrollTo(0);
      }
    }, 4000);

    // Initial call to set correct initial state
    onSelect();

    // Cleanup
    return () => {
      mobileEmblaApi.off("select", onSelect);
      clearInterval(autoplay);
    };
  }, [mobileEmblaApi]);

  // Additional product details (this would typically come from your backend)
  const productDetails = {
    composition: "Мясо курицы, специи, соль, перец",
    cookingTime: "15-20 минут",
    storageConditions: "Хранить при температуре от 0°C до +4°C",
    shelfLife: "5 дней с даты изготовления",
    weight: "500г",
    nutritionalInfo: {
      calories: "250 ккал",
      protein: "25г",
      fat: "15г",
      carbs: "5г",
    },
  };

  // Mock images for the carousel (in a real app, these would come from your backend)
  const images = product.images;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="p-4 md:p-6 overflow-y-auto sm:max-w-[95%] md:max-w-[1200px] lg:max-w-[1400px] sm:rounded-lg">
        <DialogHeader className="mb-2">
          <DialogTitle className="text-xl font-bold text-suretRed">
            {product.name}
          </DialogTitle>
          <DialogDescription className="text-sm">
            {product.description}
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col md:flex-row gap-4">
          {/* Image carousel - hidden on mobile */}
          <div className="hidden md:block w-full md:w-1/2">
            <div className="relative">
              <div className="overflow-hidden rounded-md" ref={desktopEmblaRef}>
                <div className="flex">
                  {images.map((src, index) => (
                    <div className="flex-[0_0_100%]" key={index}>
                      <img
                        src={src}
                        alt={`${product.name} ${index + 1}`}
                        className="w-full h-64 object-cover"
                        loading="lazy"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Carousel navigation dots */}
              <div className="flex justify-center mt-2 space-x-2">
                {images.map((_, index) => (
                  <button
                    key={`dot-${index}`}
                    className={`w-2 h-2 rounded-full ${
                      desktopCurrentSlide === index
                        ? "bg-suretRed"
                        : "bg-gray-300"
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            </div>

            <div className="flex items-center text-suretRed mt-2">
              <span className="mr-2">{product.icon}</span>
              <span className="font-medium text-sm">{product.feature}</span>
            </div>
          </div>

          {/* Product details */}
          <div className="w-full md:w-1/2">
            <div className="space-y-2">
              {/* Mobile carousel */}
              <div className="md:hidden mb-3">
                <div
                  className="overflow-hidden rounded-md"
                  ref={mobileEmblaRef}
                >
                  <div className="flex">
                    {images.map((src, index) => (
                      <div className="flex-[0_0_100%]" key={`mobile-${index}`}>
                        <img
                          src={src}
                          alt={`${product.name} ${index + 1}`}
                          className="w-full h-40 object-cover"
                          loading="lazy"
                        />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Mobile carousel navigation dots */}
                <div className="flex justify-center mt-2 space-x-2">
                  {images.map((_, index) => (
                    <button
                      key={`mobile-dot-${index}`}
                      className={`w-2 h-2 rounded-full ${
                        mobileCurrentSlide === index
                          ? "bg-suretRed"
                          : "bg-gray-300"
                      }`}
                      aria-label={`Go to slide ${index + 1}`}
                    />
                  ))}
                </div>
              </div>

              <div className="md:hidden flex items-center text-suretRed mb-3">
                <span className="mr-2">{product.icon}</span>
                <span className="font-medium text-sm">{product.feature}</span>
              </div>

              <div className="grid grid-cols-1 gap-2">
                <div className="flex flex-col w-full">
                  <h4 className="font-semibold text-gray-800 text-sm w-40 flex-shrink-0 whitespace-nowrap">
                    Состав:
                  </h4>
                  <p className="text-gray-600 text-sm whitespace-nowrap overflow-hidden ">
                    {productDetails.composition}
                  </p>
                </div>

                <div className="flex flex-col w-full">
                  <h4 className="font-semibold text-gray-800 text-sm w-40 flex-shrink-0 whitespace-nowrap">
                    Время приготовления:
                  </h4>
                  <p className="text-gray-600 text-sm whitespace-nowrap overflow-hidden ">
                    {productDetails.cookingTime}
                  </p>
                </div>

                <div className="flex flex-col w-full">
                  <h4 className="font-semibold text-gray-800 text-sm w-40 flex-shrink-0 whitespace-nowrap">
                    Условия хранения:
                  </h4>
                  <p className="text-gray-600 text-sm whitespace-nowrap overflow-hidden ">
                    {productDetails.storageConditions}
                  </p>
                </div>

                <div className="flex flex-col w-full">
                  <h4 className="font-semibold text-gray-800 text-sm w-40 flex-shrink-0 whitespace-nowrap">
                    Срок годности:
                  </h4>
                  <p className="text-gray-600 text-sm whitespace-nowrap overflow-hidden ">
                    {productDetails.shelfLife}
                  </p>
                </div>

                <div className="flex flex-col w-full">
                  <h4 className="font-semibold text-gray-800 text-sm w-40 flex-shrink-0 whitespace-nowrap">
                    Вес:
                  </h4>
                  <p className="text-gray-600 text-sm whitespace-nowrap overflow-hidden text-ellipsis">
                    {productDetails.weight}
                  </p>
                </div>
              </div>

              <div className="mt-3">
                <h4 className="font-semibold text-gray-800 text-sm mb-1">
                  Пищевая ценность (на 100г):
                </h4>
                <div className="grid grid-cols-2 gap-1 text-gray-600 text-sm">
                  <div>Калории: {productDetails.nutritionalInfo.calories}</div>
                  <div>Белки: {productDetails.nutritionalInfo.protein}</div>
                  <div>Жиры: {productDetails.nutritionalInfo.fat}</div>
                  <div>Углеводы: {productDetails.nutritionalInfo.carbs}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-4 flex justify-center gap-2">
          <Button
            onClick={() => {
              onClose();
              onOrder && onOrder(product);
            }}
            className="w-1/3 bg-suretGreen hover:bg-green-800 text-white"
          >
            Заказать
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProductDetailsModal;
