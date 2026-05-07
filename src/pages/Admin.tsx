import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Lock, Save } from "lucide-react";
import { DEFAULT_PRICES, PRICE_LABELS, loadPrices, savePrices } from "@/lib/prices";
import { toast } from "sonner";

const PASSWORD = "5656";

const Admin = () => {
  const [authed, setAuthed] = useState(false);
  const [pwd, setPwd] = useState("");
  const [prices, setPrices] = useState<Record<string, number>>(DEFAULT_PRICES);

  useEffect(() => {
    if (authed) setPrices(loadPrices());
  }, [authed]);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pwd === PASSWORD) setAuthed(true);
    else toast.error("Неверный пароль");
  };

  const save = () => {
    savePrices(prices);
    toast.success("Цены сохранены");
  };

  const reset = () => {
    setPrices({ ...DEFAULT_PRICES });
    savePrices({ ...DEFAULT_PRICES });
    toast.success("Сброшено к значениям по умолчанию");
  };

  return (
    <div className="min-h-screen bg-soft py-16">
      <div className="container max-w-2xl">
        <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-6">
          <ArrowLeft className="w-4 h-4" /> На главную
        </Link>

        {!authed ? (
          <form onSubmit={submit} className="bg-card-soft rounded-2xl p-8 border border-border shadow-elegant max-w-sm mx-auto">
            <div className="flex items-center gap-3 mb-6">
              <Lock className="w-6 h-6 text-primary" />
              <h1 className="text-xl font-bold text-primary">Вход для администратора</h1>
            </div>
            <input
              type="password"
              autoFocus
              value={pwd}
              onChange={(e) => setPwd(e.target.value)}
              placeholder="Пароль"
              className="w-full px-4 py-3 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary mb-4"
            />
            <button type="submit" className="w-full bg-primary text-primary-foreground font-semibold py-3 rounded-lg hover:bg-primary/90 transition-smooth">
              Войти
            </button>
          </form>
        ) : (
          <div className="bg-card-soft rounded-2xl p-8 border border-border shadow-elegant">
            <h1 className="text-2xl font-bold text-primary mb-2">Цены на фанеру</h1>
            <p className="text-muted-foreground text-sm mb-6">
              Цена указывается за 1 м³ в рублях. Эти значения используются в калькуляторе на главной странице.
            </p>
            <div className="space-y-4 mb-6">
              {Object.keys(DEFAULT_PRICES).map((key) => (
                <div key={key} className="flex items-center gap-4">
                  <label className="flex-1 font-semibold text-foreground">{PRICE_LABELS[key]}</label>
                  <div className="relative">
                    <input
                      type="number"
                      min={0}
                      step={100}
                      value={prices[key] ?? 0}
                      onChange={(e) => setPrices({ ...prices, [key]: Number(e.target.value) || 0 })}
                      className="w-44 px-4 py-2.5 pr-12 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary text-right"
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">₽/м³</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex gap-3">
              <button onClick={save} className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-semibold px-5 py-3 rounded-lg hover:bg-primary/90 transition-smooth">
                <Save className="w-4 h-4" /> Сохранить
              </button>
              <button onClick={reset} className="px-5 py-3 rounded-lg border border-border font-semibold hover:bg-background transition-smooth">
                Сбросить
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;
