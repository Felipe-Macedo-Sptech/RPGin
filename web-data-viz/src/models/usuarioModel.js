var database = require("../database/config")

function autenticar(email, senha) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ", email, senha)
    var instrucaoSql = `
        SELECT id_user, nome, bio, email, senha FROM usuario WHERE email = '${email}' AND senha = '${senha}';
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}
function cadastrar(nome, email, senha, telefone) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", nome, email, senha, telefone);
    
    var instrucaoSql = `
        INSERT INTO usuario (nome, telefone, email, senha) VALUES ('${nome}', '${telefone}', '${email}', '${senha}');
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

    function edit(update){

        if(update.img == ''){
            var instrucaoSql = `
            UPDATE usuario SET bio = '${update.bio}', nome = '${update.nome}' WHERE id_user = ${update.idUSer};  
        `;
        }else{
        var instrucaoSql = `
            UPDATE usuario SET bio = '${update.bio}', nome = '${update.nome}', imagem = '${update.img}' WHERE id_user = ${update.idUSer};  
        `;
        }
        console.log("Executando a instrução SQL: \n" + instrucaoSql);
        return database.executar(instrucaoSql);
    }

    function dadosPerfil(idUser){
        var instrucaoSql =
         `SELECT nome, bio, imagem FROM usuario WHERE id_user = ${idUser};`
             console.log("Executando a instrução SQL: \n" + instrucaoSql);
        return database.executar(instrucaoSql);
    }


    function validarSeguidor(){
         var instrucaoSql =
         `SELECT id_seguido as seguido, id_seguidor as seguidor from seguidor;`
             console.log("Executando a instrução SQL: \n" + instrucaoSql);
        return database.executar(instrucaoSql);
    }

    function seguir(seguido, seguidor){
        var instrucaoSql =
         `INSERT INTO seguidor (id_seguido, id_seguidor) VALUES (${seguido}, ${seguidor})`
             console.log("Executando a instrução SQL: \n" + instrucaoSql);
        return database.executar(instrucaoSql);
    }

    function countSeguidor(idUser){
         var instrucaoSql =
         `SELECT COUNT(id_seguidor) as seguidores FROM seguidor where id_seguido = ${idUser};
`
             console.log("Executando a instrução SQL: \n" + instrucaoSql);
        return database.executar(instrucaoSql);
    }

    function deixarDeSeguir(idUserSeguido, idUserSeguidor){
     var instrucaoSql = `
        DELETE FROM seguidor WHERE id_seguido = ${idUserSeguido} AND id_seguidor = ${idUserSeguidor};
    `
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql)
}

module.exports = {
    autenticar,
    cadastrar,
    edit,
    dadosPerfil,
    seguir,
    countSeguidor,
    validarSeguidor,
    deixarDeSeguir
};