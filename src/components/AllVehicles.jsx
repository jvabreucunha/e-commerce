import { useEffect, useState } from "react";
import VehicleCard from "../components/VehicleCard";

export default function AllVehicles() {
  const [vehicles, setVehicles] = useState([]);
  
  useEffect(() => {
    async function getAllVehicles() {
      const token = localStorage.getItem("token");

      try {
        const res = await fetch("http://localhost:3000/veiculo", {
          headers: {
            authorization: `${token}`,
          },
        });

        const data = await res.json();
        setVehicles(data);

      } catch (err) {
        console.error(err);
        alert("Erro ao buscar veículos");
      }
    }

    getAllVehicles();
  }, []);

  return (
    <div className="w-full flex flex-col items-center p-6">
      <div className="w-full flex flex-col items-start p-7">
        <h3 className="text-2xl font-semibold text-neutral-100 mb-4 tracking-wide">
          Explore nossa coleção completa de veículos
        </h3>
      </div>

      <div className="w-11/12 max-w-6xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {vehicles.length > 0 ? (
            vehicles.map((v) => (
              <VehicleCard key={v.id_veiculo} vehicle={v} />
            ))
          ) : (
            <p className="text-neutral-400 col-span-full text-center">
              Nenhum veículo encontrado.
            </p>
          )}
      </div>
    </div>
  );
}
