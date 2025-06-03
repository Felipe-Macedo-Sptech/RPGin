var chatModel = require("../models/chatModel")


function postarMensagem(req, res){
    var idReceptor = req.params.idReceptor;
    var idEnviador = req.params.idEnviador;
    var mensagem = req.body.mensagem
    chatModel.postarMensagem(idReceptor, idEnviador, mensagem)
                .then(function (resultado){
                    res.status(200).json(resultado);
            })
}

function exibirChat(req, res){
    var idReceptor = req.params.idReceptor;
    var idEnviador = req.params.idEnviador;
    chatModel.exibirChat(idReceptor, idEnviador)
           .then(function (resultado){
                    res.status(200).json(resultado);
            })
}


module.exports = {
    postarMensagem,
    exibirChat
}