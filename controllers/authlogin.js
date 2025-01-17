const bcrypt = require('bcrypt')
const { func } = require('joi')
const jwt = require('jsonwebtoken')
const { userExists, userById } = require('../models/auth');  // Certifique-se de que o caminho está correto

function checkToken(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(" ")[1]
    if (!token) {
        return res.status(401).json({ msg: 'Acesso negado!' })
    }

    try {
        const secret = process.env.SECRET
        jwt.verify(token, secret)
        next()
    } catch {
        res.status(400).json({ msg: 'Token invalido' })
    }
}

module.exports = {


    login: async function (req, res) {
        const { email, password } = req.body
        if (!email) {
            return res.status(422).json({ msg: 'O email é obrigatório!' })
        }
        if (!password) {
            return res.status(422).json({ msg: 'a senha é obrigatório!' })
        }

        const user = await userExists(email);


        // console.log(user.senha_passageiro)

        if (!user) {
            return res.status(404).json({ msg: 'Email não encontrado' });
        }

        const checkPassword = await bcrypt.compare(password, user.senha_passageiro)

        if (!checkPassword) {
            return res.status(422).json({ msg: 'senha invalida' })
        }

        try {

            const secret = process.env.SECRET

            const token = jwt.sign(
                {
                    id: user.id_passageiro,
                },
                secret,
            )
            res.status(200).json({ msg: 'Autenticação realizada com sucesso', token })

        } catch (err) {
            console.error('Erro ao deletar passageiro:', err);

            res.status(500).json({
                msg: 'Aconteceu um erro no servidor, tente novamente mais tarde!',
            })
        }
    },


    Logado: async function (req, res) {
        const id = req.params.id

        const user = await userById(id);
        if (!user) {
            return res.status(404).json({ msg: 'id não encontrado' });
        }

        res.status(200).json({ user })
    },

    checkToken: checkToken

}