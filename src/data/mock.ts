import type { HistoryPoint, WarehouseBox } from "@/types/warehouse";

/** Gera 24 pontos determinísticos terminando exatamente na ocupação atual. */
function buildHistory(seed: number, current: number): HistoryPoint[] {
  const points = 24;
  return Array.from({ length: points }, (_, i) => {
    const remaining = points - 1 - i;
    const wobble = Math.sin((i + seed) * 0.9) * 6 + Math.cos((i + seed * 2) * 0.4) * 4;
    const drift = remaining * 0.6 * (seed % 2 === 0 ? 1 : -1);
    const value = remaining === 0 ? current : current + (wobble + drift) * (remaining / points + 0.3);
    return {
      time: `${String(i).padStart(2, "0")}:00`,
      occupancy: Math.round(Math.min(100, Math.max(0, value))),
    };
  });
}

const base: Omit<WarehouseBox, "history">[] = [
  { id: "A01", grid: [0, 0], occupancy: 78, product: "Ureia" },
  { id: "A02", grid: [1, 0], occupancy: 91, product: "NPK 20-05-20" },
  { id: "A03", grid: [2, 0], occupancy: 43, product: "Fosfato MAP" },
  {
    id: "A04",
    grid: [3, 0],
    occupancy: 97,
    product: "Cloreto de potássio",
    alert: "Nível crítico e variação brusca de volume nos últimos 30 min",
  },
  { id: "B01", grid: [0, 1], occupancy: 62, product: "Sulfato de amônio" },
  { id: "B02", grid: [1, 1], occupancy: 15, product: "Ureia" },
  { id: "B03", grid: [2, 1], occupancy: 84, product: "NPK 10-10-10" },
  { id: "B04", grid: [3, 1], occupancy: 55, product: "Calcário" },
];

export const WAREHOUSE_BOXES: WarehouseBox[] = base.map((box, index) => ({
  ...box,
  history: buildHistory(index + 1, box.occupancy),
}));
