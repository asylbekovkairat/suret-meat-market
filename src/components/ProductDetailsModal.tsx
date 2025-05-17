
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
  const isMobile = useIsMobile();
  
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
    "/placeholder.svg"
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
                    <CarouselItem key={index}>
                      <div className="p-1">
                        <div className="overflow-hidden rounded-md">
                          <img
                            src={src}
                            alt={`${product.name} ${index + 1}`}
                            className={cn(
                              "w-full object-cover rounded-md", 
                              isMobile ? "h-48" : "h-64"
                            )}
                            loading="lazy"
                          />
                        </div>
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="left-2" />
                <CarouselNext className="right-2" />
              </Carousel>
              
              <div className="flex items-center text-suretRed mt-2">
                <span className="mr-2">{product.icon}</span>
                <span className="font-medium text-sm">{product.feature}</span>
              </div>
            </div>

            {/* Product details */}
            <div className={cn("w-full", !isMobile && "md:w-1/2")}>
              <div className="space-y-3">
                <div className="grid grid-cols-1 gap-2">
                  <DetailRow label="Состав:" value={productDetails.composition} />
                  <DetailRow label="Время приготовления:" value={productDetails.cookingTime} />
                  <DetailRow label="Условия хранения:" value={productDetails.storageConditions} />
                  <DetailRow label="Срок годности:" value={productDetails.shelfLife} />
                  <DetailRow label="Вес:" value={productDetails.weight} />
                </div>

                <div className="mt-4">
                  <h4 className="font-semibold text-gray-800 text-sm mb-2">
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
