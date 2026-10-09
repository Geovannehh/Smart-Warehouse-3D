import type { BoxStatus, WarehouseBox } from "@/types/warehouse";

export function getStatus(box: WarehouseBox): BoxStatus {
  if (box.alert) return "alert";
  if (box.occupancy >= 90 || box.occupancy <= 20) return "warning";
  return "ok";
}

export const STATUS_COLOR: Record<BoxStatus, string> = {
  ok: "#2dd4bf",
  warning: "#fbbf24",
  alert: "#f87171",
};

export const STATUS_LABEL: Record<BoxStatus, string> = {
  ok: "Normal",
  warning: "Atenção",
  alert: "Alerta",
};
