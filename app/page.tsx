"use client";
import { useState } from "react";

const obras = [
  { id: 1, nombre: "Escuela N°45 - Rosario", comitente: "Ministerio de Educación", apertura: "25/06/2025", monto: "$12.500.000", estado: "en_curso" },
  { id: 2, nombre: "Pavimentación Av. Belgrano", comitente: "Municipalidad de Rosario", apertura: "10/07/2025", monto: "$8.200.000", estado: "proxima" },
  { id: 3, nombre: "Refacción Hospital Central", comitente: "Ministerio de Salud", apertura: "15/03/2025", monto: "$22.000.000", estado: "finalizada" },
];

const estadoLabel: Record<string, string> = {
  en_curso: "🟢 En curso",
  proxima: "🟡 Próxima",
  finalizada: "⚫ Finalizada",
};

export default function Home() {
  const [seccion, setSeccion] = useState<"en_curso" | "proxima" | "finalizada">("en_curso");

  const obrasFiltradas = obras.filter((o) => o.estado === seccion);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-1">Portal de Licitaciones</h1>
        <p className="text-gray-500 mb-8">PH Constructora SRL</p>

        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Licitaciones</h2>

        {/* Tabs */}
        <div className="flex gap-2 mb-6">
          {(["en_curso", "proxima", "finalizada"] as const).map((s) => (
            <button
              key={s}
              onClick={() => setSeccion(s)}
              className={`px-5 py-2 rounded-full font-medium text-sm transition-colors ${
                seccion === s
                  ? "bg-gray-800 text-white"
                  : "bg-white text-gray-600 border border-gray-300 hover:bg-gray-50"
              }`}
            >
              {estadoLabel[s]}
            </button>
          ))}
        </div>

        {/* Tabla */}
        <div className="bg-white rounded-xl shadow overflow-hidden">
          {obrasFiltradas.length === 0 ? (
            <p className="p-6 text-gray-400">No hay obras en esta sección.</p>
          ) : (
            <table className="w-full text-sm">
              <thead className="bg-gray-50 text-gray-500 uppercase text-xs">
                <tr>
                  <th className="px-6 py-3 text-left">Obra</th>
                  <th className="px-6 py-3 text-left">Comitente</th>
                  <th className="px-6 py-3 text-left">Apertura</th>
                  <th className="px-6 py-3 text-left">Monto est.</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {obrasFiltradas.map((obra) => (
                  <tr key={obra.id} className="hover:bg-gray-50 cursor-pointer">
                    <td className="px-6 py-4 font-medium text-gray-800">{obra.nombre}</td>
                    <td className="px-6 py-4 text-gray-600">{obra.comitente}</td>
                    <td className="px-6 py-4 text-gray-600">{obra.apertura}</td>
                    <td className="px-6 py-4 text-gray-600">{obra.monto}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}