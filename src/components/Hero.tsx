import { ArrowRight, Truck, ShieldCheck, Warehouse, Award, Layers, Sparkles, Droplet, Flame, MapPin, FileText } from "lucide-react";
import plywood from "@/assets/plywood.jpg";

const TYPES = [
  { icon: Layers, label: "ФК, ФСФ" },
  { icon: Sparkles, label: "Ламинированная" },
  { icon: Droplet, label: "Бакелитовая" },
  { icon: Flame, label: "Трудногорючая" },
];

const STATS = [
  { icon: Warehouse, t: "5000+", s: "листов на складе" },
  { icon: Truck, t: "от 1 часа", s: "отгрузка от заявки" },
  { icon: ShieldCheck, t: "ГОСТ", s: "сертификаты качества" },
  { icon: Award, t: "Гарантия 5 лет", s: "от производителя" },
];

const Hero = () => (
  <section id="top" className="relative overflow-hidden bg-hero text-primary-foreground">
    {/* Plywood photo on the right */}
    <div className="absolute inset-y-0 right-0 w-full lg:w-[60%]">
      <img src={plywood} alt="Фанера со склада в Екатеринбурге" className="h-full w-full object-cover" />
      <div className="absolute inset-0" style={{
        background: "linear-gradient(90deg, hsl(var(--primary-deep)) 0%, hsl(var(--primary-deep) / 0.92) 30%, hsl(var(--primary-deep) / 0.35) 70%, hsl(var(--primary-deep) / 0.1) 100%)"
      }} />
    </div>
    <div className="absolute inset-0 opacity-20" style={{
      backgroundImage: "radial-gradient(circle at 18% 25%, hsl(207 100% 88% / 0.4), transparent 42%)"
    }} />

    <div className="container relative py-20 lg:py-28 max-w-6xl mx-auto">
      <div className="max-w-3xl">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/25 text-sm md:text-base font-semibold mb-7 shadow-soft backdrop-blur-sm">
          <MapPin className="w-4 h-4 text-accent" />
          Склад в Екатеринбурге · Отгрузка по России и на экспорт
        </div>

        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-[1.05] mb-7">
          Фанера со склада<br />
          <span className="text-accent">всех видов и размеров</span>
        </h1>

        {/* Product type icons with dividers */}
        <div className="flex flex-wrap items-center gap-y-3 mb-8">
          {TYPES.map((t, i) => (
            <div key={i} className="flex items-center">
              {i > 0 && <span className="hidden sm:block w-px h-5 bg-white/20 mx-5" />}
              <div className="flex items-center gap-2.5">
                <t.icon className="w-6 h-6 text-accent" />
                <span className="font-semibold">{t.label}</span>
              </div>
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
          <a href="#calculator" className="inline-flex items-center gap-2 bg-accent text-accent-foreground px-6 py-3.5 rounded-xl font-semibold hover:bg-accent/90 transition-smooth shadow-elegant">
            <Warehouse className="w-4 h-4" /> Рассчитать стоимость <ArrowRight className="w-4 h-4" />
          </a>
          <a href="#contact" className="inline-flex items-center gap-2 bg-white/10 border border-white/25 text-primary-foreground px-6 py-3.5 rounded-xl font-semibold hover:bg-white/20 transition-smooth backdrop-blur-sm">
            <FileText className="w-4 h-4" /> Получить прайс
          </a>
        </div>
      </div>

      {/* Stats glass panel */}
      <div className="mt-14 rounded-2xl border border-white/15 bg-white/5 backdrop-blur-md shadow-soft px-6 py-6 md:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-4 divide-white/10 md:divide-x">
          {STATS.map((x, i) => (
            <div key={i} className={i > 0 ? "md:pl-6" : ""}>
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
