import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  MapPin, 
  Calendar, 
  Gauge, 
  Heart, 
  Phone, 
  MessageCircle,
  Car,
  CreditCard
} from "lucide-react";

interface CarCardProps {
  id: string;
  images: string[];
  title: string;
  price: number;
  currency: string;
  city: string;
  year: number;
  mileage: number;
  condition: string;
  operationType: 'sale' | 'rent' | 'buy';
  isReserved?: boolean;
  ownerName: string;
  ownerPhone: string;
}

const CarCard = ({
  images,
  title,
  price,
  currency,
  city,
  year,
  mileage,
  condition,
  operationType,
  isReserved = false,
  ownerName,
  ownerPhone
}: CarCardProps) => {
  const operationLabels = {
    sale: { text: 'للبيع', color: 'bg-success' },
    rent: { text: 'للتأجير', color: 'bg-warning' },
    buy: { text: 'مطلوب شراء', color: 'bg-primary' }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('ar-SY').format(price);
  };

  const handleWhatsAppContact = () => {
    const message = `مرحباً، أهتم بسيارة ${title} المعروضة ${operationLabels[operationType].text}`;
    const whatsappUrl = `https://wa.me/${ownerPhone}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="car-card relative">
      {/* الصورة الرئيسية */}
      <div className="relative h-48 md:h-56">
        <img
          src={images[0] || '/placeholder.svg'}
          alt={title}
          className="w-full h-full object-cover"
        />
        
        {/* شارة النوع */}
        <div className="absolute top-3 right-3">
          <Badge className={`${operationLabels[operationType].color} text-white`}>
            {operationLabels[operationType].text}
          </Badge>
        </div>

        {/* شارة محجوز */}
        {isReserved && (
          <div className="absolute top-3 left-3">
            <Badge variant="destructive">محجوز</Badge>
          </div>
        )}

        {/* زر المفضلة */}
        <button className="absolute bottom-3 right-3 p-2 bg-white/80 backdrop-blur-sm rounded-full hover:bg-white transition-colors">
          <Heart className="h-4 w-4 text-muted-foreground hover:text-destructive" />
        </button>

        {/* عدد الصور */}
        {images.length > 1 && (
          <div className="absolute bottom-3 left-3 px-2 py-1 bg-black/50 text-white text-xs rounded-md">
            +{images.length - 1} صور
          </div>
        )}
      </div>

      {/* محتوى البطاقة */}
      <div className="p-4">
        {/* العنوان والسعر */}
        <div className="mb-3">
          <h3 className="font-semibold text-lg text-foreground mb-1 line-clamp-1">
            {title}
          </h3>
          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold text-primary">
              {formatPrice(price)} {currency}
            </span>
            {operationType === 'rent' && (
              <span className="text-sm text-muted-foreground">/يوم</span>
            )}
          </div>
        </div>

        {/* تفاصيل السيارة */}
        <div className="grid grid-cols-2 gap-3 mb-4 text-sm text-muted-foreground">
          <div className="flex items-center space-x-reverse space-x-2">
            <MapPin className="h-4 w-4" />
            <span>{city}</span>
          </div>
          <div className="flex items-center space-x-reverse space-x-2">
            <Calendar className="h-4 w-4" />
            <span>{year}</span>
          </div>
          <div className="flex items-center space-x-reverse space-x-2">
            <Gauge className="h-4 w-4" />
            <span>{formatPrice(mileage)} كم</span>
          </div>
          <div className="flex items-center space-x-reverse space-x-2">
            <Car className="h-4 w-4" />
            <span>{condition}</span>
          </div>
        </div>

        {/* معلومات البائع */}
        <div className="border-t border-border pt-3 mb-4">
          <p className="text-sm text-muted-foreground">
            بواسطة: <span className="font-medium text-foreground">{ownerName}</span>
          </p>
        </div>

        {/* أزرار التواصل */}
        <div className="flex space-x-reverse space-x-2">
          <Button
            onClick={handleWhatsAppContact}
            className="flex-1 bg-green-600 hover:bg-green-700 text-white"
            disabled={isReserved}
          >
            <MessageCircle className="h-4 w-4 ml-2" />
            واتساب
          </Button>
          <Button
            variant="outline"
            className="px-4"
            disabled={isReserved}
          >
            <Phone className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            className="px-4"
          >
            <CreditCard className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CarCard;