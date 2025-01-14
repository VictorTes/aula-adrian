const db = require('../../db/cnx')

const listarPassageiros = async function () {
    const client = await db.connect();
    try {
        const dados = 'SELECT id_passageiro, nome_passageiro, telefone_passageiro, email_passageiro, rua_passageiro, cidade_passageiro, bairro_passageiro, uf_passageiro FROM passageiro  ORDER BY id_passageiro ASC;';
        const res = await client.query(dados);
        return res.rows;
    } catch (err) {
        console.error('Erro ao listar passageiros:', err);
        throw err;
    } finally {
        client.release();
    }
}

module.exports = { listarPassageiros }
