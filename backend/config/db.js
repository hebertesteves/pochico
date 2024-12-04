// Importa o módulo `mysql2` para realizar conexões com o banco de dados MySQL.
const mysql = require('mysql2');

// Carrega as variáveis de ambiente definidas no arquivo .env para serem usadas no código.
// Isso é útil para proteger informações sensíveis, como credenciais de acesso ao banco de dados.
require('dotenv').config();

// Cria um pool de conexões com o banco de dados MySQL.
// Um pool de conexões permite reutilizar conexões existentes, melhorando a eficiência.
const pool = mysql.createPool({
    // Host do servidor de banco de dados, definido na variável de ambiente DB_HOST.
    host: process.env.DB_HOST,

    // Usuário do banco de dados, definido na variável de ambiente DB_USER.
    user: process.env.DB_USER,

    // Senha do banco de dados, definida na variável de ambiente DB_PASSWORD.
    password: process.env.DB_PASSWORD,

    // Nome do banco de dados que será acessado, definido na variável de ambiente DB_NAME.
    database: process.env.DB_NAME,

    // Porta do servidor de banco de dados. Aqui está definida como 3306, o padrão do MySQL.
    port: 3306,

    // Configura se o pool deve aguardar conexões disponíveis quando todas estiverem ocupadas.
    waitForConnections: true,

    // Configuração de segurança SSL para conexões. 
    // `rejectUnauthorized` controla se certificados não confiáveis devem ser rejeitados.
    // Alterar para `false` em ambientes de desenvolvimento, se necessário.
    ssl: {
        rejectUnauthorized: true // ou false, conforme necessário para seu ambiente.
    }
});

// Testa a conexão ao banco de dados assim que o pool é criado.
pool.getConnection((err, connection) => {
    if (err) {
        // Caso ocorra algum erro ao tentar conectar, ele será exibido no console.
        console.error('Erro ao conectar ao banco de dados:', err);
    } else {
        // Se a conexão for bem-sucedida, exibe uma mensagem no console.
        console.log('Conexão ao banco de dados estabelecida com sucesso!');

        // Libera a conexão de volta ao pool para que possa ser reutilizada.
        connection.release();
    }
});

// Exporta o pool configurado, permitindo que outras partes do projeto usem a conexão com o banco.
// O uso de `pool.promise()` adiciona suporte para trabalhar com Promises, facilitando a manipulação assíncrona.
module.exports = pool.promise();


//Este arquivo configura e gerencia a conexão com o banco de dados MySQL. Ele utiliza variáveis de ambiente para manter as credenciais seguras e aproveita um pool de conexões para maior eficiência. O arquivo db.js é geralmente importado em outros lugares do projeto onde interações com o banco de dados são necessárias.


