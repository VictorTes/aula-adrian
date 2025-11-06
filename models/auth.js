const db = require('../db/cnx')

const userExists = async function (email) {
    const client = await db.connect()
    try {
        const dados = "SELECT id_passageiro, nome_passageiro, email_passageiro, senha_passageiro, rua_passageiro, telefone_passageiro, cidade_passageiro FROM passageiro WHERE email_passageiro = $1;"
        const result = await client.query(dados, [email]);
        if (result.rows.length === 0) {
            return null;
        }
        console.log('Usuário encontrado:')
        return result.rows[0]

    } catch (err) {
        console.error('Email não encontrado!');
    } finally {
        client.release();
    }
}

const userById = async function (id) {
    const client = await db.connect()
    try {
        const dados = "SELECT id_passageiro, nome_passageiro, email_passageiro FROM passageiro WHERE id_passageiro = $1;"
        const result = await client.query(dados, [id]);
        if (result.rows.length === 0) {
            return null;;
        }
        console.log('Usuário encontrado:')
        return result.rows[0]

    } catch (err) {
        console.error('id não encontrado!');
    } finally {
        client.release();
    }
}

module.exports = { userExists, userById }
