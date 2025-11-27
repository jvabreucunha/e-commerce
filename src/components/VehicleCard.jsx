import { Gauge, Droplets } from "lucide-react";

export default function VehicleCard({ vehicle }) {
  const orderedImages = vehicle.imagens ? [...vehicle.imagens].sort((a, b) => a.ordem - b.ordem): [];
  const mainImage = `http://localhost:3000/${orderedImages[0].caminho}`;

  return (
    <div
      className="
      bg-neutral-900 border border-neutral-800 rounded-xl overflow-hidden
      hover:border-purple-500 transition cursor-pointer shadow-md
    "
    >
      <div className="w-full h-40 bg-neutral-800 relative">
        <img
          src={mainImage}
          alt={vehicle.modelo}
          className="w-full h-full object-cover"
        />

      </div>

      <div className="p-4">
        <h3 className="text-neutral-100 font-semibold text-lg leading-tight">
          {vehicle.marca} {vehicle.modelo} {vehicle.ano}
        </h3>

        <div className="flex items-center gap-4 text-neutral-400 text-sm mt-2">
          <div className="flex items-center gap-1">
            <Gauge size={16} /> {vehicle.quilometragem.toLocaleString("pt-BR")}{" "}
            km
          </div>

          <div className="flex items-center gap-1">
            <Droplets size={16} /> {vehicle.cor}
          </div>

          <div className="flex items-center gap-1">
            <span className="text-sm">⚙️</span> {vehicle.cambio}
          </div>
        </div>

        <p className="text-purple-400 font-bold text-xl mt-3">
          R$ {Number(vehicle.preco).toLocaleString("pt-BR")}
        </p>
      </div>
    </div>
  );
}
