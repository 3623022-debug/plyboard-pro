import { Link } from "react-router-dom";
import { PRODUCTS } from "@/lib/products";

const Products = () => (
  <section id="products" className="py-24 bg-soft">
    <div className="container">
      <div className="max-w-5xl mb-14">
        <div className="text-sm font-semibold text-primary-glow uppercase tracking-wider mb-3">Каталог</div>
        <h2 className="text-3xl md:text-4xl font-extrabold text-primary mb-4">Все виды фанеры со склада</h2>
        <p className="text-muted-foreground text-lg lg:whitespace-nowrap">Поставляем продукцию российских фанерных комбинатов с полным пакетом документов.</p>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {PRODUCTS.map((p) => (
          <Link
            key={p.slug}
            to={`/product/${p.slug}`}
            className="group bg-card-soft rounded-2xl p-7 border border-border hover:border-primary hover:shadow-elegant transition-smooth block"
          >
            <div className="w-12 h-12 rounded-xl bg-primary text-primary-foreground flex items-center justify-center mb-5 group-hover:scale-110 transition-smooth">
              <p.icon className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-primary mb-2">{p.title}</h3>
            <p className="text-muted-foreground mb-4">{p.desc}</p>
            <div className="text-sm font-medium text-foreground border-t border-border pt-4">{p.sizes}</div>
          </Link>
        ))}
      </div>
    </div>
  </section>
);

export default Products;
