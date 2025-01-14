const { Pool } = require('pg')
require('dotenv').config();

const dbUser = process.env.DB_USER
const dbPassword = process.env.DB_PASS

const poll = new Pool({
    user: dbUser,
    password: dbPassword,
    host: 'localhost',
    port: 5432,
    database: 'dbFaculRideCerto'
})

module.exports = poll