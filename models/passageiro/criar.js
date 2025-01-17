const db = require('../../db/cnx')

const criarPassageiro = async function (nome_passageiro, cpf_passageiro, email_passageiro, rua_passageiro, cidade_passageiro, bairro_passageiro, uf_passageiro, passwordhash, telefone_passageiro) {
    const client = await db.connect()
    try {
        const dados = "INSERT INTO passageiro (nome_passageiro, cpf_passageiro, email_passageiro, rua_passageiro, cidade_passageiro, bairro_passageiro, uf_passageiro, senha_passageiro, telefone_passageiro) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9);"
        await client.query(dados, [nome_passageiro, cpf_passageiro, email_passageiro, rua_passageiro, cidade_passageiro, bairro_passageiro, uf_passageiro, passwordhash, telefone_passageiro]);
        console.log(`Passageiro com nome ${nome_passageiro} cadastrado com sucesso.`);
    } catch (err) {
        console.error('Erro ao cadastrar passageiro:', err);
        throw err;
    } finally {
        client.release();
    }
}

module.exports = { criarPassageiro }