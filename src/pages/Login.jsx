import { Link } from "react-router-dom";
import { useState } from "react";
import { Mail, Lock, Eye, EyeOff, LogIn } from "lucide-react";

export default function Login() {
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [showSenha, setShowSenha] = useState(false);
    const [loading, setLoading] = useState(false);

    async function handleSubmit(e) {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await fetch("http://localhost:3000/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, senha }),
            });

            const data = await response.json();

            if (!response.ok) {
                alert(data.message || "Erro ao fazer login");
                return;
            }

            localStorage.setItem("token", data.token);
            window.location.href = "/";
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
                    Bem-vindo
                </h1>

                <form className="space-y-6" onSubmit={handleSubmit}>

                    <div className="space-y-1">
                        <label className="text-sm text-neutral-300">Email</label>
                        <div className="relative">
                            <Mail className="w-5 h-5 absolute left-3 top-5/10 -translate-y-2/7 text-neutral-500" />
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full pl-10 mt-1 px-4 py-3 rounded-xl bg-neutral-800 text-neutral-200 placeholder-neutral-500 border border-neutral-700 focus:border-purple-500 outline-none transition-all"
                                placeholder="email@email.com"
                                required
                            />
                        </div>
                    </div>

                    <div className="space-y-1">
                        <label className="text-sm text-neutral-300">Senha</label>
                        <div className="relative">
                            <Lock className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500" />

                            <input
                                type={showSenha ? "text" : "password"}
                                value={senha}
                                onChange={(e) => setSenha(e.target.value)}
                                className="w-full pl-10 pr-12 mt-1 px-4 py-3 rounded-xl bg-neutral-800 text-neutral-200 placeholder-neutral-500 border border-neutral-700 focus:border-purple-500 outline-none transition-all"
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

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-3 flex items-center justify-center gap-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-semibold transition-all shadow-lg shadow-purple-600/20 disabled:opacity-40"
                    >
                        <LogIn className="w-5 h-5" />
                        {loading ? "Entrando..." : "Entrar"}
                    </button>
                </form>

                <p className="text-neutral-400 text-sm text-center mt-6">
                    Não tem conta?{" "}
                    <Link to="/signup" className="text-purple-400 hover:text-purple-300">
                        Criar agora
                    </Link>
                </p>
            </div>
        </div>
    );
}
