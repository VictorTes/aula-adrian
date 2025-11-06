// controllers/authController.js
const bcrypt = require('bcryptjs'); // usar bcryptjs para evitar problemas de compilação
const jwt = require('jsonwebtoken');
const { userExists, userById } = require('../models/auth');

function checkToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) {
    return res.status(401).json({ msg: 'Acesso negado!' });
  }

  try {
    const secret = process.env.SECRET;
    jwt.verify(token, secret);
    next();
  } catch {
    res.status(400).json({ msg: 'Token inválido' });
  }
}

module.exports = {
  login: async function (req, res) {
    const { email, password } = req.body;
    if (!email) {
      return res.status(422).json({ msg: 'O email é obrigatório!' });
    }
    if (!password) {
      return res.status(422).json({ msg: 'A senha é obrigatória!' });
    }

    const user = await userExists(email);
    if (!user) {
      return res.status(404).json({ msg: 'Email não encontrado' });
    }

    const checkPassword = await bcrypt.compare(password, user.senha_passageiro);
    if (!checkPassword) {
      return res.status(422).json({ msg: 'Senha inválida' });
    }

    try {
      const secret = process.env.SECRET;
      const token = jwt.sign(
        { id: user.id_passageiro },
        secret
      );

      res.status(200).json({
        msg: "Autenticação realizada com sucesso",
        token,
        id: user.id_passageiro,
        nome: user.nome_passageiro,
        email: user.email_passageiro,
        telefone: user.telefone_passageiro,
        rua: user.rua_passageiro,
        cidade: user.cidade_passageiro
      });
    } catch (err) {
      console.error('Erro ao autenticar usuário:', err);
      res.status(500).json({
        msg: 'Aconteceu um erro no servidor, tente novamente mais tarde!',
      });
    }
  },

  Logado: async function (req, res) {
    const id = req.params.id;
    const user = await userById(id);
    if (!user) {
      return res.status(404).json({ msg: 'ID não encontrado' });
    }
    res.status(200).json({ user });
  },

  checkToken: checkToken
};
