import { db } from "../database/database";

export async function editRecipe(recipe: { id: string; user_id: string; name: string; description: string; meal_time: string; is_diet: boolean }) {
    try {
        const result = await db('user_recipes')
            .where({ id: recipe.id, user_id: recipe.user_id })
            .update({
                name: recipe.name,
                description: recipe.description,
                meal_time: recipe.meal_time,
                is_diet: recipe.is_diet,
            });
        
        return result;
    } catch (error) {
        console.error("Erro ao atualizar receita no banco de dados:", error);
        throw new Error('Erro ao atualizar receita no banco de dados');
    }
}