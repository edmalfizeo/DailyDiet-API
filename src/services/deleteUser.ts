import { db } from '../database/database';

export async function deleteUser(userId: string) {
    try {
        const result = await db('users').where({ id: userId }).del();

        if (result === 0) {
            throw new Error('Usuário não encontrado');
        }

        return result;
    } catch (error) {
        console.error(error);
        throw new Error('Erro ao deletar usuário do banco de dados');
    }
}