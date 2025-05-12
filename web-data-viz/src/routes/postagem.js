var express = require("express");
var router = express.Router();

var postagemController = require("../controllers/postagemController");


router.post("/postar", function (req, res) {
    postagemController.postar(req, res);
}),

router.get("/exibirPostagem", function (req, res) {
    postagemController.exibirPostagem(req, res);
}),

router.get("/exibirPostagem/:idUser", function (req, res) {
    postagemController.exibirPostagemPorId(req, res);
})

router.get("/exibirComentario/:idPostagem", function (req, res) {
    postagemController.exibirComentario(req, res);
})

 router.post("/comentar/:idPost", function (req, res) {
    postagemController.comentar(req, res);
});

router.post("/curtir/:idPost/:idUser", function (req, res) {
    postagemController.curtir(req, res);
});

router.get("/exibirContagemCurtida/:idPost", function (req, res) {
    postagemController.exibirContagemCurtida(req, res);
})


module.exports = router;