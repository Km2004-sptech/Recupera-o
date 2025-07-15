var avisoModel = require("../models/avisoModel");

function listar(req, res) {
    avisoModel.listar().then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar os avisos: ", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function listarPorUsuario(req, res) {
    var idUsuario = req.params.idUsuario;

    avisoModel.listarPorUsuario(idUsuario)
        .then(
            function (resultado) {
                if (resultado.length > 0) {
                    res.status(200).json(resultado);
                } else {
                    res.status(204).send("Nenhum resultado encontrado!");
                }
            }
        )
        .catch(
            function (erro) {
                console.log(erro);
                console.log(
                    "Houve um erro ao buscar os avisos: ",
                    erro.sqlMessage
                );
                res.status(500).json(erro.sqlMessage);
            }
        );
}

function pesquisarDescricao(req, res) {
    var descricao = req.params.descricao;

    avisoModel.pesquisarDescricao(descricao)
        .then(
            function (resultado) {
                if (resultado.length > 0) {
                    res.status(200).json(resultado);
                } else {
                    res.status(204).send("Nenhum resultado encontrado!");
                }
            }
        ).catch(
            function (erro) {
                console.log(erro);
                console.log("Houve um erro ao buscar os avisos: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        );
}

function publicar(req, res) {
    var nomeLivro = req.body.nomeLivro;
    var nomeAutor = req.body.nomeAutor;
    var precoCompra = req.body.precoCompra;
    var precoVenda = req.body.precoVenda;
    var qtdEstoque = req.body.qtdEstoque;
    var genero = req.body.genero;

    if (!nomeLivro || !nomeAutor || !precoCompra || !precoVenda || !qtdEstoque || !genero) {
        res.status(400).send("Preencha todos os campos corretamente!");
    } else {
        avisoModel.publicar(nomeLivro, nomeAutor, precoCompra, precoVenda, qtdEstoque, genero)
            .then(function (resultado) {
                res.json(resultado);
            }).catch(function (erro) {
                console.log("Erro ao publicar:", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            });
    }
}


function editar(req, res) {
    var idLivro = req.params.idLivro;
    var { nomeLivro, nomeAutor, precoCompra, precoVenda, qtdEstoque, genero } = req.body;

    avisoModel.editar(idLivro, nomeLivro, nomeAutor, precoCompra, precoVenda, qtdEstoque, genero)
        .then(function (resultado) {
            res.json(resultado);
        }).catch(function (erro) {
            console.log("Erro ao editar livro:", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        });
}

function deletar(req, res) {
    var idLivro = req.params.idLivro;

    avisoModel.deletar(idLivro)
        .then(function (resultado) {
            res.json(resultado);
        }).catch(function (erro) {
            console.log("Erro ao deletar livro:", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        });
}

function inserirGenero(nome) {
    const instrucaoSql = `
        INSERT INTO genero (nome)
        VALUES ('${nome}')
        ON DUPLICATE KEY UPDATE nome = nome;
    `;
    return database.executar(instrucaoSql);
}

module.exports = {
    listar,
    listarPorUsuario,
    pesquisarDescricao,
    publicar,
    editar,
    deletar
}