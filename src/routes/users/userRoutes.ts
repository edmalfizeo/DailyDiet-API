import { FastifyInstance } from 'fastify';
import { z } from 'zod';
import { db } from '../../database/database';
import { v4 as uuidv4 } from 'uuid';
import { createUser } from '../../services/createUser';

export default async function userRoutes(app: FastifyInstance) {
    app.post('/', async (request, reply) => {
        // Criação de um novo usuário
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
                session_id: sessionId, // Inclui o sessionId
              };
              
            // Salvar o usuário no banco de dados
            await createUser(userId);
            
            return reply.status(201).send(userId);
        }
        catch (error) {
            return reply.status(400).send(error);
        }
    });

    app.get('/', async (request, reply) => {
        // Recupera todos os usuários
        const users = await db('users').select('*');
        return reply.send(users);
    })
}