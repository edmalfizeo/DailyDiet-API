import { FastifyInstance } from 'fastify';
import { z } from 'zod';
import { db } from '../../database/database';
import { v4 as uuidv4 } from 'uuid';
import { createUser } from '../../services/createUser';
import { deleteUser } from '../../services/deleteUser';

export default async function userRoutes(app: FastifyInstance) {
    app.post('/', async (request, reply) => {
        const userSchema = z.object({
            id: z.string().uuid().optional(),
            name: z.string(),
            email: z.string().email(),
            password: z.string().min(8),
        });

        try {
            const user = userSchema.parse(request.body);

            let sessionId = request.cookies.sessionId;

            if (!sessionId) {
                sessionId = uuidv4();
                reply.setCookie('sessionId', sessionId, {
                    path: '/',
                    maxAge: 60 * 60 * 21 * 7, // 7 days
                });
            }

            const userId = {
                id: uuidv4(),
                name: user.name,
                email: user.email,
                password: user.password,
                session_id: sessionId,
              };
              
            await createUser(userId);
            
            return reply.status(201).send(userId);
        }
        catch (error) {
            return reply.status(400).send(error);
        }
    });

    app.get('/', async (request, reply) => {
        const users = await db('users').select('*');
        return reply.send(users);
    })

    app.delete<{ Params: { id: string } }>('/:id', async (request, reply) => {
        try {
            const { id } = request.params;
    
            // Verifica se o usuário existe
            const user = await db('users').where({ id }).first();
            if (!user) {
                return reply.status(404).send({ message: 'Usuário não encontrado' });
            }
    
            // Deleta o usuário
            await deleteUser(id);
    
            return reply.status(200).send({ message: 'Usuário deletado com sucesso' });
        } catch (error) {
            return reply.status(500).send({ message: 'Erro ao deletar o usuário', error });
        }
    });
}