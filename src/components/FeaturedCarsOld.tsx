import { useState } from "react";
import CarCard from "./CarCard";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

const FeaturedCars = () => {
  // بيانات وهمية للسيارات المميزة
  const featuredCars = [
    {
      id: "1",
      images: ["/placeholder.svg"],
      title: "تويوتا كامري 2020",
      price: 45000000,
      currency: "ل.س",
      city: "دمشق",
      year: 2020,
      mileage: 50000,
      condition: "ممتاز",
      operationType: "sale" as const,
      isReserved: false,
      ownerName: "أحمد محمد",
      ownerPhone: "+963987654321"
    },
    {
      id: "2", 
      images: ["/placeholder.svg"],
      title: "كيا سيراتو 2019",
      price: 35000000,
      currency: "ل.س",
      city: "حلب",
      year: 2019,
      mileage: 75000,
      condition: "جيد جداً",
      operationType: "sale" as const,
      isReserved: false,
      ownerName: "محمد علي",
      ownerPhone: "+963987654322"
    },
    {
      id: "3",
      images: ["/placeholder.svg"],
      title: "هيونداي إلنترا 2021",
      price: 200000,
      currency: "ل.س",
      city: "دمشق",
      year: 2021,
      mileage: 30000,
      condition: "ممتاز",
      operationType: "rent" as const,
      isReserved: false,
      ownerName: "سارة أحمد",
      ownerPhone: "+963987654323"
    },
    {
      id: "4",
      images: ["/placeholder.svg"],
      title: "نيسان التيما 2018",
      price: 28000000,
      currency: "ل.س",
      city: "حمص",
      year: 2018,
      mileage: 90000,
      condition: "جيد",
      operationType: "sale" as const,
      isReserved: true,
      ownerName: "يوسف خالد",
      ownerPhone: "+963987654324"
    },
    {
      id: "5",
      images: ["/placeholder.svg"],
      title: "بي إم دبليو 320i 2017",
      price: 55000000,
      currency: "ل.س",
      city: "اللاذقية",
      year: 2017,
      mileage: 80000,
      condition: "ممتاز",
      operationType: "sale" as const,
      isReserved: false,
      ownerName: "رامي سعد",
      ownerPhone: "+963987654325"
    },
    {
      id: "6",
      images: ["/placeholder.svg"],
      title: "مرسيدس C180 2016",
      price: 48000000,
      currency: "ل.س",
      city: "طرطوس",
      year: 2016,
      mileage: 95000,
      condition: "جيد جداً",
      operationType: "sale" as const,
      isReserved: false,
      ownerName: "نور الدين",
      ownerPhone: "+963987654326"
    }
  ];

  const [currentPage, setCurrentPage] = useState(0);
  const carsPerPage = 3;
  const totalPages = Math.ceil(featuredCars.length / carsPerPage);

  const nextPage = () => {
    setCurrentPage((prev) => (prev + 1) % totalPages);
  };

  const prevPage = () => {
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
  };

  const currentCars = featuredCars.slice(
    currentPage * carsPerPage,
    (currentPage + 1) * carsPerPage
  );

  return (
    <section className="py-16 bg-gradient-subtle">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* العنوان */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            السيارات المميزة
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            اكتشف أفضل العروض والسيارات المميزة المتاحة حالياً في السوق السوري
          </p>
        </div>

        {/* شبكة السيارات */}
        <div className="relative">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {currentCars.map((car) => (
              <div key={car.id} className="fade-in">
                <CarCard {...car} />
              </div>
            ))}
          </div>

          {/* أزرار التنقل */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center space-x-reverse space-x-4">
              <Button
                variant="outline"
                size="sm"
                onClick={prevPage}
                className="p-2"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
              
              <div className="flex space-x-reverse space-x-2">
                {Array.from({ length: totalPages }, (_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentPage(i)}
                    className={`w-3 h-3 rounded-full transition-colors ${
                      i === currentPage ? 'bg-primary' : 'bg-muted-foreground/30'
                    }`}
                  />
                ))}
              </div>

              <Button
                variant="outline"
                size="sm"
                onClick={nextPage}
                className="p-2"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>

        {/* زر عرض المزيد */}
        <div className="text-center mt-12">
          <Button variant="outline" size="lg" className="px-8">
            عرض جميع السيارات
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedCars;