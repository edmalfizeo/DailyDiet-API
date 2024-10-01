# **Daily Diet API**

A **Daily Diet API** é uma aplicação para controle de dieta diária, permitindo que usuários registrem suas refeições e acompanhem suas métricas alimentares.

## **Descrição do Projeto**

O objetivo é criar uma API RESTful que permita aos usuários:

- Criar uma conta de usuário.
- Autenticar-se na aplicação.
- Registrar, editar e apagar refeições.
- Listar todas as refeições registradas.
- Visualizar detalhes de uma única refeição.
- Recuperar métricas pessoais sobre suas refeições.
- Garantir que cada usuário só possa manipular suas próprias refeições.

## **Tecnologias Utilizadas**

- **Node.js** com **TypeScript**
- **Fastify** como framework web
- **Knex** para interação com o banco de dados
- **SQLite** como banco de dados em desenvolvimento
- **ESLint** para padronização de código
- **Vitest** para testes (a serem implementados no final)

## **Requisitos Funcionais**

### **Usuários**

- [x] **Cadastro de Usuário**: Implementar a rota para criação de usuários, com os campos necessários (nome, email, senha).
- [x] **Autenticação de Usuário**: Implementar a rota de login para autenticação dos usuários, retornando um token JWT.
- [x] **Proteção de Rotas**: Criar um middleware para proteger rotas que exigem autenticação, validando o token JWT fornecido.

### **Refeições**

- [x] **Registrar Refeição**: Implementar a rota para registrar uma nova refeição, com os campos:
  - Nome da refeição
  - Descrição
  - Data e Hora
  - Indicador se está dentro da dieta ou não
- [x] **Editar Refeição**: Implementar a rota para editar uma refeição existente.
- [x] **Apagar Refeição**: Implementar a rota para deletar uma refeição.
- [x] **Listar Refeições**: Implementar a rota para listar todas as refeições do usuário autenticado.
- [x] **Visualizar Refeição**: Implementar a rota para visualizar detalhes de uma única refeição.

### **Métricas do Usuário**

- [x] **Recuperar Métricas**: Implementar a rota para recuperar as métricas do usuário autenticado:
  - Quantidade total de refeições registradas.
  - Quantidade total de refeições dentro da dieta.
  - Quantidade total de refeições fora da dieta.
  - Melhor sequência de refeições dentro da dieta.

### **Regras de Negócio**

- [x]  **Restrição de Acesso**: Garantir que um usuário só possa visualizar, editar ou apagar as refeições que ele próprio criou.
- [x] **Validação de Dados**: Implementar validações nos dados de entrada para todas as rotas.


