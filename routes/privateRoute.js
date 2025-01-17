const express = require('express')
const routerid = express.Router()

const { checkToken, Logado }= require('../controllers/authlogin')

routerid.use(express.json())



routerid.get('/user/:id', checkToken, Logado);

module.exports = routerid