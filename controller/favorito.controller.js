const { registrarLog } = require("../service/log.service");
const Favorito = require("../model/Favorito");
const Veiculo = require("../model/Veiculo");

const alternarFavorito = async (req, res) => {
    try {
        const id_usuario = req.usuario.id_usuario;
        const { id_veiculo } = req.params;

        const veiculo = await Veiculo.findByPk(id_veiculo);
        if (!veiculo) {
            return res.status(404).json({ message: "Veículo não encontrado." });
        }

        const favoritoExistente = await Favorito.findOne({
            where: { id_usuario, id_veiculo },
        });

        if (favoritoExistente) {
            const idFavorito = favoritoExistente.id_favorito;
            await favoritoExistente.destroy();

            await registrarLog({
                id_usuario,
                acao: "remover_favorito",
                entidade: "favorito",
                id_referencia: idFavorito,
                descricao: `Usuário removeu o veículo ${veiculo.modelo} (${veiculo.id_veiculo}) dos favoritos.`,
            });

            return res.status(200).json({
                message: "Veículo removido dos favoritos.",
                favoritado: false,
            });
        }

        const novoFavorito = await Favorito.create({ id_usuario, id_veiculo });

        await registrarLog({
            id_usuario,
            acao: "adicionar_favorito",
            entidade: "favorito",
            id_referencia: novoFavorito.id_favorito,
            descricao: `Usuário adicionou o veículo ${veiculo.modelo} (${veiculo.id_veiculo}) aos favoritos.`,
        });

        return res.status(201).json({
            message: "Veículo adicionado aos favoritos!",
            favoritado: true,
            favorito: novoFavorito,
        });
    } catch (err) {
        console.error("Erro ao alternar favorito:", err);
        res.status(500).json({ message: "Erro ao alternar favorito." });
    }
};

const listarFavoritos = async (req, res) => {
    try {
        const id_usuario = req.usuario.id_usuario;

        const favoritos = await Favorito.findAll({
            where: { id_usuario },
            include: [
                {
                    association: "veiculo",
                    attributes: [
                        "id_veiculo",
                        "marca",
                        "modelo",
                        "ano",
                        "preco",
                        "imagem_url",
                    ],
                },
            ],
        });

        await registrarLog({
            id_usuario,
            acao: "listar_favoritos",
            entidade: "favorito",
            id_referencia: null,
            descricao: `Usuário listou seus favoritos (count=${favoritos.length}).`,
        });

        res.status(200).json({ favoritos });
    } catch (err) {
        console.error("Erro ao listar favoritos:", err);
        res.status(500).json({ message: "Erro ao listar favoritos." });
    }
};

module.exports = { alternarFavorito, listarFavoritos };
