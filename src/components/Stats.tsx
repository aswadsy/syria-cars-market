import { Car, Users, CheckCircle, Star } from "lucide-react";

const Stats = () => {
  const stats = [
    {
      icon: Car,
      number: "10,000+",
      label: "سيارة متاحة",
      description: "من جميع الأنواع والموديلات"
    },
    {
      icon: Users,
      number: "5,000+",
      label: "عميل راضي",
      description: "يثقون بخدماتنا"
    },
    {
      icon: CheckCircle,
      number: "1,200+",
      label: "صفقة ناجحة",
      description: "تمت هذا الشهر"
    },
    {
      icon: Star,
      number: "4.9",
      label: "تقييم العملاء",
      description: "من أصل 5 نجوم"
    }
  ];

  return (
    <section className="py-16 bg-primary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
            أرقام تتحدث عن نفسها
          </h2>
          <p className="text-lg text-primary-foreground/80 max-w-2xl mx-auto">
            نفخر بثقة عملائنا وحجم النجاح الذي حققناه معاً في سوق السيارات السوري
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="text-center fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-4">
                <stat.icon className="h-8 w-8 text-accent-foreground" />
              </div>
              <div className="text-4xl font-bold text-primary-foreground mb-2">
                {stat.number}
              </div>
              <div className="text-xl font-semibold text-primary-foreground mb-1">
                {stat.label}
              </div>
              <div className="text-primary-foreground/70">
                {stat.description}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;