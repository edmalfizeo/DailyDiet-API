import knex from 'knex';
import config from './knexfile'; // Caminho para o arquivo knexfile

// Inicializa o Knex usando a configuração apropriada (desenvolvimento ou produção)
export const db = knex(config[process.env.NODE_ENV || 'development']);