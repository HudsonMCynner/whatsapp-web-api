const express = require('express');
const router = express.Router();
const controller = require('../controllers/WhatsController')
router.post('/enviar', controller.enviarMensagem);
router.get('/contatos', controller.buscarContatos);
router.get('/grupos', controller.buscarGrupos);
module.exports = router;
