var database = require("../database/config");

function postarMensagem(idReceptor, idEnviador, mensagem){
    var instrucaoSql = `
    INSERT INTO chat (id_receptor, id_enviador, mensagem) VALUES (${idReceptor}, ${idEnviador}, '${mensagem}');
`;
console.log("Executando a instrução SQL: \n" + instrucaoSql);
return database.executar(instrucaoSql);
}

function exibirChat(idReceptor, idEnviador){
    var instrucaoSql = `
    SELECT mensagem as chat, id_enviador as idEnviador FROM chat WHERE (id_receptor = ${idReceptor} AND id_enviador = ${idEnviador}) OR 
    (id_receptor = ${idEnviador} AND id_enviador = ${idReceptor}) ORDER BY id_chat ASC;
`;
console.log("Executando a instrução SQL: \n" + instrucaoSql);
return database.executar(instrucaoSql);
}


module.exports = {
    postarMensagem,
    exibirChat
}