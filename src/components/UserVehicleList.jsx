import { useEffect, useState } from "react";
import VehicleCardHorizontal from "./VehicleCardHorizontal";
import VehicleAddButton from "./VehicleAddButton";
import { useToast } from "./ToastContext";

export default function UserVehicleList() {
  const [vehicles, setVehicles] = useState([]);
  const { showToast } = useToast();

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

  async function deleteVehicles(id) {
    const token = localStorage.getItem("token");

    try {
      const res = await fetch(`http://localhost:3000/veiculo/${id}`, {
        method: "DELETE",
        headers: {
          authorization: `${token}`,
        },
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Erro ao excluir");
      }

      setVehicles((prev) => prev.filter((v) => v.id_veiculo !== id));
      showToast(data.message, "success");

    } catch (err) {
      console.error(err);
      showToast("Erro ao excluir veículo", "error");
    }
  }

  return (
    <div className="w-full flex flex-col items-center p-6"> 
      <div className="w-full flex items-start p-7 justify-between">
        <h3 className="text-2xl font-semibold text-neutral-100 mb-4 tracking-wide">
          Meus Anúncios
        </h3>
        <VehicleAddButton />
      </div>

      <div className="w-full max-w-full flex flex-col gap-6 px-8">
        {vehicles.length > 0 ? (
          vehicles.map((v) => (
            <VehicleCardHorizontal  
              key={v.id_veiculo}
              vehicle={v}
              onEdit={(v) => abrirModalEdicao(v)}
              onDelete={(v) => deleteVehicles(v.id_veiculo)}
            />
          ))
        ) : (
          <p className="text-neutral-400 text-center py-10">
            Nenhum veículo encontrado.
          </p>
        )}
      </div>

    </div>
  );
}
