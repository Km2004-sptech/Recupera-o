var database = require("../database/config");

function listar() {
    var instrucaoSql = `
        SELECT 
            id AS idAviso,
            nomeLivro,
            nomeAutor,
            precoCompra,
            precoVenda,
            qtdEstoque,
            genero
        FROM livro;
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}


// function pesquisarDescricao(texto) {
//     console.log("ACESSEI O AVISO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function pesquisarDescricao()");
//     var instrucaoSql = `
//         SELECT 
//             a.id AS idAviso,
//             a.titulo,
//             a.descricao,
//             a.fk_usuario,
//             u.id AS idUsuario,
//             u.nome,
//             u.email,
//             u.senha
//         FROM aviso a
//             INNER JOIN usuario u
//                 ON a.fk_usuario = u.id
//         WHERE a.descricao LIKE '${texto}';
//     `;
//     console.log("Executando a instrução SQL: \n" + instrucaoSql);
//     return database.executar(instrucaoSql);
// }

// function listarPorUsuario(idUsuario) {
//     console.log("ACESSEI O AVISO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listarPorUsuario()");
//     var instrucaoSql = `
//         SELECT 
//             a.id AS idAviso,
//             a.titulo,
//             a.descricao,
//             a.fk_usuario,
//             u.id AS idUsuario,
//             u.nome,
//             u.email,
//             u.senha
//         FROM aviso a
//             INNER JOIN usuario u
//                 ON a.fk_usuario = u.id
//         WHERE u.id = ${idUsuario};
//     `;
//     console.log("Executando a instrução SQL: \n" + instrucaoSql);
//     return database.executar(instrucaoSql);
// }

function publicar(nomeLivro, nomeAutor, precoCompra, precoVenda, qtdEstoque, genero) {
    console.log("Cadastrando livro:", nomeLivro, nomeAutor, precoCompra, precoVenda, qtdEstoque, genero);

    var instrucaoSql = `
        INSERT INTO livro (nomeLivro, nomeAutor, precoCompra, precoVenda, qtdEstoque, genero)
        VALUES ('${nomeLivro}', '${nomeAutor}', ${precoCompra}, ${precoVenda}, ${qtdEstoque}, '${genero}');
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function editar(idLivro, nomeLivro, nomeAutor, precoCompra, precoVenda, qtdEstoque, genero) {
    var instrucaoSql = `
        UPDATE aviso SET 
            nomeLivro = '${nomeLivro}',
            nomeAutor = '${nomeAutor}',
            precoCompra = ${precoCompra},
            precoVenda = ${precoVenda},
            qtdEstoque = ${qtdEstoque},
            genero = '${genero}'
        WHERE id = ${idLivro};
    `;
    return database.executar(instrucaoSql);
}

function deletar(idLivro) {
    console.log("Deletando livro de ID:", idLivro);
    var instrucaoSql = `
        DELETE FROM livro WHERE id = ${idLivro};
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
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
    // listarPorUsuario,
    // pesquisarDescricao,
    publicar,
    editar,
    deletar
}