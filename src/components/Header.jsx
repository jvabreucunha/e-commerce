import { Link } from "react-router-dom";
import { Search, Star, User, Warehouse, Handshake } from "lucide-react";

export default function Header() {
  return (
    <header className="w-full bg-neutral-900 border-b border-neutral-700 shadow-md">
      <div className="w-full py-4 flex items-center justify-around">
        <Link
          to="/"
          className="text-2xl font-bold text-purple-400 tracking-wide"
        >
          MotorLink
        </Link>

        <div className="hidden md:flex items-center bg-neutral-900 border border-neutral-700 rounded-xl px-4 py-2 w-1/3">
          <Search className="w-5 h-5 text-neutral-500" />
          <input
            type="text"
            placeholder="Buscar veículos..."
            className="bg-transparent pl-3 text-neutral-200 placeholder-neutral-500 outline-none w-full"
          />
        </div>

        <div className="flex items-center gap-5 text-neutral-300">
          
          <Link to="/my-vehicles" className="hover:text-purple-400 transition">
            <Warehouse className="w-6 h-6" />
          </Link>

          <Link to="/propostas" className="hover:text-purple-400 transition">
            <Handshake className="w-6 h-6" />
          </Link>

          <Link to="/favoritos" className="hover:text-purple-400 transition">
            <Star className="w-6 h-6" />
          </Link>

          <Link to="/perfil" className="hover:text-purple-400 transition">
            <User className="w-6 h-6" />
          </Link>
        </div>
      </div>
    </header>
  );
}
