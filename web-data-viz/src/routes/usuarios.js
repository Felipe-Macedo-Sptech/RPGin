var express = require("express");
var router = express.Router();
const upload = require('../config/imagemUpload'); 
var usuarioController = require("../controllers/usuarioController");

//Recebendo os dados do html e direcionando para a função cadastrar de usuarioController.js
router.post("/cadastrar", function (req, res) {
    usuarioController.cadastrar(req, res);
})

router.post("/autenticar", function (req, res) {
    usuarioController.autenticar(req, res);
});

router.put("/edit/:idUser", upload.single('imagemEdit') ,function (req, res) {
    usuarioController.edit(req, res);
});

router.get("/dadosPerfil/:idUser", function (req, res) {
    usuarioController.dadosPerfil(req, res);
});

router.post("/seguir/:idSeguido/:idSeguidor", function (req, res) {
    usuarioController.seguir(req, res);
});

router.get("/countSeguidor/:idUSer", function (req, res) {
    usuarioController.countSeguidor(req, res);
});



module.exports = router;