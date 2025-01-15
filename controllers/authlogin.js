const {userExists} = require('../models/auth')

module.exports = {

    login: async function (req, res) {
        const { email, password } = req.body
        if (!email) {
            return res.status(422).json({ msg: 'O email é obrigatório!' })
        }
        if (!password) {
            return res.status(422).json({ msg: 'a senha é obrigatório!' })
        }

        const exists = await userExists(email);
        if (!exists) {
            return res.status(404).json({ msg: 'Passageiro não encontrado.' });
        }


},

}