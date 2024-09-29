import Fastify from 'fastify';
import cookie from '@fastify/cookie';
import userRoutes from './routes/users/userRoutes';

const app = Fastify();

app.register(cookie, {
    secret: "my-secret", // Você pode definir um segredo para assinar os cookies, se necessário
    parseOptions: {} // Opções de parsing de cookies, se necessário
  });
  
// Registra a rota de usuários
app.register(userRoutes, { prefix: '/users' }); // O prefixo '/users' será adicionado a todas as rotas

app.listen({ port: 3333 })
.then(() => {
    console.log('Server is running on port 3333');
});
 
