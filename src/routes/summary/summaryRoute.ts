import { FastifyInstance } from 'fastify';
import { getUserMetrics } from '../../services/getSummary';
import { db } from '../../database/database';

export default async function summaryRoutes(app: FastifyInstance) {
  app.get('/', async (request, reply) => {
    try {
      const sessionId = request.cookies.sessionId;

      if (!sessionId) {
        return reply.status(401).send({ message: "Usuário não autenticado" });
      }

      const user = await db('users').where({ session_id: sessionId }).first();

      if (!user) {
        return reply.status(404).send({ message: "Usuário não encontrado" });
      }

      const metrics = await getUserMetrics(user.id);

      return reply.status(200).send({ message: "Métricas obtidas com sucesso", metrics });
    } catch (error) {
      return reply.status(500).send({ message: "Erro ao obter métricas", error });
    }
  });
}