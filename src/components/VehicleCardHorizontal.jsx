import React from "react";
import { Gauge, Edit2, Trash2 } from "lucide-react";

export default function VehicleCard({ vehicle = {}, onEdit = () => {}, onDelete = () => {} }) {
  const orderedImages = vehicle.imagens ? [...vehicle.imagens].sort((a, b) => a.ordem - b.ordem) : [];
  const mainImage = `http://localhost:3000/${orderedImages[0].caminho}`;

  function truncateString(text, limit) {
    if (!text) return "";
    return text.length > limit ? text.slice(0, limit) + "..." : text;
  }

  function handleEdit(e) {
    e.stopPropagation();
    onEdit(vehicle);
  }

  function handleDelete(e) {
    e.stopPropagation();
    if (confirm("Tem certeza que deseja excluir este veículo?")) {
      onDelete(vehicle);
    }
  }

  return (
    <article
      className="w-full flex bg-neutral-900 border border-neutral-800 rounded-xl overflow-hidden hover:border-purple-500 transition-shadow shadow-md cursor-pointer"
      role="group"
      aria-label={`${vehicle.marca || "Veículo"} ${vehicle.modelo || ""}`}
    >
      <div className="w-36 md:w-48 lg:w-56 flex-shrink-0 bg-neutral-800">
        <img
          src={mainImage}
          alt={vehicle.modelo || "Veículo"}
          className="w-full h-full object-cover block"
          loading="lazy"
          draggable={false}
        />
      </div>

      <div className="flex-1 p-4 flex flex-col justify-between gap-3">
        <div>
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <h3 className="text-neutral-100 font-semibold text-lg leading-tight truncate">
                {truncateString(`${vehicle.marca || ""} ${vehicle.modelo || ""} ${vehicle.ano || ""}`, 80)}
              </h3>

              <p className="text-neutral-400 text-sm mt-1 truncate">
                {truncateString(vehicle.descricao || vehicle.observacao || "Sem descrição", 120)}
              </p>

              <div className="flex items-center gap-4 text-neutral-400 text-sm mt-3">
                <div className="flex items-center gap-1">
                  <Gauge size={16} />
                  <span>
                    {vehicle.quilometragem !== undefined && vehicle.quilometragem !== null
                      ? `${vehicle.quilometragem.toLocaleString("pt-BR")} km`
                      : "-- km"}
                  </span>
                </div>

                <div className="opacity-30">|</div>

                <div className="flex items-center gap-1">
                  <span className="text-sm">⚙️</span>
                  <span>{vehicle.cambio || "--"}</span>
                </div>
              </div>
            </div>

            <div className="flex-shrink-0 ml-2 flex flex-col items-end gap-2">
              <button
                onClick={handleEdit}
                aria-label="Editar veículo"
                className="w-24 h-7 inline-flex items-center gap-2 px-3 py-1 rounded-md border border-blue-500/20 hover:border-blue-500/40 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-blue-400 transition bg-blue-500/10"
                title="Editar"
              >
                <Edit2 size={16}  className="text-blue-500"/>
                <span className="text-xs text-blue-500  hidden sm:inline">Editar</span>
              </button>

              <button
                onClick={handleDelete}
                aria-label="Excluir veículo"
                className="w-24 h-7 inline-flex items-center gap-2 px-3 py-1 rounded-md bg-red-50 dark:bg-red-900/30 text-red-600 hover:bg-red-100 dark:hover:bg-red-900/20 border border-transparent hover:border-red-600 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-red-300 transition"
                title="Excluir"
              >
                <Trash2 size={16} />
                <span className="text-xs hidden sm:inline">Excluir</span>
              </button>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <p className="text-purple-400 font-bold text-xl">
              R$ {vehicle.preco ? Number(vehicle.preco).toLocaleString("pt-BR", { minimumFractionDigits: 2 }) : "--"}
            </p>
          </div>

          <div className="text-xs text-neutral-400">{vehicle.status || vehicle.ano ? `${vehicle.status || ""}` : null}</div>
        </div>
      </div>
    </article>
  );
}
