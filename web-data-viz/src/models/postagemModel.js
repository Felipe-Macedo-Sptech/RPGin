var database = require("../database/config");

function postar(postagem) {
    if(postagem.img == ""){
        var instrucaoSql = `
        INSERT INTO postagem(titulo, conteudo, data_postagem, id_user_fk) VALUES 
            ('${postagem.titulo}', '${postagem.conteudo}', default, '${postagem.fkUser}');
    `;
    }else{
          var instrucaoSql = `
        INSERT INTO postagem(titulo, conteudo, data_postagem, imagemPostagem, id_user_fk) VALUES 
            ('${postagem.titulo}', '${postagem.conteudo}', default, '${postagem.img}', '${postagem.fkUser}');
    `;
    }
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql); 
}
function exibirPostagem(){
    var instrucaoSql = `
   SELECT p.id_user_fk, p.id_postagem, u.nome, p.titulo, p.conteudo,u.imagem, p.imagemPostagem, p.data_postagem, IF(COUNT(c.id_postagem_fk) = 0, '0', COUNT(c.id_postagem_fk)) as curtida
            FROM postagem AS p 
                   left join 
                usuario as u 
                    on 
        p.id_user_fk = u.id_user 
			left JOIN curtida as c ON p.id_postagem = c.id_postagem_fk
        GROUP BY p.id_postagem ORDER BY p.id_postagem DESC;
        `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function exibirPostagemPorId(idUser){
    var instrucaoSql =`
    SELECT p.id_user_fk, p.id_postagem as idPostagem, u.nome, p.titulo, p.conteudo, p.data_postagem,p.imagemPostagem, IF(COUNT(c.id_postagem_fk) = 0, '0', COUNT(c.id_postagem_fk)) as curtidas
    FROM 
	postagem AS p left JOIN usuario as u ON p.id_user_fk = u.id_user left JOIN curtida as c ON c.id_postagem_fk = p.id_postagem
	WHERE u.id_user = ${idUser}
    GROUP BY p.id_postagem,p.id_user_fk, u.nome, p.titulo, p.conteudo, p.data_postagem, p.imagemPostagem
	ORDER BY p.id_postagem DESC;
`;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
};

function exibiComentarios(idPostagem){
    var instrucaoSql = `
        SELECT c.id_user_fk, u.nome, c.mensagem FROM comentario as c JOIN usuario as u ON c.id_user_fk = u.id_user
		JOIN postagem as p ON c.id_postagem_fk = p.id_postagem WHERE p.id_postagem = ${idPostagem}
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function comentar(idUser, idPost, mensagem){
    var instrucaoSql = `
    INSERT INTO comentario (id_user_fk, id_postagem_fk, mensagem) VALUES (${idUser}, ${idPost}, '${mensagem}');
`;
console.log("Executando a instrução SQL: \n" + instrucaoSql);
return database.executar(instrucaoSql);
}

function validarCurtida(){
        var instrucaoSql = `
    SELECT id_user_fk as idUsuario, id_postagem_fk as idPostagem FROM curtida;
`;
console.log("Executando a instrução SQL: \n" + instrucaoSql);
return database.executar(instrucaoSql);
}

function curtir(idPost, idUser){
    var instrucaoSql = `
    INSERT INTO curtida (id_user_fk, id_postagem_fk) VALUES (${idUser}, ${idPost});
`;
console.log("Executando a instrução SQL: \n" + instrucaoSql);
return database.executar(instrucaoSql);
}

function deleteCurtida(idUser, idPostagem){
    var instrucaoSql = `
    DELETE FROM curtida WHERE id_user_fk = ${idUser} AND id_postagem_fk = ${idPostagem};
`;
console.log("Executando a instrução SQL: \n" + instrucaoSql);
return database.executar(instrucaoSql);
}

function exibirContagemCurtida(idPost){
    var instrucaoSql = `
            SELECT COUNT(id_postagem_fk) FROM curtida WHERE id_postagem_fk = ${idPost};`;
console.log("Executando a instrução SQL: \n" + instrucaoSql);
return database.executar(instrucaoSql);
}

function deletePostagem(idPost){
    var instrucaoSql = `
            DELETE FROM postagem WHERE id_postagem = ${idPost};`;
console.log("Executando a instrução SQL: \n" + instrucaoSql);
        return database.executar(instrucaoSql);
}
module.exports = {
    postar,
    exibirPostagem,
    exibirPostagemPorId,
    deletePostagem,
    exibiComentarios,
    comentar,
    validarCurtida,
    curtir,
    exibirContagemCurtida,
    deleteCurtida
};