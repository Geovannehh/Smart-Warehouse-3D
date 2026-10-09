import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Smart Warehouse 3D",
  description:
    "Gêmeo digital 3D de armazém com boxes clicáveis, ocupação em tempo real e histórico.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
