const express = require('express');
const router = express.Router();
const controller = require('../controllers/WhatsController')
const { validarToken } = require('../services/TokenService')
router.post('/enviar', validarToken, controller.enviarMensagem);
router.get('/contatos', validarToken, controller.buscarContatos);
router.get('/grupos', validarToken, controller.buscarGrupos);
module.exports = router;
