import { Layers, Hammer, Sparkles, Flame, ShieldAlert } from "lucide-react";

const products = [
  { icon: Layers, title: "Фанера ФК", desc: "Влагостойкая, на карбамидном клее. Для мебели, отделки, упаковки.", sizes: "1525×1525 мм · 4–21 мм" },
  { icon: Hammer, title: "Фанера ФСФ", desc: "Повышенной влагостойкости. Для строительства, опалубки, кровли.", sizes: "2440×1220, 2500×1250 · 6–40 мм" },
  { icon: Sparkles, title: "Ламинированная", desc: "Гладкая/сетка. Многоразовая опалубка, транспортное машиностроение.", sizes: "2440×1220, 2500×1250, 3000×1500" },
  { icon: ShieldAlert, title: "Бакелитовая", desc: "Высочайшая прочность и водостойкость. Судостроение, спецтехника.", sizes: "2440×1220, 1500×3000 · 5–40 мм" },
  { icon: Flame, title: "Трудногорючая", desc: "Класс пожарной безопасности КМ1. Общественные помещения, транспорт.", sizes: "1525×1525, 1830×1525, 2950×1525 · 6–30 мм" },
];

const Products = () => (
  <section id="products" className="py-24 bg-soft">
    <div className="container">
      <div className="max-w-2xl mb-14">
        <div className="text-sm font-semibold text-primary-glow uppercase tracking-wider mb-3">Каталог</div>
        <h2 className="text-3xl md:text-4xl font-extrabold text-primary mb-4">Все виды фанеры со склада</h2>
        <p className="text-muted-foreground text-lg">Поставляем продукцию российских фанерных комбинатов с полным пакетом документов.</p>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((p, i) => (
          <div key={i} className="group bg-card-soft rounded-2xl p-7 border border-border hover:border-primary hover:shadow-elegant transition-smooth">
            <div className="w-12 h-12 rounded-xl bg-primary text-primary-foreground flex items-center justify-center mb-5 group-hover:scale-110 transition-smooth">
              <p.icon className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-primary mb-2">{p.title}</h3>
            <p className="text-muted-foreground mb-4">{p.desc}</p>
            <div className="text-sm font-medium text-foreground border-t border-border pt-4">{p.sizes}</div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default Products;
