const db = require('../db/cnx')

const userExists = async function (email) {
    const client = await db.connect()
    try {
        const dados = "SELECT COUNT(*) AS total FROM passageiro WHERE email_passageiro = $1;"
        const result = await client.query(dados, [email]);
        const exists = result.rows[0].total > 0;
        console.log(`Passageiro encontrado com sucesso ${exists}.`);
        return exists;
    } catch (err) {
        console.error('Passageiro não encontrado!', err);
        throw err;
    } finally {
        client.release();
    }
}

module.exports = { userExists }