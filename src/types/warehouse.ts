export type BoxStatus = "ok" | "warning" | "alert";

export interface HistoryPoint {
  /** Rótulo da hora (ex.: "14:00") */
  time: string;
  /** Ocupação em % (0-100) */
  occupancy: number;
}

export interface WarehouseBox {
  id: string;
  /** Posição na grade do armazém: coluna e fileira */
  grid: [col: number, row: number];
  /** Ocupação atual em % (0-100) */
  occupancy: number;
  /** Material armazenado */
  product: string;
  /** Mensagem de alerta ativo, quando houver */
  alert?: string;
  /** Últimas 24 horas, da mais antiga para a mais recente */
  history: HistoryPoint[];
}
