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

    app.put<{ Params: RecipeParams }>('/:id', async (request, reply) => {
        const recipeSchema = z.object({
            name: z.string(),
            description: z.string(),
            meal_time: z.string().refine(value => !isNaN(Date.parse(value)), { message: "Invalid date" }),
            is_diet: z.boolean(),
        });
    
        try {
            const recipeData = recipeSchema.parse(request.body);
    
            // Ajusta o fuso horário local
            const date = new Date(recipeData.meal_time);
            const localDate = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
    
            // Recuperar o sessionId dos cookies
            const sessionId = request.cookies.sessionId;
            if (!sessionId) {
                return reply.status(401).send({ message: "Usuário não autenticado" });
            }
    
            // Consultar o user_id com base no sessionId
            const user = await db('users').where({ session_id: sessionId }).first();
            if (!user) {
                return reply.status(401).send({ message: "Usuário não encontrado" });
            }
    
            const recipe = {
                id: request.params.id,
                user_id: user.id, // Agora estamos usando o user_id correto
                name: recipeData.name,
                description: recipeData.description,
                meal_time: localDate.toISOString().slice(0, 19).replace('T', ' '), // Formato que será salvo no banco
                is_diet: recipeData.is_diet,
            };
    
            // Atualizar a receita no banco de dados
            await editRecipe(recipe);
    
            return reply.status(200).send({ message: "Receita atualizada com sucesso!", recipe });
        } catch (error) {
            return reply.status(400).send({ message: "Erro ao editar receita", error });
        }
    });

    app.delete<{ Params: { id: string } }>('/:id', async (request, reply) => {
        const { id } = request.params;
    
        try {
            // Obtém o sessionId dos cookies
            const sessionId = request.cookies.sessionId;
            if (!sessionId) {
                return reply.status(401).send({ message: "Usuário não autenticado" });
            }
    
            // Recupera o user_id usando o sessionId
            const user = await db('users').where({ session_id: sessionId }).first();
            if (!user) {
                return reply.status(401).send({ message: "Usuário não encontrado" });
            }
    
            console.log("ID da receita:", id);
            console.log("User ID:", user.id);
    
            // Chama o serviço para excluir a receita
            const result = await deleteRecipe(id, user.id); // Passa o recipeId e o userId
    
            console.log("Resultado da exclusão:", result); // Loga o resultado da exclusão
    
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
      
        // Autentica o usuário através do cookie
        const sessionId = request.cookies.sessionId;
        if (!sessionId) {
          return reply.status(401).send({ message: 'Usuário não autenticado' });
        }
      
        try {
          // Busca a receita pelo ID da receita e garante que ela pertença ao usuário autenticado
          const recipe = await db('user_recipes')
            .where({ id }) // Busca a receita com base no id e session_id
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
