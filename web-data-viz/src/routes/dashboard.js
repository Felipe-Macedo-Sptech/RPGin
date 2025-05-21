var express = require("express");
var router = express.Router();
var dashboardController = require("../controllers/dashboardController");


router.get("/usuariosCadastrados", function (req, res) {
    dashboardController.usuariosCadastrados(req, res);
});

router.get("/postagensCriadas", function (req, res) {
    dashboardController.postagensCriadas(req, res);
});

router.get("/curtidaPostagem", function (req, res) {
    dashboardController.curtidaPostagem(req, res);
});

router.get("/usuarioPostagem", function (req, res) {
    dashboardController.usuarioPostagem(req, res);
});
module.exports = router;