const { criarToken } = require('../services/TokenService')
/**
 * @param req
 * @param res
 * @param next
 */
exports.login = async (req, res, next) => {
  const { usuario, senha } = req.body
  const token = criarToken({ usuario, senha })
  return res.status(200).send({
    auth: true,
    token
  })
}

/**
 * @param req
 * @param res
 * @param next
 */
exports.logoff = (req, res, next) => {
  console.log("Fez logout e cancelou o token!");
  res.status(200).send({ auth: false, token: null });
}
