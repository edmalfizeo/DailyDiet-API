import { db } from '../database/database';

export async function createUser(user: { id: string, name: string, email: string, password: string, session_id: string }) {
    try {
      await db('users').insert(user); 
    } catch (error) {
      console.error(error);
      throw new Error('Erro ao inserir usuário no banco de dados');
    }
  }