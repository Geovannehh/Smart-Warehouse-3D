"use client";

import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Edges, Html } from "@react-three/drei";
import type { MeshStandardMaterial } from "three";
import type { WarehouseBox } from "@/types/warehouse";
import { STATUS_COLOR, getStatus } from "@/lib/status";

export const BOX_SIZE: [number, number, number] = [2.4, 2.2, 2.4];
const SPACING_X = 3.5;
const SPACING_Z = 3.7;

interface BoxMeshProps {
  box: WarehouseBox;
  selected: boolean;
  onSelect: (id: string) => void;
}

export function BoxMesh({ box, selected, onSelect }: BoxMeshProps) {
  const [hovered, setHovered] = useState(false);
  const fillMaterial = useRef<MeshStandardMaterial>(null);

  const status = getStatus(box);
  const color = STATUS_COLOR[status];
  const [w, h, d] = BOX_SIZE;
  const fillHeight = Math.max(0.05, (h * box.occupancy) / 100);

  const x = (box.grid[0] - 1.5) * SPACING_X;
  const z = (box.grid[1] - 0.5) * SPACING_Z;

  useFrame(({ clock }) => {
    const mat = fillMaterial.current;
    if (!mat) return;
    const base = selected ? 0.55 : hovered ? 0.4 : 0.15;
    mat.emissiveIntensity =
      status === "alert" ? 0.35 + (Math.sin(clock.elapsedTime * 4) + 1) * 0.35 : base;
  });

  return (
    <group position={[x, 0, z]}>
      {/* Recipiente (casca transparente) */}
      <mesh
        position={[0, h / 2, 0]}
        onClick={(e) => {
          e.stopPropagation();
          onSelect(box.id);
        }}
        onPointerOver={(e) => {
          e.stopPropagation();
          setHovered(true);
          document.body.style.cursor = "pointer";
        }}
        onPointerOut={() => {
          setHovered(false);
          document.body.style.cursor = "auto";
        }}
      >
        <boxGeometry args={[w, h, d]} />
        <meshStandardMaterial color="#94a3b8" transparent opacity={selected || hovered ? 0.18 : 0.08} />
        <Edges color={selected ? "#ffffff" : color} />
      </mesh>

      {/* Conteúdo proporcional à ocupação */}
      <mesh position={[0, fillHeight / 2, 0]}>
        <boxGeometry args={[w - 0.2, fillHeight, d - 0.2]} />
        <meshStandardMaterial ref={fillMaterial} color={color} emissive={color} emissiveIntensity={0.15} />
      </mesh>

      <Html position={[0, h + 0.5, 0]} center distanceFactor={9} style={{ pointerEvents: "none" }}>
        <div className={`box-label box-label--${status}`}>
          <strong>BOX {box.id}</strong>
          <span>{box.alert ? "ALERTA" : `${box.occupancy}%`}</span>
        </div>
      </Html>
    </group>
  );
}
