var database = require("../database/config");

function usuariosCadastrados(){
    var instrucaoSql = `
        SELECT COUNT(id_user) as cadastrados FROM usuario;
    `
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql)
}

function postagemMaisCuritida(){
      var instrucaoSql = `
       SELECT id_postagem as idPostagem, max(curtidas) as curtidas, nome as autorPostagem, id_user as idUsuario FROM (
SELECT p.id_postagem, count(c.id_postagem_fk)as curtidas, u.nome, u.id_user FROM 
	postagem as p JOIN curtida as c ON c.id_postagem_fk = p.id_postagem
    JOIN usuario as u ON p.id_user_fk = u.id_user
		group by  p.id_postagem LIMIT 1
) subzinha
group by id_postagem, nome, id_user;
    `
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql)
}

function curtidaPostagem(){
      var instrucaoSql = `
 SELECT id_postagem as idPostagem, max(curtidas) as curtidas, nome as autorPostagem, id_user as idUsuario, titulo as tituloPostagem FROM (
SELECT p.id_postagem, count(c.id_postagem_fk)as curtidas, u.nome, u.id_user, p.titulo FROM 
	postagem as p JOIN curtida as c ON c.id_postagem_fk = p.id_postagem
    JOIN usuario as u ON p.id_user_fk = u.id_user
		group by  p.id_postagem LIMIT 1
) subzinha
group by id_postagem, nome, id_user, titulo;
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
}

module.exports = {
    usuariosCadastrados,
    postagemMaisCuritida,
    curtidaPostagem,
    usuarioPostagem
};