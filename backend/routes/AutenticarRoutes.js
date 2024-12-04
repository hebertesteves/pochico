// Importa o módulo `express` para criar rotas.
const express = require('express');

// Cria uma instância de roteador do Express para definir as rotas.
const router = express.Router();

// Importa o controlador de autenticação, que contém as funções para gerenciar usuários.
const authController = require('../controllers/AutenticarController');

// Define uma rota para registrar novos usuários.
// A requisição deve ser enviada como POST para `/register`.
router.post('/register', authController.register);

// Define uma rota para realizar login.
// A requisição deve ser enviada como POST para `/login`.
router.post('/login', authController.login);

// Define uma rota para redefinir a senha de usuários.
// A requisição deve ser enviada como POST para `/forgot-password`.
router.post('/forgot-password', authController.forgotPassword);

// Exporta o roteador para que ele possa ser usado em outras partes do sistema.
module.exports = router;

/**
 * Propósito do arquivo:
 * Este arquivo configura as rotas relacionadas à autenticação de usuários. Ele conecta as rotas HTTP
 * às funções do controlador `AutenticarController`, permitindo que o sistema:
 * 1. Registre novos usuários (`/register`).
 * 2. Realize login de usuários existentes (`/login`).
 * 3. Permita a redefinição de senhas esquecidas (`/forgot-password`).
 */
