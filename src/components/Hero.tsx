import { ArrowRight, Truck, ShieldCheck, Warehouse, Award, Layers, Sparkles, Droplet, Flame } from "lucide-react";
import plywood from "@/assets/plywood.jpg";

const TYPES = [
  { icon: Layers, label: "ФК, ФСФ" },
  { icon: Sparkles, label: "Ламинированная" },
  { icon: Droplet, label: "Бакелитовая" },
  { icon: Flame, label: "Трудногорючая" },
];

const Hero = () => (
  <section id="top" className="relative overflow-hidden bg-hero text-primary-foreground">
    {/* Plywood photo on the right */}
    <div className="absolute inset-y-0 right-0 w-full lg:w-3/5">
      <img src={plywood} alt="Фанера со склада в Екатеринбурге" className="h-full w-full object-cover" />
      <div className="absolute inset-0" style={{
        background: "linear-gradient(90deg, hsl(var(--primary-deep)) 0%, hsl(var(--primary-deep) / 0.85) 35%, hsl(var(--primary-deep) / 0.2) 100%)"
      }} />
    </div>
    <div className="absolute inset-0 opacity-20" style={{
      backgroundImage: "radial-gradient(circle at 20% 20%, hsl(207 100% 88% / 0.4), transparent 40%), radial-gradient(circle at 80% 80%, hsl(211 38% 52% / 0.5), transparent 40%)"
    }} />

    <div className="container relative py-24 lg:py-32 max-w-6xl mx-auto">
      <div className="max-w-3xl">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/15 border border-white/30 text-sm md:text-base font-semibold mb-6 shadow-soft">
          <span className="w-2.5 h-2.5 rounded-full bg-accent animate-pulse" />
          Склад в Екатеринбурге · Отгрузка по России и на экспорт
        </div>

        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-7">
          Фанера со склада<br />
          <span className="text-accent">всех видов и размеров</span>
        </h1>

        {/* Product type icons */}
        <div className="flex flex-wrap items-center gap-x-7 gap-y-4 mb-8">
          {TYPES.map((t, i) => (
            <div key={i} className="flex items-center gap-2.5">
              <t.icon className="w-6 h-6 text-accent" />
              <span className="font-semibold">{t.label}</span>
            </div>
          ))}
        </div>

        <p className="text-base lg:text-lg text-primary-foreground/85 mb-1">
          Форматы от <span className="font-semibold text-accent">1525×1525</span> до <span className="font-semibold text-accent">3000×1500</span> мм.
        </p>
        <p className="text-base lg:text-lg text-primary-foreground/85 mb-8">
          Сертификаты, гарантия качества, оптовые цены.
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
              <div className="text-2xl font-bold whitespace-nowrap">{x.t}</div>
              <div className="text-xs text-primary-foreground/70">{x.s}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default Hero;
