import { Car, Phone, Mail, MapPin, Facebook, Instagram, Twitter } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* معلومات الشركة */}
          <div>
            <div className="flex items-center space-x-reverse space-x-3 mb-4">
              <div className="p-2 bg-accent rounded-lg">
                <Car className="h-6 w-6 text-accent-foreground" />
              </div>
              <div>
                <h3 className="font-bold text-xl">سوق السيارات</h3>
                <p className="text-sm text-primary-foreground/80">السوري</p>
              </div>
            </div>
            <p className="text-primary-foreground/80 mb-4">
              أكبر منصة لبيع وشراء وتأجير السيارات في سوريا. نوفر لك أفضل العروض وأكثر الخيارات تنوعاً.
            </p>
            <div className="flex space-x-reverse space-x-4">
              <a href="#" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* روابط سريعة */}
          <div>
            <h4 className="font-semibold text-lg mb-4">روابط سريعة</h4>
            <ul className="space-y-2">
              <li>
                <a href="/" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  الرئيسية
                </a>
              </li>
              <li>
                <a href="/cars" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  جميع السيارات
                </a>
              </li>
              <li>
                <a href="/sell" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  بيع سيارتك
                </a>
              </li>
              <li>
                <a href="/rent" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  تأجير السيارات
                </a>
              </li>
              <li>
                <a href="/about" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  من نحن
                </a>
              </li>
            </ul>
          </div>

          {/* الخدمات */}
          <div>
            <h4 className="font-semibold text-lg mb-4">خدماتنا</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  بيع السيارات
                </a>
              </li>
              <li>
                <a href="#" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  شراء السيارات
                </a>
              </li>
              <li>
                <a href="#" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  تأجير السيارات
                </a>
              </li>
              <li>
                <a href="#" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  تقييم السيارات
                </a>
              </li>
              <li>
                <a href="#" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  صيانة وخدمات
                </a>
              </li>
            </ul>
          </div>

          {/* معلومات الاتصال */}
          <div>
            <h4 className="font-semibold text-lg mb-4">تواصل معنا</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-reverse space-x-3">
                <Phone className="h-5 w-5 text-accent" />
                <span className="text-primary-foreground/80">+963 11 123 4567</span>
              </div>
              <div className="flex items-center space-x-reverse space-x-3">
                <Mail className="h-5 w-5 text-accent" />
                <span className="text-primary-foreground/80">info@syria-cars.com</span>
              </div>
              <div className="flex items-start space-x-reverse space-x-3">
                <MapPin className="h-5 w-5 text-accent mt-1" />
                <span className="text-primary-foreground/80">
                  دمشق، سوريا<br />
                  شارع الثورة، بناء رقم 123
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* الخط السفلي */}
        <div className="border-t border-primary-foreground/20 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-primary-foreground/80 text-sm mb-4 md:mb-0">
              © 2024 سوق السيارات السوري. جميع الحقوق محفوظة.
            </p>
            <div className="flex space-x-reverse space-x-6 text-sm">
              <a href="#" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                الشروط والأحكام
              </a>
              <a href="#" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                سياسة الخصوصية
              </a>
              <a href="#" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                اتفاقية الاستخدام
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;