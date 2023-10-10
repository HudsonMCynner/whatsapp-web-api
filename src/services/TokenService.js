const jwt = require('jsonwebtoken');
// Middleware para verificar o token em todas as rotas

exports.validarToken = (req, res, next) => {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(403).json({ message: 'Token não fornecido' });
  }

  jwt.verify(token, process.env.PSWD_TOKEN, function(err, decoded) {
    if (err) {
      return res.status(500).send({ auth: false, message: 'Token inválido.' });
    }

    req.usuario = decoded;
    console.log("User: " + decoded)
    next();
  });
};

exports.criarToken = (dadosUsuario, tokenExpiration = process.env.TOKEN_ESPIRATION) => {
  const expirationTime = Math.floor(Date.now() / 1000) + tokenExpiration * 60; // 15 minutes
  return jwt.sign(dadosUsuario, process.env.PSWD_TOKEN, {
    expiresIn: expirationTime
  });
}
