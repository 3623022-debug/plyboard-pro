import { Layers, Hammer, Sparkles, Flame, ShieldAlert, type LucideIcon } from "lucide-react";

export type Product = {
  slug: string;
  icon: LucideIcon;
  title: string;
  desc: string;
  sizes: string;
};

export const PRODUCTS: Product[] = [
  { slug: "fk", icon: Layers, title: "Фанера ФК", desc: "Влагостойкая, на карбамидном клее. Для мебели, отделки, упаковки.", sizes: "1525×1525 мм · 4–21 мм" },
  { slug: "fsf", icon: Hammer, title: "Фанера ФСФ", desc: "Повышенной влагостойкости. Для строительства, опалубки, кровли.", sizes: "2440×1220, 2500×1250 · 6–40 мм" },
  { slug: "laminated", icon: Sparkles, title: "Ламинированная", desc: "Гладкая/сетка. Многоразовая опалубка, транспортное машиностроение.", sizes: "2440×1220, 2500×1250, 3000×1500" },
  { slug: "bakelite", icon: ShieldAlert, title: "Бакелитовая", desc: "Высочайшая прочность и водостойкость. Судостроение, спецтехника.", sizes: "2440×1220, 1500×3000 · 5–40 мм" },
  { slug: "fire-resistant", icon: Flame, title: "Трудногорючая", desc: "Класс пожарной безопасности КМ1. Общественные помещения, транспорт.", sizes: "1525×1525, 1830×1525, 2950×1525 · 6–30 мм" },
];

export const getProduct = (slug: string) => PRODUCTS.find((p) => p.slug === slug);
