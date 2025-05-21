var dashboardModel = require("../models/dashboardModel");


function usuariosCadastrados(req, res){
    dashboardModel.usuariosCadastrados()
            .then(function (resultado){
                res.status(200).json(resultado);
        })
}

function postagensCriadas(req, res){
      dashboardModel.postagensCriadas()
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
module.exports = {
    usuariosCadastrados,
    postagensCriadas,
    curtidaPostagem,
    usuarioPostagem
}