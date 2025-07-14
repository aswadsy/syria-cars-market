import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Car, Shield, Clock } from "lucide-react";
import heroImage from "@/assets/hero-cars.jpg";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center">
      {/* الخلفية */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="سوق السيارات السوري"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-primary/70"></div>
      </div>

      {/* المحتوى */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center lg:text-right">
          <div className="fade-in">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
              <span className="block">أكبر سوق للسيارات</span>
              <span className="block text-accent">في سوريا</span>
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto lg:mx-0">
              ابحث عن سيارتك المناسبة من بين آلاف السيارات المتاحة للبيع والشراء والتأجير
            </p>
          </div>

          {/* شريط البحث */}
          <div className="slide-up mb-12">
            <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 shadow-strong max-w-4xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                <select className="px-4 py-3 border border-border rounded-lg bg-background focus:ring-2 focus:ring-primary focus:border-transparent">
                  <option>نوع العملية</option>
                  <option>للبيع</option>
                  <option>للشراء</option>
                  <option>للتأجير</option>
                </select>
                <select className="px-4 py-3 border border-border rounded-lg bg-background focus:ring-2 focus:ring-primary focus:border-transparent">
                  <option>المدينة</option>
                  <option>دمشق</option>
                  <option>حلب</option>
                  <option>حمص</option>
                  <option>اللاذقية</option>
                  <option>طرطوس</option>
                </select>
                <select className="px-4 py-3 border border-border rounded-lg bg-background focus:ring-2 focus:ring-primary focus:border-transparent">
                  <option>الماركة</option>
                  <option>تويوتا</option>
                  <option>كيا</option>
                  <option>هيونداي</option>
                  <option>نيسان</option>
                  <option>بي إم دبليو</option>
                </select>
                <Input
                  placeholder="السعر الأقصى"
                  className="px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
              <Button className="btn-hero w-full py-4 text-lg flex items-center justify-center space-x-reverse space-x-2">
                <Search className="h-5 w-5" />
                <span>ابحث الآن</span>
              </Button>
            </div>
          </div>

          {/* المميزات */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center text-white fade-in">
              <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-4">
                <Car className="h-8 w-8 text-accent-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-2">أكثر من 10,000 سيارة</h3>
              <p className="text-white/80">تشكيلة واسعة من السيارات الجديدة والمستعملة</p>
            </div>
            <div className="text-center text-white fade-in" style={{ animationDelay: '0.1s' }}>
              <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-accent-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-2">آمان وثقة</h3>
              <p className="text-white/80">جميع الإعلانات محققة ومضمونة</p>
            </div>
            <div className="text-center text-white fade-in" style={{ animationDelay: '0.2s' }}>
              <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="h-8 w-8 text-accent-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-2">متاح 24/7</h3>
              <p className="text-white/80">تصفح واشتري في أي وقت تريد</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;