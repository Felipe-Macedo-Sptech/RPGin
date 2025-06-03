var express = require("express");
var router = express.Router();
var chatController = require("../controllers/chatController")

router.post("/postarMensagem/:idReceptor/:idEnviador", function (req, res){
    chatController.postarMensagem(req, res)
})

router.post("/exibirChat/:idReceptor/:idEnviador", function (req, res){
    chatController.exibirChat(req, res)
})

module.exports = router;