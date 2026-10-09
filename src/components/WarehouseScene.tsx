"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import type { WarehouseBox } from "@/types/warehouse";
import { BoxMesh } from "./BoxMesh";

interface WarehouseSceneProps {
  boxes: WarehouseBox[];
  selectedId: string | null;
  onSelect: (id: string | null) => void;
}

export default function WarehouseScene({ boxes, selectedId, onSelect }: WarehouseSceneProps) {
  return (
    <Canvas
      camera={{ position: [11, 9, 12], fov: 45 }}
      onPointerMissed={() => onSelect(null)}
      dpr={[1, 2]}
    >
      <color attach="background" args={["#0b1220"]} />
      <fog attach="fog" args={["#0b1220", 22, 40]} />

      <ambientLight intensity={0.7} />
      <directionalLight position={[8, 14, 6]} intensity={1.2} />
      <directionalLight position={[-8, 6, -6]} intensity={0.4} />

      {/* Piso do armazém */}
      <mesh rotation-x={-Math.PI / 2} position={[0, -0.01, 0]}>
        <planeGeometry args={[20, 14]} />
        <meshStandardMaterial color="#111a2e" />
      </mesh>
      <gridHelper args={[20, 20, "#1e3a5f", "#16263f"]} />

      {boxes.map((box) => (
        <BoxMesh key={box.id} box={box} selected={box.id === selectedId} onSelect={onSelect} />
      ))}

      <OrbitControls
        makeDefault
        enablePan={false}
        minDistance={8}
        maxDistance={26}
        maxPolarAngle={Math.PI / 2.15}
      />
    </Canvas>
  );
}
