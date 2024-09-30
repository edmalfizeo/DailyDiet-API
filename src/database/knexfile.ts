import type { Knex } from 'knex';
import path from 'path';

// Configuração para diferentes ambientes (desenvolvimento, produção)
const config: { [key: string]: Knex.Config } = {
  development: {
    client: 'sqlite3',
    connection: {
      filename: path.resolve(__dirname, 'dev.sqlite3'), 
    },
    useNullAsDefault: true, 
    migrations: {
      directory: path.resolve(__dirname, 'migrations'), 
    },
  },

  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL, 
    migrations: {
      directory: path.resolve(__dirname, 'migrations'),
    },
  },
};

export default config;