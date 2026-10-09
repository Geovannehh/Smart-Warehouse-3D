"use client";

import type { WarehouseBox } from "@/types/warehouse";
import { STATUS_COLOR, STATUS_LABEL, getStatus } from "@/lib/status";

function Sparkline({ data, color }: { data: number[]; color: string }) {
  const width = 320;
  const height = 120;
  const pad = 8;
  const step = (width - pad * 2) / (data.length - 1);
  const y = (v: number) => pad + (1 - v / 100) * (height - pad * 2);
  const points = data.map((v, i) => `${pad + i * step},${y(v)}`).join(" ");
  const area = `${pad},${height - pad} ${points} ${pad + (data.length - 1) * step},${height - pad}`;

  return (
    <svg viewBox={`0 0 ${width} ${height}`} role="img" aria-label="Histórico de ocupação das últimas 24 horas" className="sparkline">
      {[0, 50, 100].map((g) => (
        <line key={g} x1={pad} x2={width - pad} y1={y(g)} y2={y(g)} stroke="#1e293b" strokeWidth="1" />
      ))}
      <polygon points={area} fill={color} opacity="0.15" />
      <polyline points={points} fill="none" stroke={color} strokeWidth="2" strokeLinejoin="round" />
      <circle cx={pad + (data.length - 1) * step} cy={y(data[data.length - 1])} r="3.5" fill={color} />
    </svg>
  );
}

export function HistoryPanel({ box, onClose }: { box: WarehouseBox; onClose: () => void }) {
  const status = getStatus(box);
  const color = STATUS_COLOR[status];
  const values = box.history.map((p) => p.occupancy);
  const avg = Math.round(values.reduce((a, b) => a + b, 0) / values.length);
  const max = Math.max(...values);
  const min = Math.min(...values);

  return (
    <section className="panel" aria-live="polite">
      <header className="panel__header">
        <div>
          <h2>BOX {box.id}</h2>
          <p>{box.product}</p>
        </div>
        <button type="button" onClick={onClose} aria-label="Fechar painel">
          ×
        </button>
      </header>

      <div className="panel__status" style={{ borderColor: color, color }}>
        {STATUS_LABEL[status]} · {box.occupancy}%
      </div>
      {box.alert && <p className="panel__alert">{box.alert}</p>}

      <h3>Ocupação nas últimas 24 h</h3>
      <Sparkline data={values} color={color} />
      <div className="panel__axis">
        <span>{box.history[0].time}</span>
        <span>{box.history[box.history.length - 1].time}</span>
      </div>

      <dl className="panel__stats">
        <div>
          <dt>Média</dt>
          <dd>{avg}%</dd>
        </div>
        <div>
          <dt>Máxima</dt>
          <dd>{max}%</dd>
        </div>
        <div>
          <dt>Mínima</dt>
          <dd>{min}%</dd>
        </div>
      </dl>
    </section>
  );
}
