import { db } from '../database/database';

export async function deleteRecipe(recipeId: string, userId: string) {
    try {
        const result = await db('user_recipes')
            .where({ id: recipeId, user_id: userId })  
            .delete();
            
        return result;
    } catch (error) {
        console.error("Erro ao excluir receita:", error);
        throw new Error('Erro ao excluir receita do banco de dados');
    }
}