export const DEFAULT_PRICES: Record<string, number> = {
  fk: 32000,
  fsf: 38000,
  lam: 52000,
  bak: 145000,
  tg: 68000,
};

export const PRICE_LABELS: Record<string, string> = {
  fk: "ФК",
  fsf: "ФСФ",
  lam: "Ламинированная",
  bak: "Бакелитовая",
  tg: "Трудногорючая",
};

const KEY = "plywood_prices_v1";

export function loadPrices(): Record<string, number> {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return { ...DEFAULT_PRICES };
    const parsed = JSON.parse(raw);
    return { ...DEFAULT_PRICES, ...parsed };
  } catch {
    return { ...DEFAULT_PRICES };
  }
}

export function savePrices(prices: Record<string, number>) {
  localStorage.setItem(KEY, JSON.stringify(prices));
  window.dispatchEvent(new Event("prices-updated"));
}
