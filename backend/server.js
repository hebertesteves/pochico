// Importa o módulo `express` para criar o servidor e gerenciar rotas.
const express = require('express');

// Importa o módulo `cors` para configurar políticas de CORS (Cross-Origin Resource Sharing).
const cors = require('cors');

// Importa o módulo `express-session` para gerenciar sessões no servidor.
const session = require('express-session');

// Importa o módulo `path` para trabalhar com caminhos de arquivos e diretórios.
const path = require('path');

// Importa as rotas de personagens.
const personagensRoutes = require('./routes/personagensRoutes');

// Importa as rotas de autenticação.
const authRoutes = require('./routes/AutenticarRoutes');

// Cria uma instância do aplicativo Express.
const app = express();

// Configuração de CORS para permitir requisições do frontend hospedado em outro domínio.
app.use(cors({
    origin: process.env.CORS_ORIGIN, // Define a origem permitida com base na variável de ambiente.
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Métodos HTTP permitidos.
    credentials: true // Permite o uso de cookies e credenciais nas requisições.
}));

// Middleware para interpretar requisições com corpo em JSON.
app.use(express.json());

// Configuração de sessão para gerenciar autenticação e dados persistentes no lado do servidor.
app.use(session({
    secret: 'seuSegredoAqui', // Chave secreta para proteger os cookies de sessão.
    resave: false, // Evita salvar a sessão novamente se ela não foi modificada.
    saveUninitialized: false, // Não salva sessões não inicializadas.
    cookie: {
        secure: true,       // Exige HTTPS em produção.
        sameSite: 'none'    // Permite cookies entre domínios diferentes (ex.: frontend e backend hospedados separadamente).
    }
}));

// Rota para servir arquivos estáticos da pasta `uploads`, como imagens de personagens.
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Configuração das rotas relacionadas a personagens.
app.use('/api/personagens', personagensRoutes);

// Configuração das rotas relacionadas à autenticação.
app.use('/auth', authRoutes);

// Define a porta do servidor a partir da variável de ambiente ou utiliza a porta padrão 5000.
const port = process.env.PORT || 5000;

// Inicia o servidor e exibe uma mensagem no console.
app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});

/**
 * Propósito do arquivo:
 * Este arquivo inicializa o servidor Node.js usando o Express e configura:
 * 1. **CORS**: Permite que o frontend (em outro domínio) se comunique com o backend.
 * 2. **Middleware JSON**: Permite que o backend interprete requisições com corpo em JSON.
 * 3. **Sessão**: Configura o gerenciamento de sessões, necessário para autenticação.
 * 4. **Serviço de arquivos estáticos**: Torna arquivos da pasta `uploads` acessíveis publicamente.
 * 5. **Rotas**: Integra rotas para personagens (`/api/personagens`) e autenticação (`/auth`).
 * 6. **Servidor HTTP**: Inicia o servidor na porta especificada.
 */
