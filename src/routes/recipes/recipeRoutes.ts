import { FastifyInstance } from "fastify";
import { z } from "zod";
import { db } from "../../database/database";
import { v4 as uuidv4 } from "uuid";
import { createRecipe } from "../../services/createRecipe";
import { editRecipe } from "../../services/editRecipe";
import { deleteRecipe } from "../../services/deleteRecipe";

interface RecipeParams {
    id: string;
}

export default async function recipeRoutes(app: FastifyInstance) {
    app.post('/', async (request, reply) => {
        const recipeSchema = z.object({
            name: z.string(),
            description: z.string(),
            meal_time: z.string().refine(value => !isNaN(Date.parse(value)), { message: "Invalid date" }), // Valida a data,
            is_diet: z.boolean(),
        });

        try {
            const recipeData = recipeSchema.parse(request.body);

            const sessionId = request.cookies.sessionId;

            if (!sessionId) {
                return reply.status(401).send({ message: "Usuário não autenticado" });
            }

            
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

            await createRecipe(recipe);

            return reply.status(201).send(recipe);
        }
        catch (error) {
            return reply.status(400).send({ message: "Erro ao criar receita", error });
        }
    });

    app.get('/', async (request, reply) => {
        const sessionId = request.cookies.sessionId;

        if (!sessionId) {
            return reply.status(401).send({ message: "Usuário não autenticado" });
        }

        const user = await db('users').where({ session_id: sessionId }).first();
        if (!user) {
            return reply.status(404).send({ message: "Usuário não encontrado" });
        }

        const recipes = await db('user_recipes').where({ user_id: user.id }).select('*');

        return reply.status(200).send(recipes);
    });

    app.put<{ Params: RecipeParams }>('/:id', async (request, reply) => {
        const recipeSchema = z.object({
            name: z.string(),
            description: z.string(),
            meal_time: z.string().refine(value => !isNaN(Date.parse(value)), { message: "Invalid date" }),
            is_diet: z.boolean(),
        });
    
        try {
            const recipeData = recipeSchema.parse(request.body);
    
            const date = new Date(recipeData.meal_time);
            const localDate = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
    
            const sessionId = request.cookies.sessionId;
            if (!sessionId) {
                return reply.status(401).send({ message: "Usuário não autenticado" });
            }
    
            const user = await db('users').where({ session_id: sessionId }).first();
            if (!user) {
                return reply.status(401).send({ message: "Usuário não encontrado" });
            }
    
            const recipe = {
                id: request.params.id,
                user_id: user.id,
                name: recipeData.name,
                description: recipeData.description,
                meal_time: localDate.toISOString().slice(0, 19).replace('T', ' '),
                is_diet: recipeData.is_diet,
            };
    
            await editRecipe(recipe);
    
            return reply.status(200).send({ message: "Receita atualizada com sucesso!", recipe });
        } catch (error) {
            return reply.status(400).send({ message: "Erro ao editar receita", error });
        }
    });

    app.delete<{ Params: { id: string } }>('/:id', async (request, reply) => {
        const { id } = request.params;
    
        try {
            const sessionId = request.cookies.sessionId;
            if (!sessionId) {
                return reply.status(401).send({ message: "Usuário não autenticado" });
            }
    
            
            const user = await db('users').where({ session_id: sessionId }).first();
            if (!user) {
                return reply.status(401).send({ message: "Usuário não encontrado" });
            }

            const result = await deleteRecipe(id, user.id); 
    
            console.log("Resultado da exclusão:", result);
    
            if (result) {
                return reply.status(200).send({ message: "Receita excluída com sucesso" });
            } else {
                return reply.status(404).send({ message: "Receita não encontrada" });
            }
    
        } catch (error) {
            return reply.status(400).send({ message: "Erro ao excluir receita", error });
        }
    });

    app.get<{ Params: { id: string } }>('/:id', async (request, reply) => {
        const { id } = request.params;
      
    
        const sessionId = request.cookies.sessionId;
        if (!sessionId) {
          return reply.status(401).send({ message: 'Usuário não autenticado' });
        }
      
        try {
          const recipe = await db('user_recipes')
            .where({ id }) 
            .first();
      
          if (!recipe) {
            return reply.status(404).send({ message: 'Receita não encontrada' });
          }
      
          return reply.status(200).send({
            message: 'Receita encontrada com sucesso',
            recipe
          });
        } catch (error) {
          console.error(error);
          return reply.status(500).send({ message: 'Erro ao buscar a receita', error });
        }
      });
}
