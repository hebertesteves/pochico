// Middleware para verificar se o usuário está autenticado.
function checkAuthentication(req, res, next) {
    // Verifica se a sessão do usuário contém a propriedade `isAuthenticated` definida como `true`.
    if (req.session.isAuthenticated) {
        // Se autenticado, prossegue para a próxima função ou rota.
        next();
    } else {
        // Se não autenticado, retorna uma resposta com status 401 (Não autorizado).
        res.status(401).json({ message: 'Acesso não autorizado' });
    }
}

// Exporta o middleware para ser usado em outras partes do sistema.
module.exports = checkAuthentication;

/**
 * Propósito do arquivo:
 * Este arquivo define um middleware que verifica se o usuário está autenticado antes de permitir o acesso
 * a determinadas rotas ou recursos protegidos. Caso o usuário não esteja autenticado, ele recebe uma 
 * resposta com status HTTP 401 (Não autorizado).
 */
