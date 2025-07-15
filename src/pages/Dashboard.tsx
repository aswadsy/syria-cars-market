import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Car, User, Plus, LogOut } from "lucide-react";
import Navbar from "@/components/Navbar";

interface Profile {
  id: string;
  full_name: string;
  phone: string | null;
  city: string | null;
}

interface CarData {
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
  created_at: string;
}

const Dashboard = () => {
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [cars, setCars] = useState<CarData[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        navigate("/auth");
        return;
      }

      setUser(session.user);
      await fetchProfile(session.user.id);
      await fetchUserCars(session.user.id);
    } catch (error) {
      console.error("Error checking auth:", error);
      navigate("/auth");
    } finally {
      setLoading(false);
    }
  };

  const fetchProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("user_id", userId)
        .single();

      if (error) throw error;
      setProfile(data);
    } catch (error) {
      console.error("Error fetching profile:", error);
    }
  };

  const fetchUserCars = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from("cars")
        .select("*")
        .eq("user_id", userId)
        .order("created_at", { ascending: false });

      if (error) throw error;
      setCars(data || []);
    } catch (error) {
      console.error("Error fetching cars:", error);
    }
  };

  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut();
      navigate("/");
    } catch (error) {
      toast({
        variant: "destructive",
        title: "خطأ في تسجيل الخروج",
        description: "حدث خطأ أثناء تسجيل الخروج",
      });
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "متاحة": return "bg-green-500";
      case "محجوزة": return "bg-yellow-500";
      case "مباعة": return "bg-red-500";
      default: return "bg-gray-500";
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">جاري التحميل...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">
              أهلاً بك، {profile?.full_name}
            </h1>
            <p className="text-muted-foreground">لوحة التحكم الخاصة بك</p>
          </div>
          <div className="flex gap-2">
            <Button onClick={() => navigate("/add-car")} className="gap-2">
              <Plus className="h-4 w-4" />
              إضافة إعلان
            </Button>
            <Button variant="outline" onClick={handleSignOut} className="gap-2">
              <LogOut className="h-4 w-4" />
              تسجيل الخروج
            </Button>
          </div>
        </div>

        <Tabs defaultValue="cars" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="cars" className="gap-2">
              <Car className="h-4 w-4" />
              إعلاناتي
            </TabsTrigger>
            <TabsTrigger value="profile" className="gap-2">
              <User className="h-4 w-4" />
              الملف الشخصي
            </TabsTrigger>
          </TabsList>

          <TabsContent value="cars" className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">إعلاناتي ({cars.length})</h2>
            </div>

            {cars.length === 0 ? (
              <Card>
                <CardContent className="text-center py-12">
                  <Car className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium mb-2">لا توجد إعلانات</h3>
                  <p className="text-muted-foreground mb-4">لم تقم بإضافة أي إعلانات بعد</p>
                  <Button onClick={() => navigate("/add-car")}>
                    إضافة أول إعلان
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {cars.map((car) => (
                  <Card key={car.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-lg">{car.title}</CardTitle>
                        <Badge className={getStatusColor(car.status)}>
                          {car.status}
                        </Badge>
                      </div>
                      <CardDescription>
                        {car.brand} {car.model} - {car.year}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">السعر:</span>
                          <span className="font-semibold text-primary">
                            {car.price.toLocaleString()} ل.س
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">المدينة:</span>
                          <span>{car.city}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">النوع:</span>
                          <span>{car.operation_type}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">الحالة:</span>
                          <span>{car.condition}</span>
                        </div>
                      </div>
                      <div className="flex gap-2 mt-4">
                        <Button size="sm" variant="outline" className="flex-1">
                          تعديل
                        </Button>
                        <Button size="sm" variant="destructive" className="flex-1">
                          حذف
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="profile">
            <Card>
              <CardHeader>
                <CardTitle>الملف الشخصي</CardTitle>
                <CardDescription>معلوماتك الشخصية</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <label className="text-sm font-medium">الاسم الكامل</label>
                    <p className="text-foreground">{profile?.full_name || "غير محدد"}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium">البريد الإلكتروني</label>
                    <p className="text-foreground">{user?.email}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium">رقم الهاتف</label>
                    <p className="text-foreground">{profile?.phone || "غير محدد"}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium">المدينة</label>
                    <p className="text-foreground">{profile?.city || "غير محدد"}</p>
                  </div>
                </div>
                <Button variant="outline">تعديل المعلومات</Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;