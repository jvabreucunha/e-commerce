import { Link } from "react-router-dom";
import { useState } from "react";
import { Mail, Lock, User, Phone, Home, Hash, Eye, EyeOff, UserPlus } from "lucide-react";

export default function SignUp() {
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [showSenha, setShowSenha] = useState(false);
    const [cpf, setCpf] = useState("");
    const [telefone, setTelefone] = useState("");
    const [endereco, setEndereco] = useState("");
    const [loading, setLoading] = useState(false);

    async function handleSubmit(e) {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await fetch("http://localhost:3000/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ nome, email, senha, cpf, telefone, endereco }),
            });

            const data = await response.json();

            if (!response.ok) {
                alert(data.message || "Erro ao registrar");
                return;
            }

            alert("Conta criada com sucesso!");
            window.location.href = "/login";
        } catch (err) {
            alert("Erro ao conectar com o servidor");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-neutral-950 p-4">
            <div className="w-full max-w-md bg-neutral-900/70 backdrop-blur-xl rounded-2xl p-8 shadow-xl border border-neutral-800">
                <h1 className="text-3xl font-bold text-center mb-6 text-purple-400">
                    Criar Conta
                </h1>

                <form className="space-y-6" onSubmit={handleSubmit}>

                    {/* Nome */}
                    <div className="space-y-1">
                        <label className="text-sm text-neutral-300">Nome</label>
                        <div className="relative">
                            <User className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500" />
                            <input
                                type="text"
                                value={nome}
                                onChange={(e) => setNome(e.target.value)}
                                className="w-full pl-10 px-4 py-3 rounded-xl bg-neutral-800 text-neutral-200 placeholder-neutral-500 border border-neutral-700 focus:border-purple-500 outline-none transition-all"
                                placeholder="Seu nome"
                                required
                            />
                        </div>
                    </div>

                    {/* Email */}
                    <div className="space-y-1">
                        <label className="text-sm text-neutral-300">Email</label>
                        <div className="relative">
                            <Mail className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500" />
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full pl-10 px-4 py-3 rounded-xl bg-neutral-800 text-neutral-200 placeholder-neutral-500 border border-neutral-700 focus:border-purple-500 outline-none transition-all"
                                placeholder="email@email.com"
                                required
                            />
                        </div>
                    </div>

                    {/* Senha */}
                    <div className="space-y-1">
                        <label className="text-sm text-neutral-300">Senha</label>
                        <div className="relative">
                            <Lock className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500" />

                            <input
                                type={showSenha ? "text" : "password"}
                                value={senha}
                                onChange={(e) => setSenha(e.target.value)}
                                className="w-full pl-10 pr-12 px-4 py-3 rounded-xl bg-neutral-800 text-neutral-200 placeholder-neutral-500 border border-neutral-700 focus:border-purple-500 outline-none transition-all"
                                placeholder="********"
                                required
                            />

                            <button
                                type="button"
                                onClick={() => setShowSenha(!showSenha)}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-purple-400 transition"
                            >
                                {showSenha ? <EyeOff /> : <Eye />}
                            </button>
                        </div>
                    </div>

                    {/* CPF */}
                    <div className="space-y-1">
                        <label className="text-sm text-neutral-300">CPF</label>
                        <div className="relative">
                            <Hash className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500" />
                            <input
                                type="text"
                                value={cpf}
                                onChange={(e) => setCpf(e.target.value)}
                                className="w-full pl-10 px-4 py-3 rounded-xl bg-neutral-800 text-neutral-200 placeholder-neutral-500 border border-neutral-700 focus:border-purple-500 outline-none transition-all"
                                placeholder="000.000.000-00"
                                required
                            />
                        </div>
                    </div>

                    {/* Telefone */}
                    <div className="space-y-1">
                        <label className="text-sm text-neutral-300">Telefone</label>
                        <div className="relative">
                            <Phone className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500" />
                            <input
                                type="text"
                                value={telefone}
                                onChange={(e) => setTelefone(e.target.value)}
                                className="w-full pl-10 px-4 py-3 rounded-xl bg-neutral-800 text-neutral-200 placeholder-neutral-500 border border-neutral-700 focus:border-purple-500 outline-none transition-all"
                                placeholder="(00) 00000-0000"
                                required
                            />
                        </div>
                    </div>

                    {/* Endereço */}
                    <div className="space-y-1">
                        <label className="text-sm text-neutral-300">Endereço</label>
                        <div className="relative">
                            <Home className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500" />
                            <input
                                type="text"
                                value={endereco}
                                onChange={(e) => setEndereco(e.target.value)}
                                className="w-full pl-10 px-4 py-3 rounded-xl bg-neutral-800 text-neutral-200 placeholder-neutral-500 border border-neutral-700 focus:border-purple-500 outline-none transition-all"
                                placeholder="Rua, número, bairro..."
                                required
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-3 flex items-center justify-center gap-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-semibold transition-all shadow-lg shadow-purple-600/20 disabled:opacity-40"
                    >
                        <UserPlus className="w-5 h-5" />
                        {loading ? "Criando conta..." : "Registrar"}
                    </button>
                </form>

                <p className="text-neutral-400 text-sm text-center mt-6">
                    Já tem conta?{" "}
                    <Link to="/login" className="text-purple-400 hover:text-purple-300">
                        Entrar
                    </Link>
                </p>
            </div>
        </div>
    );
}
