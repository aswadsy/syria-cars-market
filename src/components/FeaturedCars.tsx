import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import CarCard from "./CarCard";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Car {
  id: string;
  title: string;
  price: number;
  city: string;
  brand: string;
  model: string;
  year: number;
  condition: string;
  operation_type: string;
  status: string;
  whatsapp_number: string | null;
  images: string[];
  kilometers?: number;
}

const FeaturedCars = () => {
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const carsPerPage = 3;

  useEffect(() => {
    fetchCars();
  }, []);

  const fetchCars = async () => {
    try {
      const { data, error } = await supabase
        .from("cars")
        .select("*")
        .eq("status", "متاحة")
        .order("created_at", { ascending: false })
        .limit(6);

      if (error) throw error;
      
      // Keep the data in its original format
      setCars(data || []);
      
      
    } catch (error) {
      console.error("Error fetching cars:", error);
    } finally {
      setLoading(false);
    }
  };

  // Fallback dummy data if no cars in database
  const dummyCars: Car[] = [
    {
      id: "1",
      title: "تويوتا كامري 2020",
      price: 45000000,
      city: "دمشق", 
      brand: "تويوتا",
      model: "كامري",
      year: 2020,
      condition: "ممتاز",
      operation_type: "بيع",
      status: "متاحة",
      whatsapp_number: "+963987654321",
      images: ["/placeholder.svg"],
      kilometers: 50000
    },
    {
      id: "2",
      title: "كيا سيراتو 2019", 
      price: 35000000,
      city: "حلب",
      brand: "كيا",
      model: "سيراتو", 
      year: 2019,
      condition: "جيد جداً",
      operation_type: "بيع",
      status: "متاحة",
      whatsapp_number: "+963987654322",
      images: ["/placeholder.svg"],
      kilometers: 75000
    },
    {
      id: "3",
      title: "هيونداي إلنترا 2021",
      price: 200000,
      city: "دمشق",
      brand: "هيونداي",
      model: "إلنترا",
      year: 2021, 
      condition: "ممتاز",
      operation_type: "تأجير",
      status: "متاحة",
      whatsapp_number: "+963987654323",
      images: ["/placeholder.svg"],
      kilometers: 30000
    }
  ];

  const displayCars = cars.length > 0 ? cars : dummyCars;
  const totalPages = Math.ceil(displayCars.length / carsPerPage);

  const nextPage = () => {
    setCurrentPage((prev) => (prev + 1) % totalPages);
  };

  const prevPage = () => {
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
  };

  const currentCars = displayCars.slice(
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
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {[1,2,3].map((i) => (
                <div key={i} className="bg-card rounded-lg p-6 animate-pulse">
                  <div className="h-48 bg-muted rounded-lg mb-4"></div>
                  <div className="h-4 bg-muted rounded mb-2"></div>
                  <div className="h-4 bg-muted rounded w-3/4"></div>
                </div>
              ))}
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {currentCars.map((car) => (
                  <div key={car.id} className="fade-in">
                    <CarCard
                      id={car.id}
                      images={car.images.length > 0 ? car.images : ["/placeholder.svg"]}
                      title={car.title}
                      price={car.price}
                      currency="ل.س"
                      city={car.city}
                      year={car.year}
                      mileage={car.kilometers || 0}
                      condition={car.condition}
                      operationType={car.operation_type === "بيع" ? "sale" : 
                                   car.operation_type === "تأجير" ? "rent" : "sale"}
                      isReserved={car.status === "محجوزة"}
                      ownerName="المالك"
                      ownerPhone={car.whatsapp_number || "+963987654321"}
                    />
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
            </>
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