var database = require("../database/config");

function usuariosCadastrados(){
    var instrucaoSql = `
        SELECT u.nome, COUNT(s.id_seguidor) as seguidores, u.id_user as idUsuario FROM seguidor as s JOIN usuario as u ON s.id_seguido = u.id_user	
	    GROUP BY u.nome, idUsuario
        ORDER BY seguidores DESC LIMIT 5;
    `
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql)
}

function curtidaPostagem(){
      var instrucaoSql = `
    SELECT ROUND(avg(curtidas),1) as mediaDeCurtidaPorPost FROM (
    SELECT p.id_postagem, count(c.id_postagem_fk)as curtidas, u.nome, u.id_user, p.titulo FROM 
	postagem as p JOIN curtida as c ON c.id_postagem_fk = p.id_postagem
    JOIN usuario as u ON p.id_user_fk = u.id_user
		group by  p.id_postagem
    ) subzinha;
    `
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql)
}
function usuarioPostagem(){
      var instrucaoSql = `
      SELECT u.id_user, u.nome, count(p.id_postagem) as postagens FROM
	usuario as u JOIN postagem as p ON p.id_user_fk = u.id_user
		GROUP BY u.id_user
			ORDER BY count(p.id_postagem) DESC LIMIT 5; 
    `
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql)
};

function postagemMaisCurtida(){
    var instrucaoSql = `
     SELECT p.id_postagem as idPostagem, 
      u.nome as usuario, u.id_user as idUsuario, COUNT(c.id_user_fk) as curtidas, p.titulo as titulo FROM postagem as p JOIN curtida as c ON c.id_postagem_fk = p.id_postagem
	JOIN usuario as u ON p.id_user_fk = u.id_user
    GROUP BY p.id_postagem, usuario
    ORDER BY curtidas DESC LIMIT 1;
    `
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql)
};

function mediaComentarioPostagem(){
    var instrucaoSql = `
         SELECT ROUND(AVG(comentarios),1) as mediaDeComentarioPorPost FROM(
        SELECT p.id_postagem, COUNT(c.mensagem) as comentarios, u.nome, u.id_user, p.titulo FROM 
	postagem as p JOIN comentario as c ON c.id_postagem_fk = p.id_postagem
    JOIN usuario as u ON p.id_user_fk = u.id_user
		GROUP BY p.id_postagem
    )subzona;
    `
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql)
}

function postagemDaSemana(){
    var instrucaoSql = `
    SELECT DATE(data_postagem) AS dataPostagem, COUNT(id_postagem) as postagem FROM postagem
	GROUP BY DATE(data_postagem)
    ORDER BY dataPostagem LIMIT 7;
    `
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql)
}

module.exports = {
    usuariosCadastrados,
    curtidaPostagem,
    usuarioPostagem,
    postagemMaisCurtida,
    mediaComentarioPostagem,
    postagemDaSemana
};