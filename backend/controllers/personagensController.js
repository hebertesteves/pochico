// Importa a configuração de conexão com o banco de dados MySQL.
const db = require('../config/db');

// Função para criar um novo personagem.
exports.createPersonagem = async (req, res) => {
    // Extrai `nome` e `descricao` do corpo da requisição e `foto` do arquivo enviado.
    const { nome, descricao } = req.body;
    const foto = req.file.filename;

    try {
        // Insere um novo registro na tabela `personagens` com os dados fornecidos.
        const [result] = await db.query(
            'INSERT INTO personagens (nome, descricao, foto) VALUES(?, ?, ?)',
            [nome, descricao, foto]
        );

        // Retorna uma resposta de sucesso com o ID do personagem criado.
        res.status(201).send(`Personagem criado com ID: ${result.insertId}`);
    } catch (err) {
        // Em caso de erro, registra no console e retorna uma mensagem de erro.
        console.error(err);
        res.status(500).send(err.message);
    }
};

// Função para buscar todos os personagens.
exports.getAllPersonagem = async (req, res) => {
    try {
        // Busca todos os registros na tabela `personagens`.
        const [personagens] = await db.query('SELECT * FROM personagens');

        // Retorna os personagens encontrados no formato JSON.
        res.status(200).json(personagens);
    } catch (err) {
        // Em caso de erro, registra no console e retorna uma mensagem de erro.
        console.error(err);
        res.status(500).send(err.message);
    }
};

// Função para buscar um personagem específico pelo ID.
exports.getPersonagemByID = async (req, res) => {
    // Extrai o ID do personagem dos parâmetros da rota.
    const id = req.params.id;

    try {
        // Busca o personagem pelo ID fornecido.
        const [personagem] = await db.query('SELECT * FROM personagens WHERE id = ?', [id]);

        // Verifica se o personagem foi encontrado e retorna os dados ou uma mensagem de erro.
        if (personagem.length > 0) {
            res.status(200).json(personagem[0]);
        } else {
            res.status(404).send('Personagem não encontrado');
        }
    } catch (err) {
        // Em caso de erro, registra no console e retorna uma mensagem de erro.
        console.error(err);
        res.status(500).send(err.message);
    }
};

// Função para atualizar um personagem existente.
exports.updatePersonagem = async (req, res) => {
    // Extrai o ID do personagem dos parâmetros da rota e dados do corpo da requisição.
    const id = req.params.id;
    const { nome, descricao } = req.body;

    // Verifica se um arquivo de foto foi enviado; caso contrário, mantém como `null`.
    const foto = req.file ? req.file.filename : null;

    try {
        // Monta os campos e valores que serão atualizados dinamicamente.
        const fields = [];
        const values = [];
        if (nome) {
            fields.push('nome = ?');
            values.push(nome);
        }
        if (descricao) {
            fields.push('descricao = ?');
            values.push(descricao);
        }
        if (foto) {
            fields.push('foto = ?');
            values.push(foto);
        }

        // Se nenhum campo foi fornecido para atualização, retorna erro 400.
        if (fields.length === 0) {
            return res.status(400).send('Nenhum campo para atualizar');
        }

        // Adiciona o ID ao final dos valores e monta a consulta de atualização.
        values.push(id);
        const query = `UPDATE personagens SET ${fields.join(', ')} WHERE id = ?`;

        // Executa a atualização no banco de dados.
        const [result] = await db.query(query, values);

        // Verifica se o personagem foi encontrado e atualizado.
        if (result.affectedRows > 0) {
            res.status(200).send('Personagem atualizado com sucesso');
        } else {
            res.status(404).send('Personagem não encontrado');
        }
    } catch (err) {
        // Em caso de erro, registra no console e retorna uma mensagem de erro.
        console.error('Erro ao atualizar o personagem: ', err);
        res.status(500).send(err.message);
    }
};

// Função para deletar um personagem existente.
exports.deletePersonagem = async (req, res) => {
    // Extrai o ID do personagem dos parâmetros da rota.
    const id = req.params.id;

    try {
        // Remove o registro do personagem com o ID fornecido.
        const [result] = await db.query('DELETE FROM personagens WHERE id = ?', [id]);

        // Verifica se o personagem foi encontrado e deletado.
        if (result.affectedRows > 0) {
            res.status(200).send('Personagem deletado com sucesso');
        } else {
            res.status(404).send('Personagem não encontrado');
        }
    } catch (err) {
        // Em caso de erro, registra no console e retorna uma mensagem de erro.
        console.error(err);
        res.status(500).send(err.message);
    }
};

/**
 * Propósito do arquivo:
 * Este arquivo contém controladores para gerenciar os personagens do sistema.
 * Ele fornece funcionalidades para:
 * 1. Criar novos personagens (função `createPersonagem`).
 * 2. Buscar todos os personagens registrados (função `getAllPersonagem`).
 * 3. Buscar um personagem específico pelo ID (função `getPersonagemByID`).
 * 4. Atualizar dados de personagens existentes (função `updatePersonagem`).
 * 5. Deletar personagens pelo ID (função `deletePersonagem`).
 * Todas as operações interagem com o banco de dados e incluem tratamento de erros.
 */
