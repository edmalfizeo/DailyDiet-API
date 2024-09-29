import { db } from '../database/database'; // Ajuste o caminho para o módulo correto

export async function createUser(user: { id: string, name: string, email: string, password: string, session_id: string }) {
    try {
      await db('users').insert(user); // Insere o usuário na tabela 'users'
    } catch (error) {
      console.error(error); // Loga o erro no console para debug
      throw new Error('Erro ao inserir usuário no banco de dados');
    }
  }