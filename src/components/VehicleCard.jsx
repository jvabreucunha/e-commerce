import { Gauge } from "lucide-react";

export default function VehicleCard({ vehicle }) {
  const orderedImages = vehicle.imagens
    ? [...vehicle.imagens].sort((a, b) => a.ordem - b.ordem)
    : [];
  const mainImage = `http://localhost:3000/${orderedImages[0].caminho}`;

  function truncateString(text, limit) {
    if (!text) return "";
    return text.length > limit ? text.slice(0, limit) + "..." : text;
  }

  return (
    <div
      className="
      bg-neutral-900 border border-neutral-800 rounded-xl overflow-hidden
      hover:border-purple-500 transition cursor-pointer shadow-md
    "
    >
      <div className="w-full h-60 bg-neutral-800 relative">
        <img
          src={mainImage}
          alt={vehicle.modelo}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="p-4">
        <h3 className="text-neutral-100 font-semibold text-lg leading-tight">
          {truncateString(`${vehicle.marca} ${vehicle.modelo} ${vehicle.ano}`, 60)}
        </h3>

        <div className="flex items-center gap-4 text-neutral-400 text-sm mt-2">
          <div className="flex items-center gap-1">
            <Gauge size={16} />
            {truncateString(`${vehicle.quilometragem.toLocaleString("pt-BR")}`, 10)}
             km
          </div>

          <div className="flex items-center gap-1">|</div>

          <div className="flex items-center gap-1">
            <span className="text-sm">⚙️</span>
            {truncateString(`${vehicle.cambio}`, 10)}
          </div>
        </div>

        <p className="text-purple-400 font-bold text-xl mt-3">
          R$ 
          {truncateString(`${Number(vehicle.preco).toLocaleString("pt-BR")}`, 15)}
          
          
        </p>
      </div>
    </div>
  );
}
