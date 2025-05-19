var postagemModel = require("../models/postagemModel");

function postar(req, res) {
    
    var img = req.file  ? req.file.filename : '';
    var {titulo, conteudo, fkUser} = req.body
    var postagem = {titulo, conteudo, img, fkUser}
        postagemModel.postar(postagem)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar a postagem! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
}

function exibirPostagem(req, res) {
    postagemModel.exibirPostagem()
        .then(function (resultado){
            res.status(200).json(resultado);
        })
}

function exibirPostagemPorId(req, res){
    var idUSer = req.params.idUser;
    postagemModel.exibirPostagemPorId(idUSer)
    .then(function (resultado){
        console.log(`resultado do id: ${idUSer}`, resultado);
        res.status(200).json(resultado)
    })
}

function exibirComentario (req, res){
    var idPostagem = req.params.idPostagem;
    postagemModel.exibiComentarios(idPostagem)
    .then(function (resultado){
        res.status(200).json(resultado)

    })
}

function comentar(req, res){
    var idPost = req.params.idPost;
    var idUser = req.body.idUserServer;
    var mensagem = req.body.mensagemServer;
    postagemModel.comentar(idUser, idPost, mensagem)
    .then(function (resultado){
        res.status(200).json(resultado)
    })
}

function curtir (req, res){
    var idPost = req.params.idPost;
    var idUser = req.params.idUser;
    postagemModel.curtir(idUser, idPost)
    .then(function (resultado){
        res.status(200).json(resultado)
    })
};

function exibirContagemCurtida(req, res){
    var idPost = req.params.idPost;
    postagemModel.exibirContagemCurtida(idPost)
    .then(function (resultado){
        res.status(200).json(resultado)
    })
};

function deletePostagem(req, res){
    var idPost = req.params.idPost;
    postagemModel.deletePostagem(idPost)
      .then(function (resultado){
        res.status(200).json(resultado)
    })
}

module.exports = {
    postar,
    exibirPostagem,
    exibirPostagemPorId,
    exibirComentario,
    comentar,
    curtir,
    exibirContagemCurtida,
    deletePostagem
}