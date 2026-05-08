import { Truck, Award, Banknote, Clock, Headset, FileCheck, Globe2 } from "lucide-react";

const items = [
  { icon: Award, title: "12 лет на рынке", desc: "Прямые контракты с фанерными комбинатами России." },
  { icon: Banknote, title: "Цены от производителя", desc: "Работаем без посредников. Гибкие скидки оптовикам." },
  { icon: Truck, title: "Доставка по России", desc: "Собственный автопарк и логистика в любой регион." },
  { icon: Globe2, title: "Экспорт в любые страны", desc: "Отгружаем на экспорт: оформление документов и логистика под ключ." },
  { icon: Clock, title: "Отгрузка за 24 часа", desc: "Большой склад — отгрузка в день заказа." },
  { icon: FileCheck, title: "Полный пакет документов", desc: "Сертификаты, ГОСТ, ТТН, счёт-фактуры." },
  { icon: Headset, title: "Персональный менеджер", desc: "Поможет подобрать материал и оформит заявку." },
];

const Advantages = () => (
  <section id="advantages" className="py-24 bg-deep text-primary-foreground">
    <div className="container">
      <div className="mb-14">
        <div className="text-sm font-semibold text-accent uppercase tracking-wider mb-3">Почему мы</div>
        <h2 className="text-3xl md:text-4xl font-extrabold mb-4 whitespace-nowrap">Преимущества работы с «Русской Фанерой»</h2>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((x, i) => (
          <div key={i} className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-smooth">
            <x.icon className="w-8 h-8 text-accent mb-4" />
            <h3 className="font-bold text-lg mb-2">{x.title}</h3>
            <p className="text-primary-foreground/70 text-sm">{x.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default Advantages;
