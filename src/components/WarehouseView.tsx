"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import { WAREHOUSE_BOXES } from "@/data/mock";
import { STATUS_COLOR, getStatus } from "@/lib/status";
import { HistoryPanel } from "./HistoryPanel";

const WarehouseScene = dynamic(() => import("./WarehouseScene"), {
  ssr: false,
  loading: () => <div className="scene-loading">Carregando armazém 3D…</div>,
});

export function WarehouseView() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const selected = WAREHOUSE_BOXES.find((b) => b.id === selectedId) ?? null;
  const alerts = WAREHOUSE_BOXES.filter((b) => b.alert).length;

  return (
    <main className="app">
      <header className="topbar">
        <div>
          <h1>Smart Warehouse 3D</h1>
          <p>Gêmeo digital do armazém · dados simulados</p>
        </div>
        <div className="topbar__kpis">
          <span>{WAREHOUSE_BOXES.length} boxes</span>
          <span className={alerts ? "kpi-alert" : ""}>{alerts} alerta(s)</span>
        </div>
      </header>

      <div className="layout">
        <div className="scene">
          <WarehouseScene boxes={WAREHOUSE_BOXES} selectedId={selectedId} onSelect={setSelectedId} />
          <p className="scene__hint">Arraste para girar · role para aproximar · clique em um box</p>
        </div>

        <aside className="sidebar">
          {selected ? (
            <HistoryPanel box={selected} onClose={() => setSelectedId(null)} />
          ) : (
            <section className="panel">
              <h2>Boxes</h2>
              <ul className="box-list">
                {WAREHOUSE_BOXES.map((box) => {
                  const status = getStatus(box);
                  return (
                    <li key={box.id}>
                      <button type="button" onClick={() => setSelectedId(box.id)}>
                        <span className="dot" style={{ background: STATUS_COLOR[status] }} />
                        <strong>BOX {box.id}</strong>
                        <span>{box.alert ? "ALERTA" : `${box.occupancy}%`}</span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </section>
          )}
        </aside>
      </div>
    </main>
  );
}
