import Fastify from 'fastify';
import cookie from '@fastify/cookie';
import userRoutes from './routes/users/userRoutes';
import recipeRoutes from './routes/recipes/recipeRoutes';
import summaryRoutes from './routes/summary/summaryRoute';


const app = Fastify();

app.register(cookie, {
    secret: "my-secret",
    parseOptions: {}
  });
  

app.register(userRoutes, { prefix: '/users' });
app.register(recipeRoutes, { prefix: '/recipes' });
app.register(summaryRoutes, { prefix: '/summary' });

const PORT = Number(process.env.PORT) || 3333;

app.listen({ port: PORT, host: '0.0.0.0' }, () => {
  console.log(`Server is running on port ${PORT}`);
});