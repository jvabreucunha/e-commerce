import { useEffect, useState } from "react";
import VehicleCard from "./VehicleCard";
import VehicleAddButton from "./VehicleAddButton";

export default function UserVehicleList() {
  const [vehicles, setVehicles] = useState([]);
  
  useEffect(() => {
    async function getMyVehicles() {
      const token = localStorage.getItem("token");

      try {
        const res = await fetch("http://localhost:3000/veiculo/meus-veiculos", {
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

    getMyVehicles();
  }, []);

  return (
    <div className="w-full flex flex-col items-center p-6">
      <div className="w-full flex items-start p-7 justify-between">
        <h3 className="text-2xl font-semibold text-neutral-100 mb-4 tracking-wide">
          Meus Anúncios
        </h3>
        <VehicleAddButton />
      </div>

      <div className="w-12/12 max-w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 px-8">
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
