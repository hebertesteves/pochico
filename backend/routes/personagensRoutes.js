// Importa o módulo `express` para criar rotas.
const express = require('express');

// Cria uma instância de roteador do Express para definir as rotas.
const router = express.Router();

// Importa o controlador de personagens, que contém as funções para gerenciar os dados de personagens.
const personagensController = require('../controllers/personagensController');

// Importa a configuração do middleware `multer` para gerenciar uploads de arquivos.
const upload = require('../config/multerConfig');

// Importa o middleware para verificar autenticação da sessão.
const checkAuthentication = require('../middleware/SessaoMiddleware');

// Rota para criar um novo personagem.
// Requer um arquivo de foto enviado pelo cliente e usa o controlador `createPersonagem`.
router.post('/', upload.single('foto'), personagensController.createPersonagem);

// Rota para atualizar um personagem existente.
// Permite atualizar dados e enviar uma nova foto opcionalmente.
router.put('/:id', upload.single('foto'), personagensController.updatePersonagem);

// Rota para listar todos os personagens.
// Retorna um array com os dados de todos os personagens registrados.
router.get('/', personagensController.getAllPersonagem);

// Rota para obter detalhes de um personagem específico pelo ID.
// Retorna os dados do personagem correspondente.
router.get('/:id', personagensController.getPersonagemByID);

// Rota para deletar um personagem pelo ID.
// Remove o registro do banco de dados.
router.delete('/:id', personagensController.deletePersonagem);

// Exporta o roteador para ser usado em outras partes do sistema.
module.exports = router;

/**
 * Propósito do arquivo:
 * Este arquivo configura as rotas relacionadas ao gerenciamento de personagens no sistema.
 * Ele conecta as rotas HTTP às funções do controlador `personagensController` e gerencia:
 * 1. Criação de novos personagens (`POST /`).
 * 2. Atualização de personagens existentes (`PUT /:id`).
 * 3. Listagem de todos os personagens (`GET /`).
 * 4. Detalhes de um personagem específico pelo ID (`GET /:id`).
 * 5. Exclusão de personagens pelo ID (`DELETE /:id`).
 * O middleware `upload` é utilizado para gerenciar uploads de fotos, e o middleware
 * `checkAuthentication` pode ser integrado para proteger as rotas, se necessário.
 */
