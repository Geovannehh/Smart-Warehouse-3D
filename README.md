# Smart Warehouse 3D — Digital Twin

Armazém navegável em 3D: cada box mostra ocupação e status em tempo real, e o clique abre o histórico das últimas 24 horas.

> Versão atual: **front-end com dados mockados**. API e PostgreSQL entram numa próxima etapa.

## Stack

- Next.js 15 (App Router) + TypeScript
- Three.js + React Three Fiber + drei
- Dados simulados em `src/data/mock.ts`

## Como rodar

```bash
npm install
npm run dev
```

Abra http://localhost:3000.

## Funcionalidades

- Cena 3D com órbita de câmera (girar, zoom)
- 8 boxes (A01–A04, B01–B04) com enchimento proporcional à ocupação
- Status por cor: normal, atenção (≥ 90% ou ≤ 20%) e alerta (pulsante)
- Rótulos 3D: `BOX A01 · 78%`, `BOX A04 · ALERTA`
- Clique no box (ou na lista lateral) para abrir o painel com gráfico de 24 h, média, máxima e mínima

## Estrutura

```
src/
├── app/                 # layout, página e estilos globais
├── components/
│   ├── WarehouseScene   # Canvas, luzes, piso e controles
│   ├── BoxMesh          # box 3D interativo
│   ├── HistoryPanel     # painel de histórico (sparkline em SVG)
│   └── WarehouseView    # composição da tela e estado de seleção
├── data/mock.ts         # boxes e histórico simulados
├── lib/status.ts        # regras e cores de status
└── types/warehouse.ts   # tipos
```

## Próximos passos

- API em Node.js + PostgreSQL com leituras históricas
- Integração com a SmartBox API
- Atualização em tempo real (WebSocket/SSE)
- Filtros por produto e por status
