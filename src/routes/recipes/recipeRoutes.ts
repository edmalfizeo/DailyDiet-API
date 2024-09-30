import { FastifyInstance } from "fastify";
import { z } from "zod";
import { db } from "../../database/database";
import { v4 as uuidv4 } from "uuid";
import { createRecipe } from "../../services/createRecipe";

export default async function recipeRoutes(app: FastifyInstance) {
    app.post('/', async (request, reply) => {
        // Criação de uma nova receita
        const recipeSchema = z.object({
            name: z.string(),
            description: z.string(),
            meal_time: z.string().refine(value => !isNaN(Date.parse(value)), { message: "Invalid date" }), // Valida a data,
            is_diet: z.boolean(),
        });

        try {
            const recipeData = recipeSchema.parse(request.body);

            // Recuperar o sessionId dos cookies para vincular ao usuário
            const sessionId = request.cookies.sessionId;

            if (!sessionId) {
                return reply.status(401).send({ message: "Usuário não autenticado" });
            }

            // Recuperar o user_id com base no sessionId
            const user = await db('users').where({ session_id: sessionId }).first();
            if (!user) {
                return reply.status(404).send({ message: "Usuário não encontrado" });
            }
            
            
            const recipe = {
                id: uuidv4(),
                user_id: user.id,
                name: recipeData.name,
                description: recipeData.description,
                meal_time: new Date(recipeData.meal_time).toISOString().slice(0, 19).replace('T', ' '),
                is_diet: recipeData.is_diet,
            };

            // Salvar a receita no banco de dados
            await createRecipe(recipe);

            return reply.status(201).send(recipe);
        }
        catch (error) {
            return reply.status(400).send({ message: "Erro ao criar receita", error });
        }
    });

    app.get('/', async (request, reply) => {
        // Recuperar o sessionId dos cookies
        const sessionId = request.cookies.sessionId;

        if (!sessionId) {
            return reply.status(401).send({ message: "Usuário não autenticado" });
        }

        // Recuperar o user_id com base no sessionId
        const user = await db('users').where({ session_id: sessionId }).first();
        if (!user) {
            return reply.status(404).send({ message: "Usuário não encontrado" });
        }

        // Recuperar todas as receitas do usuário autenticado
        const recipes = await db('user_recipes').where({ user_id: user.id }).select('*');

        return reply.status(200).send(recipes);
    });
}
