
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import React from "react";
import { Button } from "./ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";

interface Product {
  id: number;
  name: string;
  description: string;
  image: string;
  feature: string;
  icon: string;
  type?: string;
}

interface ProductDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product;
}

const ProductDetailsModal: React.FC<ProductDetailsModalProps> = ({
  isOpen,
  onClose,
  product,
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
  const images = [
    product.image,
    "/placeholder.svg",
    "/placeholder.svg",
    "/placeholder.svg",
    "/placeholder.svg",
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className={cn(
        "sm:max-w-[90%] md:max-w-[600px] p-0 overflow-hidden",
        "max-h-[90vh] md:max-h-[80vh]"
      )}>
        <div className="p-4 md:p-6 overflow-y-auto">
          <DialogHeader className="mb-4">
            <DialogTitle className="text-xl font-bold text-suretRed">
              {product.name}
            </DialogTitle>
            <DialogDescription className="text-sm">
              {product.description}
            </DialogDescription>
          </DialogHeader>

          <div className="flex flex-col md:flex-row gap-6">
            {/* Image carousel - optimized for both mobile and desktop */}
            <div className={cn(
              "w-full", 
              isMobile ? "mb-4" : "md:w-1/2"
            )}>
              <Carousel className="w-full">
                <CarouselContent>
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

              <div className="grid grid-cols-1 gap-1">
                <div className="flex flex-row">
                  <h4 className="font-semibold text-gray-800 text-sm w-1/2">
                    Состав:
                  </h4>
                  <p className="text-gray-600 text-sm">
                    {productDetails.composition}
                  </p>
                </div>

                <div className="flex flex-row">
                  <h4 className="font-semibold text-gray-800 text-sm w-1/2">
                    Время приготовления:
                  </h4>
                  <p className="text-gray-600 text-sm">
                    {productDetails.cookingTime}
                  </p>
                </div>

                <div className="flex flex-row">
                  <h4 className="font-semibold text-gray-800 text-sm w-1/2">
                    Условия хранения:
                  </h4>
                  <p className="text-gray-600 text-sm">
                    {productDetails.storageConditions}
                  </p>
                </div>

                <div className="flex flex-row">
                  <h4 className="font-semibold text-gray-800 text-sm w-1/2">
                    Срок годности:
                  </h4>
                  <p className="text-gray-600 text-sm">
                    {productDetails.shelfLife}
                  </p>
                </div>

                <div className="flex flex-row">
                  <h4 className="font-semibold text-gray-800 text-sm w-1/2">
                    Вес:
                  </h4>
                  <p className="text-gray-600 text-sm">
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

          <div className="mt-6 flex justify-end">
            <Button
              variant="outline"
              onClick={onClose}
              className="border-suretRed text-suretRed hover:bg-suretRed hover:text-white"
            >
              Закрыть
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

// Small helper component for consistent detail rows
const DetailRow = ({ label, value }: { label: string; value: string }) => (
  <div className="flex flex-row">
    <h4 className="font-semibold text-gray-800 text-sm w-1/2">
      {label}
    </h4>
    <p className="text-gray-600 text-sm">
      {value}
    </p>
  </div>
);

export default ProductDetailsModal;
