import { db } from '../database/database';

export async function deleteRecipe(recipeId: string, userId: string) {
    try {
        // Exclui a receita usando o recipeId e o userId
        const result = await db('user_recipes')
            .where({ id: recipeId, user_id: userId })  // user_id agora é corretamente verificado
            .delete();
            
        return result;
    } catch (error) {
        console.error("Erro ao excluir receita:", error);
        throw new Error('Erro ao excluir receita do banco de dados');
    }
}