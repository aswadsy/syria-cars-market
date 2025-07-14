import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Car, Menu, X, User, Plus } from "lucide-react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-card/80 backdrop-blur-md border-b border-border sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* الشعار */}
          <div className="flex items-center">
            <div className="flex items-center space-x-reverse space-x-3">
              <div className="p-2 bg-gradient-primary rounded-lg">
                <Car className="h-6 w-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="font-bold text-xl text-foreground">سوق السيارات</h1>
                <p className="text-sm text-muted-foreground">السوري</p>
              </div>
            </div>
          </div>

          {/* القائمة الرئيسية - شاشة كبيرة */}
          <div className="hidden md:flex items-center space-x-reverse space-x-8">
            <a href="/" className="text-foreground hover:text-primary transition-colors">
              الرئيسية
            </a>
            <a href="/cars" className="text-foreground hover:text-primary transition-colors">
              جميع السيارات
            </a>
            <a href="/sell" className="text-foreground hover:text-primary transition-colors">
              بيع سيارتك
            </a>
            <a href="/rent" className="text-foreground hover:text-primary transition-colors">
              تأجير
            </a>
            <a href="/about" className="text-foreground hover:text-primary transition-colors">
              من نحن
            </a>
          </div>

          {/* أزرار تسجيل الدخول */}
          <div className="hidden md:flex items-center space-x-reverse space-x-4">
            <Button variant="outline" className="flex items-center space-x-reverse space-x-2">
              <User className="h-4 w-4" />
              <span>تسجيل الدخول</span>
            </Button>
            <Button className="btn-hero flex items-center space-x-reverse space-x-2">
              <Plus className="h-4 w-4" />
              <span>أضف إعلان</span>
            </Button>
          </div>

          {/* زر القائمة - الهاتف */}
          <div className="md:hidden flex items-center">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="فتح القائمة"
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* القائمة المنسدلة - الهاتف */}
        {isMenuOpen && (
          <div className="md:hidden bg-card border-t border-border">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <a
                href="/"
                className="block px-3 py-2 text-foreground hover:text-primary hover:bg-muted rounded-md transition-colors"
              >
                الرئيسية
              </a>
              <a
                href="/cars"
                className="block px-3 py-2 text-foreground hover:text-primary hover:bg-muted rounded-md transition-colors"
              >
                جميع السيارات
              </a>
              <a
                href="/sell"
                className="block px-3 py-2 text-foreground hover:text-primary hover:bg-muted rounded-md transition-colors"
              >
                بيع سيارتك
              </a>
              <a
                href="/rent"
                className="block px-3 py-2 text-foreground hover:text-primary hover:bg-muted rounded-md transition-colors"
              >
                تأجير
              </a>
              <a
                href="/about"
                className="block px-3 py-2 text-foreground hover:text-primary hover:bg-muted rounded-md transition-colors"
              >
                من نحن
              </a>
              <div className="flex flex-col space-y-2 px-3 pt-4">
                <Button variant="outline" className="w-full">
                  تسجيل الدخول
                </Button>
                <Button className="btn-hero w-full">
                  أضف إعلان
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;