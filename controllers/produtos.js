const { json } = require('express'); 
const db = require('../database/connection'); 

module.exports = {
    async listarProdutos(request, response) {
        try {
            const sql = `SELECT
            prd_id, prd_nome, prd_valor, prd_unidade, 
            ptp_id, prd_disponivel, prd_img, 
            prd_destaque, prd_img_destaque, 
            prd_descricao, prd_ativo = 1 AS prd_ativo
            FROM produtos
            WHERE prd_ativo = 1;`;
            const produtos = await db.query(sql);
            const nItens = produtos[0].lenght;
            // throw new Error('Eu causei o erro!');
            return response.status(200).json({
                sucesso: true, 
                mensagem: 'Lista de produtos.', 
                dados: produtos[0],
                nItens
            });
        } catch (error) {
            return response.status(500).json({
                sucesso: false, 
                mensagem: 'Erro na requisição.', 
                dados: error.message
            });
        }
    }, 
    async cadastrarProdutos(request, response) {
        try {
            const { prd_nome, prd_valor, prd_unidade, 
                ptp_id, prd_disponivel, prd_img, 
                prd_destaque, prd_img_destaque, 
                prd_descricao, prd_ativo } = request.body;
                const sql = `INSERT INTO produtos
                (prd_id, prd_nome, prd_valor, prd_unidade, 
                    ptp_id, prd_disponivel, prd_img, 
                    prd_destaque, prd_img_destaque, 
                    prd_descricao, prd_ativo)
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
                const values = [prd_nome, prd_valor, prd_unidade, 
                    ptp_id, prd_disponivel, prd_img, 
                    prd_destaque, prd_img_destaque, 
                    prd_descricao, prd_ativo];
                const execSql = await db.query(sql, values);
                const prd_id = execSql[0].insertID;
            return response.status(200).json({
                sucesso: true, 
                mensagem: 'Cadastro de produtos.', 
                dados: prd_id
            });
        } catch (error) {
            return response.status(500).json({
                sucesso: false, 
                mensagem: 'Erro na requisição.', 
                dados: error.message
            });
        }
    }, 
    async editarProdutos(request, response) {
        try {
            const { prd_nome, prd_valor, prd_unidade, 
                ptp_id, prd_disponivel, prd_img, 
                prd_destaque, prd_img_destaque, 
                prd_descricao, prd_ativo } = request.body;
                const [ prd_id ] = request.params;
                const sql = `UPDATE produtos set prd_nome = ?, prd_valor = ?, prd_unidade = ?, 
                ptp_id = ?, prd_disponivel = ?, prd_img= ?, 
                prd_destaque = ?, prd_img_destaque = ?, 
                prd_descricao= ?, prd_ativo= ? WHERE prd_id = ?;`;
                const values = [prd_valor, prd_unidade, 
                    ptp_id, prd_disponivel, prd_img, 
                    prd_destaque, prd_img_destaque, 
                    prd_descricao, prd_ativo, prd_id];
                const atualizarDados = await db.query(sql, values);
            return response.status(200).json({
                sucesso: true, 
                mensagem: `Produto ${prd_id} atualizado com sucesso!`, 
                dados: atualizarDados[0].affectRows
            });
        } catch (error) {
            return response.status(500).json({
                sucesso: false, 
                mensagem: 'Erro na requisição.', 
                dados: error.message
            });
        }
    }, 
    async apagarProdutos(request, response) {
        try {
            return response.status(200).json({
                sucesso: true, 
                mensagem: 'Apagar produtos.', 
                dados: null
            });
        } catch (error) {
            return response.status(500).json({
                sucesso: false, 
                mensagem: `Erro na requisição. -${error}`, 
                dados: null
            });
        }
    }, 
}

