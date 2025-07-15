import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";

const AddCar = () => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    city: "",
    brand: "",
    model: "",
    year: "",
    condition: "",
    kilometers: "",
    operation_type: "",
    whatsapp_number: ""
  });

  const navigate = useNavigate();
  const { toast } = useToast();

  const cities = [
    "دمشق", "حلب", "حمص", "حماه", "اللاذقية", "طرطوس", "درعا", "السويداء", 
    "القنيطرة", "دير الزور", "الحسكة", "الرقة", "إدلب", "ريف دمشق"
  ];

  const brands = [
    "تويوتا", "نيسان", "هيونداي", "كيا", "شيفروليه", "فورد", "هوندا", "مازدا",
    "ميتسوبيشي", "سوزوكي", "رينو", "بيجو", "سكودا", "فولكس واغن", "أخرى"
  ];

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      navigate("/auth");
    } else {
      setUser(session.user);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast({
        variant: "destructive",
        title: "خطأ",
        description: "يجب تسجيل الدخول أولاً",
      });
      return;
    }

    setLoading(true);

    try {
      const { error } = await supabase
        .from("cars")
        .insert({
          user_id: user.id,
          title: formData.title,
          description: formData.description,
          price: parseFloat(formData.price),
          city: formData.city,
          brand: formData.brand,
          model: formData.model,
          year: parseInt(formData.year),
          condition: formData.condition,
          kilometers: formData.kilometers ? parseInt(formData.kilometers) : null,
          operation_type: formData.operation_type,
          whatsapp_number: formData.whatsapp_number,
          status: "متاحة"
        });

      if (error) throw error;

      toast({
        title: "تم إضافة الإعلان بنجاح",
        description: "سيظهر إعلانك في الصفحة الرئيسية قريباً",
      });

      navigate("/dashboard");
    } catch (error) {
      console.error("Error adding car:", error);
      toast({
        variant: "destructive",
        title: "خطأ في إضافة الإعلان",
        description: "حدث خطأ أثناء إضافة الإعلان",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center gap-4 mb-8">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => navigate("/dashboard")}
              className="gap-2"
            >
              <ArrowRight className="h-4 w-4" />
              العودة لوحة التحكم
            </Button>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">إضافة إعلان جديد</CardTitle>
              <CardDescription>
                أضف معلومات السيارة لإنشاء إعلان جديد
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="title">عنوان الإعلان *</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => handleInputChange("title", e.target.value)}
                    placeholder="مثال: تويوتا كامري 2020 للبيع"
                    required
                    dir="rtl"
                  />
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="operation_type">نوع العملية *</Label>
                    <Select onValueChange={(value) => handleInputChange("operation_type", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="اختر نوع العملية" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="بيع">بيع</SelectItem>
                        <SelectItem value="شراء">شراء</SelectItem>
                        <SelectItem value="تأجير">تأجير</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="price">السعر (ل.س) *</Label>
                    <Input
                      id="price"
                      type="number"
                      value={formData.price}
                      onChange={(e) => handleInputChange("price", e.target.value)}
                      placeholder="0"
                      required
                      dir="rtl"
                    />
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="brand">الماركة *</Label>
                    <Select onValueChange={(value) => handleInputChange("brand", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="اختر الماركة" />
                      </SelectTrigger>
                      <SelectContent>
                        {brands.map((brand) => (
                          <SelectItem key={brand} value={brand}>{brand}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="model">الموديل *</Label>
                    <Input
                      id="model"
                      value={formData.model}
                      onChange={(e) => handleInputChange("model", e.target.value)}
                      placeholder="مثال: كامري، أكورد، إلنترا"
                      required
                      dir="rtl"
                    />
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-3">
                  <div className="space-y-2">
                    <Label htmlFor="year">سنة الصنع *</Label>
                    <Input
                      id="year"
                      type="number"
                      value={formData.year}
                      onChange={(e) => handleInputChange("year", e.target.value)}
                      placeholder="2020"
                      min="1990"
                      max={new Date().getFullYear()}
                      required
                      dir="rtl"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="condition">الحالة *</Label>
                    <Select onValueChange={(value) => handleInputChange("condition", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="اختر الحالة" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="جديدة">جديدة</SelectItem>
                        <SelectItem value="مستعملة">مستعملة</SelectItem>
                        <SelectItem value="معادة التأهيل">معادة التأهيل</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="kilometers">الكيلومترات</Label>
                    <Input
                      id="kilometers"
                      type="number"
                      value={formData.kilometers}
                      onChange={(e) => handleInputChange("kilometers", e.target.value)}
                      placeholder="50000"
                      dir="rtl"
                    />
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="city">المدينة *</Label>
                    <Select onValueChange={(value) => handleInputChange("city", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="اختر المدينة" />
                      </SelectTrigger>
                      <SelectContent>
                        {cities.map((city) => (
                          <SelectItem key={city} value={city}>{city}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="whatsapp_number">رقم الواتساب</Label>
                    <Input
                      id="whatsapp_number"
                      value={formData.whatsapp_number}
                      onChange={(e) => handleInputChange("whatsapp_number", e.target.value)}
                      placeholder="09xxxxxxxx"
                      dir="rtl"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">وصف السيارة</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => handleInputChange("description", e.target.value)}
                    placeholder="أضف تفاصيل إضافية عن السيارة..."
                    rows={4}
                    dir="rtl"
                  />
                </div>

                <div className="flex gap-4">
                  <Button type="submit" disabled={loading} className="flex-1">
                    {loading ? "جاري الإضافة..." : "إضافة الإعلان"}
                  </Button>
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => navigate("/dashboard")}
                    className="flex-1"
                  >
                    إلغاء
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AddCar;