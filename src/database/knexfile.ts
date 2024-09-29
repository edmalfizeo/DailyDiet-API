import type { Knex } from 'knex';
import path from 'path';

// Configuração para diferentes ambientes (desenvolvimento, produção)
const config: { [key: string]: Knex.Config } = {
  development: {
    client: 'sqlite3',
    connection: {
      filename: path.resolve(__dirname, 'dev.sqlite3'), // Caminho do banco SQLite
    },
    useNullAsDefault: true, // Necessário para o SQLite3
    migrations: {
      directory: path.resolve(__dirname, 'migrations'), // Pasta das migrações
    },
  },

  production: {
    client: 'pg', // PostgreSQL será usado na produção
    connection: process.env.DATABASE_URL, // A URL do banco será definida no ambiente de produção
    migrations: {
      directory: path.resolve(__dirname, 'migrations'),
    },
  },
};

export default config;