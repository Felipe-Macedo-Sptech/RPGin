var express = require("express");
var router = express.Router();
var dashboardController = require("../controllers/dashboardController");


router.get("/usuariosCadastrados", function (req, res) {
    dashboardController.usuariosCadastrados(req, res);
});

router.get("/postagemMaisCuritida", function (req, res) {
    dashboardController.postagemMaisCuritida(req, res);
});

router.get("/curtidaPostagem", function (req, res) {
    dashboardController.curtidaPostagem(req, res);
});

router.get("/usuarioPostagem", function (req, res) {
    dashboardController.usuarioPostagem(req, res);
});

router.get("/postagemMaisCurtida", function (req, res) {
    dashboardController.postagemMaisCurtida(req, res);
});

router.get("/mediaComentarioPostagem", function (req, res) {
    dashboardController.mediaComentarioPostagem(req, res);
});

router.get("/postagemDaSemana", function (req, res) {
    dashboardController.postagemDaSemana(req, res);
});

module.exports = router;