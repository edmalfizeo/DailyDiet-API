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

app.listen({ port: 3333 })
.then(() => {
    console.log('Server is running on port 3333');
});
 
