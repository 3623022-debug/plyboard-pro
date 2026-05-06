import logo from "@/assets/logo.png";
import { Phone } from "lucide-react";

const Header = () => {
  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-background/80 border-b border-border/60">
      <div className="container flex items-center justify-between py-3">
        <a href="#top" className="flex items-center gap-3">
          <img src={logo} alt="Русская Фанера логотип" className="h-12 w-12 object-contain" />
          <div className="hidden sm:block leading-tight">
            <div className="font-bold text-primary text-lg">Русская Фанера</div>
            <div className="text-xs text-muted-foreground">Склад в Екатеринбурге</div>
          </div>
        </a>
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
          <a href="#products" className="hover:text-primary transition-smooth">Продукция</a>
          <a href="#calculator" className="hover:text-primary transition-smooth">Калькулятор</a>
          <a href="#advantages" className="hover:text-primary transition-smooth">О нас</a>
          <a href="#contact" className="hover:text-primary transition-smooth">Контакты</a>
        </nav>
        <a
          href="tel:+73430000000"
          className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2.5 rounded-lg font-semibold hover:opacity-90 transition-smooth shadow-soft"
        >
          <Phone className="w-4 h-4" />
          <span className="hidden sm:inline">+7 (343) 000-00-00</span>
        </a>
      </div>
    </header>
  );
};

export default Header;
