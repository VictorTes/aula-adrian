
express = require('express')
app = express()
router = require('./routes/passageiroRoutes')
const routerauth = require('./routes/authUser')
require('dotenv').config()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const cors = require('cors');
app.use(cors());
app.use(express.json());


const port = 3000

app.use(router)
app.use(routerauth)

app.get('/', (req, res) => {
    res.status(200).json({ msg: 'bem vindo a api' })
})

// app.post('/auth/register', async (req, res) => {
//     const { name, email, password, confirmpassword } = req.body

//     if(!name){
//         return res.status(422).json({msg: 'O nome é obrigatório!'})
//     }
//     if(!email){
//         return res.status(422).json({msg: 'O email é obrigatório!'})
//     }
//     if(!password){
//         return res.status(422).json({msg: 'a senha é obrigatório!'})
//     }
//     if(password!== confirmpassword){
//         return res.status(422).json({msg: 'a senhas precisão ser iguais!'})
//     }
    
// })

console.log('o server esta online na porta ' + port)
app.listen(port)