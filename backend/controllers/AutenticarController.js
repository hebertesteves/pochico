// Importa o módulo `bcryptjs`, usado para realizar a criptografia de senhas.
const bcrypt = require('bcryptjs');

// Importa a configuração de conexão com o banco de dados MySQL.
const db = require('../config/db');

// Função responsável por registrar novos usuários no sistema.
exports.register = async (req, res) => {
    // Extrai `nome`, `email` e `senha` do corpo da requisição.
    const { nome, email, senha } = req.body;

    try {
        // Gera um "sal" para a senha (uma string aleatória usada na criptografia para maior segurança).
        const salt = await bcrypt.genSalt(10);

        // Criptografa a senha usando o "sal" gerado.
        const hashedPassword = await bcrypt.hash(senha, salt);

        // Insere o novo usuário no banco de dados com a senha criptografada.
        await db.query('INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)', [nome, email, hashedPassword]);

        // Retorna uma resposta de sucesso com status HTTP 201 (Criado).
        res.status(201).json({ message: 'Usuário cadastrado com sucesso!' });
    } catch (error) {
        // Em caso de erro, retorna uma resposta com status HTTP 500 (Erro no servidor).
        res.status(500).json({ error: 'Erro ao cadastrar o usuário' });
    }
};

// Função responsável por autenticar usuários no sistema.
exports.login = async (req, res) => {
    // Extrai `email` e `senha` do corpo da requisição.
    const { email, senha } = req.body;

    try {
        // Consulta o banco de dados para encontrar o usuário pelo email.
        const [rows] = await db.query('SELECT * FROM usuarios WHERE email = ?', [email]);
        const user = rows[0]; // Obtém o primeiro resultado da consulta.

        // Verifica se o usuário foi encontrado.
        if (!user) {
            return res.status(401).json({ auth: false, message: 'Usuário não encontrado' }); // Status 401: Não autorizado.
        }

        // Compara a senha fornecida com a senha criptografada armazenada no banco de dados.
        const isPasswordValid = await bcrypt.compare(senha, user.senha);
        if (!isPasswordValid) {
            return res.status(401).json({ auth: false, message: 'Senha incorreta' }); // Status 401: Não autorizado.
        }

        // Armazena o ID do usuário na sessão (autenticação baseada em sessão).
        req.session.userId = user.id;

        // Retorna uma resposta de sucesso indicando que o login foi realizado.
        res.json({ auth: true, message: 'Login realizado com sucesso!' });
    } catch (error) {
        // Em caso de erro, retorna uma resposta com status HTTP 500 (Erro no servidor).
        res.status(500).json({ auth: false, message: 'Erro ao autenticar o usuário' });
    }
};

// Função responsável por redefinir a senha de usuários.
exports.forgotPassword = async (req, res) => {
    // Extrai `email` e `novaSenha` do corpo da requisição.
    const { email, novaSenha } = req.body;

    try {
        // Gera um "sal" para a nova senha.
        const salt = await bcrypt.genSalt(10);

        // Criptografa a nova senha usando o "sal" gerado.
        const hashedPassword = await bcrypt.hash(novaSenha, salt);

        // Atualiza a senha no banco de dados para o usuário com o email fornecido.
        const [result] = await db.query('UPDATE usuarios SET senha = ? WHERE email = ?', [hashedPassword, email]);

        // Verifica se algum registro foi atualizado (usuário encontrado).
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Usuário não encontrado' }); // Status 404: Não encontrado.
        }

        // Retorna uma resposta de sucesso indicando que a senha foi atualizada.
        res.json({ message: 'Senha atualizada com sucesso!' });
    } catch (error) {
        // Em caso de erro, retorna uma resposta com status HTTP 500 (Erro no servidor).
        res.status(500).json({ error: 'Erro ao atualizar a senha' });
    }
};

/**
 * Propósito do arquivo:
 * Este arquivo contém controladores relacionados ao gerenciamento de autenticação de usuários.
 * Ele fornece funcionalidades como:
 * 1. Registro de novos usuários no sistema (função `register`).
 * 2. Login de usuários com validação de credenciais (função `login`).
 * 3. Redefinição de senhas esquecidas (função `forgotPassword`).
 * As operações utilizam o `bcryptjs` para criptografar senhas e interagem com o banco de dados para armazenar ou recuperar informações.
 */
