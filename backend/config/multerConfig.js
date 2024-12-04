// Importa o módulo `multer`, que é um middleware usado para lidar com uploads de arquivos em Node.js.
const multer = require('multer');

// Importa o módulo `path`, que fornece métodos utilitários para trabalhar com caminhos de arquivos e diretórios.
const path = require('path');

// Configura o armazenamento dos arquivos enviados utilizando o método `diskStorage` do `multer`.
const storage = multer.diskStorage({
    // Define o diretório onde os arquivos enviados serão armazenados.
    // O método recebe três argumentos: a requisição (`req`), o arquivo enviado (`file`), e um callback (`cb`).
    destination: function (req, file, cb) {
        // `path.join` é usado para criar o caminho absoluto até a pasta `../uploads`.
        // O callback (`cb`) é chamado com o caminho do diretório como segundo argumento.
        cb(null, path.join(__dirname, '../uploads')); // Os arquivos serão salvos na pasta `uploads` no nível acima do arquivo atual.
    },

    // Define o nome do arquivo que será salvo no servidor.
    // Recebe os mesmos três argumentos: requisição, arquivo enviado, e callback.
    filename: function (req, file, cb) {
        // O nome do arquivo é gerado dinamicamente, começando com a data e hora atual (`Date.now()`).
        // `path.extname(file.originalname)` é usado para manter a extensão original do arquivo enviado.
        cb(null, `${Date.now()}${path.extname(file.originalname)}`); // Garante um nome único para cada arquivo salvo.
    }
});

// Cria uma instância do `multer` utilizando o armazenamento configurado.
// Essa instância será usada como middleware para processar uploads de arquivos.
const upload = multer({ storage: storage });

// Exporta o middleware `upload`, que pode ser usado em rotas para processar uploads.
module.exports = upload;


// Este arquivo configura e exporta um middleware para gerenciar uploads de arquivos no servidor. Ele especifica:

// Diretório de destino: Todos os arquivos enviados serão armazenados na pasta uploads.
// Nomeação dos arquivos: Cada arquivo terá um nome único gerado com base na data/hora atual, evitando conflitos no diretório de destino.
// Utilização: O middleware exportado será utilizado em rotas específicas para processar os arquivos enviados pelos usuários.