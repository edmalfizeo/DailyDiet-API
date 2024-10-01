import { FastifyInstance } from 'fastify';
import { getUserMetrics } from '../../services/getSummary';
import { db } from '../../database/database';

export default async function summaryRoutes(app: FastifyInstance) {
  app.get('/', async (request, reply) => {
    try {
      // Autenticar com o session_id
      const sessionId = request.cookies.sessionId;

      if (!sessionId) {
        return reply.status(401).send({ message: "Usuário não autenticado" });
      }

      // Recuperar o user_id vinculado ao sessionId
      const user = await db('users').where({ session_id: sessionId }).first();

      if (!user) {
        return reply.status(404).send({ message: "Usuário não encontrado" });
      }

      // Obter as métricas do usuário com o user_id
      const metrics = await getUserMetrics(user.id);

      return reply.status(200).send({ message: "Métricas obtidas com sucesso", metrics });
    } catch (error) {
      return reply.status(500).send({ message: "Erro ao obter métricas", error });
    }
  });
}