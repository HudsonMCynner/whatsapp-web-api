const express = require('express');
const router = express.Router();
const controller = require('../controllers/WhatsController');
const { validarToken } = require('../services/TokenService');
const multer = require('multer');

// Configurar o multer para lidar com o upload de imagens
const storage = multer.memoryStorage(); // Pode escolher o local de armazenamento apropriado
const upload = multer({ storage: storage });

router.all('*', validarToken)
router.post('/login', controller.inicializar);
router.post('/enviar', upload.any('files'), controller.enviarMensagem);
router.get('/contatos', controller.buscarContatos);
router.get('/grupos', controller.buscarGrupos);

module.exports = router;
