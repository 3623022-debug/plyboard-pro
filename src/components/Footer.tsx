import logo from "@/assets/logo.png";

const Footer = () => (
  <footer className="bg-deep text-primary-foreground/80 py-12 border-t border-white/5">
    <div className="container grid md:grid-cols-3 gap-8">
      <div>
        <div className="flex items-center gap-3 mb-4">
          <img src={logo} alt="Русская Фанера" className="h-10 w-10 object-contain" />
          <div>
            <div className="font-bold text-primary-foreground">Русская Фанера</div>
            <div className="text-xs">russply.ru</div>
          </div>
        </div>
        <p className="text-sm text-primary-foreground/60 max-w-sm">
          Оптовая и розничная продажа фанеры всех видов со склада в Екатеринбурге.
        </p>
      </div>
      <div>
        <div className="font-semibold text-primary-foreground mb-3">Продукция</div>
        <ul className="space-y-2 text-sm">
          <li>Фанера ФК</li>
          <li>Фанера ФСФ</li>
          <li>Ламинированная</li>
          <li>Бакелитовая</li>
          <li>Трудногорючая</li>
        </ul>
      </div>
      <div>
        <div className="font-semibold text-primary-foreground mb-3">Контакты</div>
        <ul className="space-y-2 text-sm">
          <li>г. Екатеринбург, ул. Хлебная 17, склад 11</li>
          <li><a href="tel:+73432713344" className="hover:text-accent">+7 (343) 271-33-44</a></li>
          <li><a href="mailto:info@ekb-rusply.ru" className="hover:text-accent">info@ekb-rusply.ru</a></li>
          <li>Пн–Пт 9:00–18:00, Сб–Вс выходной</li>
        </ul>
      </div>
    </div>
    <div className="container mt-10 pt-6 border-t border-white/10 text-xs text-primary-foreground/50 flex flex-wrap justify-between gap-2">
      <div>© {new Date().getFullYear()} «Русская Фанера». Все права защищены.</div>
      <div className="flex items-center gap-3">
        <span>Сайт оптимизирован для Яндекс и Google.</span>
        <a href="/admin" className="text-primary-foreground/20 hover:text-primary-foreground/60 transition-smooth" title="Админ">·</a>
      </div>
    </div>
  </footer>
);

export default Footer;
