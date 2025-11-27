import { Link } from "react-router-dom";
import { PlusCircle } from "lucide-react";

export default function VehicleAddButton() {
  return (
    <Link
      to="/add-vehicle"
      className="flex w-60 items-center gap-2 px-4 py-2 rounded-md bg-purple-600 hover:bg-purple-700 text-white font-medium shadow-md transition-all duration-200"
    >
      <PlusCircle className="w-5 h-5" />
      Cadastrar Veículo
    </Link>
  );
}
