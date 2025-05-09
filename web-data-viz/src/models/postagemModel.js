var database = require("../database/config")

function postar(titulo, conteudo, img, fkUser) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", titulo, conteudo, img, fkUser);

    var instrucaoSql = `
        INSERT INTO postagem(titulo, conteudo, data_postagem, imagem, id_user_fk) VALUES 
            ('${titulo}', '${conteudo}', default, '${img}', '${fkUser}');
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql); 
}

function exibirPostagem(){
    var instrucaoSql = `
    SELECT p.id_user_fk, p.id_postagem, u.nome, p.titulo, p.conteudo, p.data_postagem 
            FROM postagem AS p 
                    join 
                usuario as u 
                    on 
        p.id_user_fk = u.id_user ORDER BY p.id_postagem DESC;`;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function exibirPostagemPorId(idUser){
    var instrucaoSql =`
    SELECT 
       p.id_user_fk,
	   p.id_postagem, 
	   u.nome, p.titulo, 
	   p.conteudo, 
	   p.data_postagem 
	FROM postagem AS p 
			join 
		usuario as u 
			on 
	p.id_user_fk = u.id_user WHERE u.id_user = ${idUser}
		ORDER BY p.id_postagem DESC;
`;
console.log("Executando a instrução SQL: \n" + instrucaoSql);
return database.executar(instrucaoSql);
}

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

module.exports = {
    postar,
    exibirPostagem,
    exibirPostagemPorId,
    exibiComentarios,
    comentar
};