var usuarioModel = require("../models/usuarioModel");

function autenticar(req, res) {
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;

    if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está indefinida!");
    } else {

        usuarioModel.autenticar(email, senha)
            .then(
                function (resultadoAutenticar) {
                    console.log(`\nResultados encontrados: ${resultadoAutenticar.length}`);
                    console.log(`Resultados: ${JSON.stringify(resultadoAutenticar)}`); 

                    if (resultadoAutenticar.length == 1) {
                        console.log(resultadoAutenticar);
                        res.json({
                            id_user: resultadoAutenticar[0].id_user,
                            nome: resultadoAutenticar[0].nome,
                            email: resultadoAutenticar[0].email,
                            senha: resultadoAutenticar[0].senha,
                            bio: resultadoAutenticar[0].bio
                        })
                
                    } else if (resultadoAutenticar.length == 0) {
                        res.status(403).send("Email e/ou senha inválido(s)");
                    } else {
                        res.status(403).send("Mais de um usuário com o mesmo login e senha!");
                    }
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log("\nHouve um erro ao realizar o login! Erro: ", erro.sqlMessage);
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}
function cadastrar(req, res) {
    // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
    var nome = req.body.nomeServer;
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;
    var telefone = req.body.telefoneServer;

    // Faça as validações dos valores
    if (nome == undefined) {
        res.status(400).send("Seu nome está undefined!");
    } else if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está undefined!");
    } else if (telefone == undefined) {
        res.status(400).send("Sua empresa a vincular está undefined!");
    } else {

        // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
        usuarioModel.cadastrar(nome, email, senha, telefone)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o cadastro! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

function edit (req, res){
    var idUSer = req.params.idUser;
    var img = req.file ? req.file.filename : '';
    var {nome, bio} = req.body
    var update = {idUSer, nome, bio, img}
    usuarioModel.edit(update)
    .then(function (resultado){
         res.status(200).json(resultado)
         console.log('resultado o edit: ', resultado)
    })
}

function dadosPerfil(req, res){
    var idUSer = req.params.idUser;
    usuarioModel.dadosPerfil(idUSer)
    .then(function (resultado){
         res.status(200).json(resultado)
         console.log('resultado o dadosPerfil: ', resultado)
    })
}

function seguir(req, res){
    var seguido = req.params.idSeguido;
    var seguidor = req.params.idSeguidor;
    usuarioModel.seguir(seguido, seguidor)
    .then(function (resultado){
         res.status(200).json(resultado)
    })
}

function countSeguidor(req, res){
    var idUser = req.params.idUSer;
    usuarioModel.countSeguidor(idUser)
    .then(function (resultado){
         res.status(200).json(resultado)
    })
}

function validarSeguidor(req, res){
     usuarioModel.validarSeguidor()
    .then(function (resultado){
         res.status(200).json(resultado)
    })
}

function deixarDeSeguir(req, res){
    var idUserSeguido = req.params.idUserSeguido;
    var idUserSeguidor = req.params.idUserSeguidor;
     usuarioModel.deixarDeSeguir(idUserSeguido, idUserSeguidor)
    .then(function (resultado){
         res.status(200).json(resultado)
    })
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
}