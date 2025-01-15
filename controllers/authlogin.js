const { userExists } = require('../models/auth')
const bcrypt = require('bcrypt')

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
        console.log(user); 


        if (!user) {
            res.status(404).json({ msg: 'Email não encontrado' });
        }

        const checkPassword = await bcrypt.compare(password, user.senha_passageiro)

        if(!checkPassword){
            return res.status(422).json({msg:'senha invalida'})
        }
    },

}