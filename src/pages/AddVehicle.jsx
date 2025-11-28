import { useState } from "react";
import { useToast } from "../components/ToastContext";

export default function AddVehicle() {
  const [form, setForm] = useState({
    marca: "",
    modelo: "",
    ano: "",
    preco: "",
    quilometragem: "",
    categoria: "",
    cor: "",
    combustivel: "",
    cambio: "",
    descricao: "",
  });

  const [imagens, setImagens] = useState([]);
  const [loading, setLoading] = useState(false);
  const { showToast } = useToast();

  function updateInput(campo, valor) {
    setForm((prev) => ({ ...prev, [campo]: valor }));
  }

  async function createVehicle(e) {
    e.preventDefault();
    setLoading(true);

    try {
      const token = localStorage.getItem("token");

      const formData = new FormData();

      Object.keys(form).forEach((key) => {
        formData.append(key, form[key]);
      });

      imagens.forEach((imagem) => {
        formData.append("imagens", imagem);
      });

      const response = await fetch("http://localhost:3000/veiculo", {
        method: "POST",
        headers: {
          Authorization: `${token}`,
        },
        body: formData,
      });

      const data = await response.json();

      if (data.success) {

        setForm({
          marca: "",
          modelo: "",
          ano: "",
          preco: "",
          quilometragem: "",
          categoria: "",
          cor: "",
          combustivel: "",
          cambio: "",
          descricao: "",
        });
        setImagens([]);

        window.location.href = "/my-vehicles";
      } else {
        showToast(data.message || "Erro ao cadastrar veículo", "error");
      }
    } catch (err) {
      console.error("Erro na requisição:", err);
      showToast("Erro de conexão com o servidor", "error");
    } finally {
      setLoading(false);
    }
  }

  function SelectField({ label, value, onChange, options }) {
    return (
      <div className="flex flex-col gap-1 w-full">
        <label className="text-neutral-300 text-sm">{label}</label>
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="bg-neutral-800 text-neutral-200 p-3 rounded-lg border border-neutral-700 focus:outline-none focus:ring focus:ring-purple-500"
        >
          <option value="">Selecione...</option>
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>
    );
  }

  function handleImageUpload(e) {
    const files = Array.from(e.target.files);

    if (files.length + imagens.length > 5) {
      showToast("Máximo de 5 imagens!", "error");
      return;
    }

    setImagens((prev) => [...prev, ...files]);
  }

  function removeImage(index) {
    setImagens((prev) => prev.filter((_, i) => i !== index));
  }

  return (
    <div className="w-full min-h-screen bg-neutral-900 flex justify-center py-10 px-4">
      <div className="w-full max-w-xl bg-neutral-800 p-8 rounded-2xl shadow-xl border border-neutral-700">
        <h2 className="text-2xl font-semibold text-neutral-100 mb-6 tracking-wide">
          Cadastrar Veículo
        </h2>

        <form onSubmit={createVehicle} className="flex flex-col gap-5">
          <div className="flex flex-col gap-1 w-full">
            <label className="text-neutral-300 text-sm">Marca</label>
            <input
              type="text"
              value={form.marca}
              onChange={(e) => updateInput("marca", e.target.value)}
              className="bg-neutral-800 text-neutral-200 p-3 rounded-lg border border-neutral-700 focus:outline-none focus:ring focus:ring-purple-500"
            />
          </div>

          <div className="flex flex-col gap-1 w-full">
            <label className="text-neutral-300 text-sm">Modelo</label>
            <input
              type="text"
              value={form.modelo}
              onChange={(e) => updateInput("modelo", e.target.value)}
              className="bg-neutral-800 text-neutral-200 p-3 rounded-lg border border-neutral-700 focus:outline-none focus:ring focus:ring-purple-500"
            />
          </div>

          <div className="flex flex-col gap-1 w-full">
            <label className="text-neutral-300 text-sm">Ano</label>
            <input
              type="number"
              value={form.ano}
              onChange={(e) => updateInput("ano", e.target.value)}
              className="bg-neutral-800 text-neutral-200 p-3 rounded-lg border border-neutral-700 focus:outline-none focus:ring focus:ring-purple-500"
            />
          </div>

          <div className="flex flex-col gap-1 w-full">
            <label className="text-neutral-300 text-sm">Preço</label>
            <input
              type="number"
              value={form.preco}
              onChange={(e) => updateInput("preco", e.target.value)}
              className="bg-neutral-800 text-neutral-200 p-3 rounded-lg border border-neutral-700 focus:outline-none focus:ring focus:ring-purple-500"
            />
          </div>

          <div className="flex flex-col gap-1 w-full">
            <label className="text-neutral-300 text-sm">Quilometragem</label>
            <input
              type="number"
              value={form.quilometragem}
              onChange={(e) => updateInput("quilometragem", e.target.value)}
              className="bg-neutral-800 text-neutral-200 p-3 rounded-lg border border-neutral-700 focus:outline-none focus:ring focus:ring-purple-500"
            />
          </div>

          <SelectField
            label="Categoria"
            value={form.categoria}
            onChange={(v) => updateInput("categoria", v)}
            options={[
              { value: "sedan", label: "Sedan" },
              { value: "SUV", label: "SUV" },
              { value: "hatch", label: "Hatch" },
              { value: "picape", label: "Picape" },
              { value: "outro", label: "Outro" },
            ]}
          />

          <SelectField
            label="Combustível"
            value={form.combustivel}
            onChange={(v) => updateInput("combustivel", v)}
            options={[
              { value: "gasolina", label: "Gasolina" },
              { value: "flex", label: "Flex" },
              { value: "etanol", label: "Etanol" },
              { value: "diesel", label: "Diesel" },
              { value: "eletrico", label: "Elétrico" },
            ]}
          />

          <SelectField
            label="Câmbio"
            value={form.cambio}
            onChange={(v) => updateInput("cambio", v)}
            options={[
              { value: "manual", label: "Manual" },
              { value: "automatico", label: "Automático" },
            ]}
          />

          <div className="flex flex-col gap-1 w-full">
            <label className="text-neutral-300 text-sm">Cor</label>
            <input
              type="text"
              value={form.cor}
              onChange={(e) => updateInput("cor", e.target.value)}
              className="bg-neutral-800 text-neutral-200 p-3 rounded-lg border border-neutral-700 focus:outline-none focus:ring focus:ring-purple-500"
            />
          </div>

          <div className="flex flex-col gap-1 w-full">
            <label className="text-neutral-300 text-sm">Descrição</label>
            <textarea
              value={form.descricao}
              onChange={(e) => updateInput("descricao", e.target.value)}
              className="bg-neutral-800 text-neutral-200 p-3 rounded-lg border border-neutral-700 h-28 resize-none focus:outline-none focus:ring focus:ring-purple-500"
            />
          </div>

          {imagens.length > 0 && (
            <div className="flex flex-col gap-2">
              <label className="text-neutral-300 text-sm">
                Pré-visualização:
              </label>
              <div className="flex flex-wrap gap-2">
                {imagens.map((imagem, index) => (
                  <div key={index} className="relative">
                    <img
                      src={URL.createObjectURL(imagem)}
                      alt={`Preview ${index + 1}`}
                      className="w-20 h-20 object-cover rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="flex flex-col gap-1 w-full">
            <label className="text-neutral-300 text-sm">Imagens (1 a 5)</label>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageUpload}
              className="bg-neutral-800 text-neutral-200 p-3 rounded-lg border border-neutral-700 cursor-pointer"
            />
            <p className="text-neutral-400 text-xs">
              Selecionadas: {imagens.length}/5
            </p>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-purple-600 hover:bg-purple-700 disabled:bg-purple-400 transition text-white font-medium py-2 px-4 rounded-lg"
          >
            {loading ? "Cadastrando..." : "Cadastrar Veículo"}
          </button>
        </form>
      </div>
    </div>
  );
}
