var database = require("../database/config");

function usuariosCadastrados(){
    var instrucaoSql = `
        SELECT COUNT(id_user) as cadastrados FROM usuario;
    `
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql)
}

function postagensCriadas(){
      var instrucaoSql = `
        SELECT 	COUNT(id_postagem) as postagem FROM postagem;
    `
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql)
}

function curtidaPostagem(){
      var instrucaoSql = `
        SELECT AVG(totalCurtidaPorPostagem) as Media FROM (
    SELECT p.id_postagem , COUNT(*) as totalCurtidaPorPostagem FROM 
	postagem as p JOIN curtida as c ON c.id_postagem_fk = p.id_postagem 
		group by  p.id_postagem
) as subQuerry
    `
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql)
}
function usuarioPostagem(){
      var instrucaoSql = `
       SELECT COUNT(u.id_user) as usuario, COUNT(p.id_postagem) as postagem FROM 
	    usuario as u LEFT JOIN postagem as p ON p.id_user_fk = u.id_user;
    `
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql)
}

module.exports = {
    usuariosCadastrados,
    postagensCriadas,
    curtidaPostagem,
    usuarioPostagem
};