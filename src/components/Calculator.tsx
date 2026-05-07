import { useEffect, useMemo, useState } from "react";
import { Calculator as CalcIcon } from "lucide-react";
import { loadPrices, PRICE_LABELS } from "@/lib/prices";

const TYPE_IDS = ["fk", "fsf", "lam", "bak", "tg"] as const;

const ALL_SIZES = [
  { id: "1525", l: 1525, w: 1525 },
  { id: "1830", l: 1830, w: 1525 },
  { id: "2440", l: 2440, w: 1220 },
  { id: "2500", l: 2500, w: 1250 },
  { id: "2950", l: 2950, w: 1525 },
  { id: "3000", l: 3000, w: 1500 },
];

const SIZES_BY_TYPE: Record<string, string[]> = {
  fk: ["1525", "2440", "2500"],
  fsf: ["2440", "2500", "3000"],
  lam: ["2440", "2500", "3000"],
  bak: ["2440", "3000"],
  tg: ["1525", "1830", "2950"],
};

const THICKNESS = [4, 6, 8, 10, 12, 15, 18, 21, 24, 30, 40];

interface Props {
  onOrder?: (summary: string) => void;
}

const Calculator = ({ onOrder }: Props) => {
  const [type, setType] = useState(TYPES[1].id);
  const availableSizes = useMemo(
    () => ALL_SIZES.filter(s => SIZES_BY_TYPE[type].includes(s.id)),
    [type]
  );
  const [size, setSize] = useState(availableSizes[0].id);
  const [thick, setThick] = useState(18);
  const [qty, setQty] = useState(50);
  const [mode, setMode] = useState<"sheets" | "area">("sheets");
  const [area, setArea] = useState(100);

  // Reset size when type changes if current size unavailable
  if (!availableSizes.find(s => s.id === size)) {
    setSize(availableSizes[0].id);
  }

  const result = useMemo(() => {
    const t = TYPES.find(x => x.id === type)!;
    const s = (availableSizes.find(x => x.id === size) ?? availableSizes[0]);
    const sheetArea = (s.l * s.w) / 1_000_000;
    const sheetVol = sheetArea * (thick / 1000);
    const sheets = mode === "sheets" ? qty : Math.ceil(area / sheetArea);
    const totalArea = sheets * sheetArea;
    const totalVol = sheets * sheetVol;
    const price = totalVol * t.priceM3;
    return { sheets, sheetArea, totalArea, totalVol, price, t, s };
  }, [type, size, thick, qty, mode, area, availableSizes]);

  const summary = `${result.t.name} ${result.s.l}×${result.s.w}×${thick} мм · ${result.sheets} лист. · ${result.totalArea.toFixed(2)} м² · ${result.totalVol.toFixed(3)} м³ · ≈ ${Math.round(result.price).toLocaleString("ru-RU")} ₽`;

  return (
    <section id="calculator" className="py-24 bg-soft">
      <div className="container">
        <div className="max-w-2xl mb-10">
          <div className="text-sm font-semibold text-primary-glow uppercase tracking-wider mb-3">Калькулятор</div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-primary mb-4 flex items-center gap-3">
            <CalcIcon className="w-8 h-8" /> Расчёт стоимости фанеры
          </h2>
          <p className="text-muted-foreground text-lg">Укажите параметры — получите ориентировочную цену и объём.</p>
        </div>

        <div className="grid lg:grid-cols-5 gap-8 bg-card-soft rounded-3xl p-8 lg:p-10 shadow-elegant border border-border">
          <div className="lg:col-span-3 space-y-6">
            <Field label="Вид фанеры">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {TYPES.map(t => (
                  <button key={t.id} onClick={() => setType(t.id)} type="button"
                    className={`px-3 py-2.5 rounded-lg text-sm font-semibold border transition-smooth ${type === t.id ? "bg-primary text-primary-foreground border-primary" : "bg-background border-border hover:border-primary"}`}>
                    {t.name}
                  </button>
                ))}
              </div>
            </Field>

            <Field label="Формат листа, мм">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {availableSizes.map(s => (
                  <button key={s.id} onClick={() => setSize(s.id)} type="button"
                    className={`px-3 py-2.5 rounded-lg text-sm font-semibold border transition-smooth ${size === s.id ? "bg-primary text-primary-foreground border-primary" : "bg-background border-border hover:border-primary"}`}>
                    {s.l}×{s.w}
                  </button>
                ))}
              </div>
            </Field>

            <Field label={`Толщина: ${thick} мм`}>
              <input type="range" min={0} max={THICKNESS.length - 1} step={1}
                value={THICKNESS.indexOf(thick)}
                onChange={e => setThick(THICKNESS[Number(e.target.value)])}
                className="w-full accent-primary" />
              <div className="flex justify-between text-xs text-muted-foreground mt-1">
                <span>{THICKNESS[0]} мм</span><span>{THICKNESS[THICKNESS.length - 1]} мм</span>
              </div>
            </Field>

            <div className="flex gap-2">
              <button onClick={() => setMode("sheets")} type="button"
                className={`flex-1 px-3 py-2.5 rounded-lg text-sm font-semibold border transition-smooth ${mode === "sheets" ? "bg-primary text-primary-foreground border-primary" : "bg-background border-border"}`}>
                По количеству листов
              </button>
              <button onClick={() => setMode("area")} type="button"
                className={`flex-1 px-3 py-2.5 rounded-lg text-sm font-semibold border transition-smooth ${mode === "area" ? "bg-primary text-primary-foreground border-primary" : "bg-background border-border"}`}>
                По площади (м²)
              </button>
            </div>

            {mode === "sheets" ? (
              <Field label="Количество листов">
                <input type="number" min={1} value={qty} onChange={e => setQty(Math.max(1, Number(e.target.value) || 1))}
                  className="w-full px-4 py-3 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary" />
              </Field>
            ) : (
              <Field label="Необходимая площадь, м²">
                <input type="number" min={1} value={area} onChange={e => setArea(Math.max(1, Number(e.target.value) || 1))}
                  className="w-full px-4 py-3 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary" />
              </Field>
            )}
          </div>

          <div className="lg:col-span-2 bg-deep text-primary-foreground rounded-2xl p-7 flex flex-col">
            <div className="text-sm uppercase tracking-wider text-accent font-semibold mb-2">Итог</div>
            <Row k="Лист" v={`${result.s.l}×${result.s.w}×${thick} мм`} />
            <Row k="Площадь листа" v={`${result.sheetArea.toFixed(3)} м²`} />
            <Row k="Количество листов" v={`${result.sheets} шт.`} />
            <Row k="Общая площадь" v={`${result.totalArea.toFixed(2)} м²`} />
            <Row k="Объём" v={`${result.totalVol.toFixed(3)} м³`} />
            <div className="mt-auto pt-6 border-t border-white/10">
              <div className="text-xs text-primary-foreground/60 mb-1">Ориентировочная стоимость</div>
              <div className="text-3xl font-extrabold text-accent mb-4">
                {Math.round(result.price).toLocaleString("ru-RU")} ₽
              </div>
              <button
                onClick={() => {
                  onOrder?.(summary);
                  document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="w-full bg-accent text-accent-foreground font-semibold py-3 rounded-lg hover:bg-accent/90 transition-smooth"
              >
                Заказать расчёт у менеджера
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Field = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <div>
    <label className="block text-sm font-semibold text-foreground mb-2">{label}</label>
    {children}
  </div>
);

const Row = ({ k, v }: { k: string; v: string }) => (
  <div className="flex justify-between py-2 text-sm border-b border-white/5">
    <span className="text-primary-foreground/70">{k}</span>
    <span className="font-semibold">{v}</span>
  </div>
);

export default Calculator;
