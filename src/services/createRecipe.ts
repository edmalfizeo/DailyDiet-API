import { db } from "../database/database";

export async function createRecipe(recipe: { id: string, user_id: string, name: string, description: string, meal_time: string, is_diet: boolean }) {
    try {
        await db('user_recipes').insert(recipe);
    } catch (error) {
        console.error(error);
        throw new Error('Erro ao inserir receita no banco de dados');
    }
}