
express = require('express')
app = express()
router = require('./routes/passageiroRoutes')
require('dotenv').config()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const cors = require('cors');

app.use(cors());
app.use(express.json());

const port = 3000
app.use(router)

app.get('/', (req, res) => {
    res.status(200).json({ msg: 'bem vindo a api' })
})

app.post('/auth/register', async (req, res) => {
    const { name, email, password, confirmpassword } = req.body

    if(!name){
        return res.status(422).json({msg: 'O nome é obrigatório!'})
    }
})

console.log('o server esta online na porta ' + port)
app.listen(port)