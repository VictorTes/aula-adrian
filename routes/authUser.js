const express = require('express')
const routerauth = express.Router()

const authlogin = require('../controllers/authlogin')

routerauth.use(express.json())

routerauth.post('/auth/login',authlogin.login)




module.exports = routerauth