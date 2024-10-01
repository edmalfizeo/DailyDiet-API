import { db } from '../database/database';

export async function getUserMetrics(user_id: string) {
  try {
    // Contar o total de receitas
    const totalRecipes = await db('user_recipes')
      .where('user_id', user_id)
      .count('id as total_recipes')
      .first();

    // Contar o total de receitas dentro da dieta
    const totalDietRecipes = await db('user_recipes')
      .where('user_id', user_id)
      .andWhere('is_diet', true)
      .count('id as total_diet')
      .first();

    // Contar o total de receitas fora da dieta
    const totalNonDietRecipes = await db('user_recipes')
      .where('user_id', user_id)
      .andWhere('is_diet', false)
      .count('id as total_non_diet')
      .first();

    // Calcular a melhor sequência de refeições dentro da dieta
    const allMeals = await db('user_recipes')
      .where('user_id', user_id)
      .orderBy('meal_time', 'asc');

    let bestDietSequence = 0;
    let currentDietSequence = 0;

    allMeals.forEach((meal) => {
      if (meal.is_diet) {
        currentDietSequence += 1;
        if (currentDietSequence > bestDietSequence) {
          bestDietSequence = currentDietSequence;
        }
      } else {
        currentDietSequence = 0;
      }
    });

    return {
      total_recipes: totalRecipes?.total_recipes || 0,
      total_diet: totalDietRecipes?.total_diet || 0,
      total_non_diet: totalNonDietRecipes?.total_non_diet || 0,
      best_diet_sequence: bestDietSequence,
    };
  } catch (error) {
    console.error('Erro ao recuperar métricas:', error);
    throw new Error('Erro ao recuperar métricas do usuário.');
  }
}