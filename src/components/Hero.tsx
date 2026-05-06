import { ArrowRight, Truck, ShieldCheck, Warehouse, Award } from "lucide-react";
import plywood from "@/assets/plywood.jpg";

const Hero = () => (
  <section id="top" className="relative overflow-hidden bg-hero text-primary-foreground">
    <div className="absolute inset-0 opacity-20" style={{
      backgroundImage: "radial-gradient(circle at 20% 20%, hsl(207 100% 88% / 0.4), transparent 40%), radial-gradient(circle at 80% 80%, hsl(211 38% 52% / 0.5), transparent 40%)"
    }} />
    <div className="container relative py-24 lg:py-32 grid lg:grid-cols-2 gap-12 items-center">
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/20 text-xs font-medium mb-6">
          <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
          Склад в Екатеринбурге · Отгрузка по всей России
        </div>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-6">
          Фанера со склада<br />
          <span className="text-accent">всех видов и размеров</span>
        </h1>
        <p className="text-lg text-primary-foreground/80 mb-8 max-w-xl">
          ФК, ФСФ, ламинированная, бакелитовая, трудногорючая. Форматы от 1525×1525 до 3000×1500 мм. Сертификаты, гарантия качества, оптовые цены.
        </p>
        <div className="flex flex-wrap gap-4">
          <a href="#calculator" className="inline-flex items-center gap-2 bg-accent text-accent-foreground px-6 py-3.5 rounded-lg font-semibold hover:bg-accent/90 transition-smooth shadow-elegant">
            Рассчитать стоимость <ArrowRight className="w-4 h-4" />
          </a>
          <a href="#contact" className="inline-flex items-center gap-2 bg-white/10 border border-white/30 text-primary-foreground px-6 py-3.5 rounded-lg font-semibold hover:bg-white/20 transition-smooth">
            Получить прайс
          </a>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-12 pt-8 border-t border-white/10">
          {[
            { icon: Warehouse, t: "5000+", s: "листов на складе" },
            { icon: Truck, t: "от 1 часа", s: "отгрузка от заявки" },
            { icon: ShieldCheck, t: "ГОСТ", s: "сертификаты качества" },
            { icon: Award, t: "Гарантия 5 лет", s: "от производителя" },
          ].map((x, i) => (
            <div key={i}>
              <x.icon className="w-5 h-5 text-accent mb-2" />
              <div className="text-2xl font-bold">{x.t}</div>
              <div className="text-xs text-primary-foreground/70">{x.s}</div>
            </div>
          ))}
        </div>
      </div>
      <div className="relative hidden lg:block">
        <div className="absolute -inset-8 bg-accent/20 blur-3xl rounded-full" />
        <img
          src={plywood}
          alt="Фанера на складе в Екатеринбурге"
          width={1024}
          height={1024}
          className="relative w-full h-auto rounded-2xl shadow-elegant object-cover"
        />
      </div>
    </div>
  </section>
);

export default Hero;
