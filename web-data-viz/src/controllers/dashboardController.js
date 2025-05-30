var dashboardModel = require("../models/dashboardModel");


function usuariosCadastrados(req, res){
    dashboardModel.usuariosCadastrados()
            .then(function (resultado){
                res.status(200).json(resultado);
        })
}

function postagemMaisCuritida(req, res){
      dashboardModel.postagemMaisCuritida()
            .then(function (resultado){
                res.status(200).json(resultado);
        })
}

function curtidaPostagem(req, res){
     dashboardModel.curtidaPostagem()
            .then(function (resultado){
                res.status(200).json(resultado);
        })
}

function usuarioPostagem(req, res){
     dashboardModel.usuarioPostagem()
            .then(function (resultado){
                res.status(200).json(resultado);
        })
}

function postagemMaisCurtida(req, res){
        dashboardModel.postagemMaisCurtida()
            .then(function (resultado){
                res.status(200).json(resultado);
        }) 
}

function mediaComentarioPostagem(req, res){
         dashboardModel.mediaComentarioPostagem()
            .then(function (resultado){
                res.status(200).json(resultado);
        })
}

function postagemDaSemana(req, res){
          dashboardModel.postagemDaSemana()
            .then(function (resultado){
                res.status(200).json(resultado);
        })
}
module.exports = {
    usuariosCadastrados,
    postagemMaisCuritida,
    curtidaPostagem,
    usuarioPostagem,
    postagemMaisCurtida,
    mediaComentarioPostagem,
    postagemDaSemana
}