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

- [ ] **Registrar Refeição**: Implementar a rota para registrar uma nova refeição, com os campos:
  - Nome da refeição
  - Descrição
  - Data e Hora
  - Indicador se está dentro da dieta ou não
- [ ] **Editar Refeição**: Implementar a rota para editar uma refeição existente.
- [ ] **Apagar Refeição**: Implementar a rota para deletar uma refeição.
- [ ] **Listar Refeições**: Implementar a rota para listar todas as refeições do usuário autenticado.
- [ ] **Visualizar Refeição**: Implementar a rota para visualizar detalhes de uma única refeição.

### **Métricas do Usuário**

- [ ] **Recuperar Métricas**: Implementar a rota para recuperar as métricas do usuário autenticado:
  - Quantidade total de refeições registradas.
  - Quantidade total de refeições dentro da dieta.
  - Quantidade total de refeições fora da dieta.
  - Melhor sequência de refeições dentro da dieta.

### **Regras de Negócio**

- [ ] **Restrição de Acesso**: Garantir que um usuário só possa visualizar, editar ou apagar as refeições que ele próprio criou.
- [ ] **Validação de Dados**: Implementar validações nos dados de entrada para todas as rotas.
- [ ] **Hashing de Senhas**: Armazenar as senhas dos usuários de forma segura, utilizando hashing (ex: bcrypt).

## **Passos para Implementação**

### **1. Configuração Inicial**

- [ ] Configurar o ambiente de desenvolvimento com TypeScript, Fastify, Knex e SQLite.
- [ ] Configurar o ESLint para manter a consistência do código.
- [ ] Estruturar o projeto conforme definido anteriormente, separando rotas e serviços.

### **2. Implementação da Autenticação**

- [ ] **Cadastro de Usuário**:
  - Criar a rota `POST /users` para registrar novos usuários.
  - Implementar a lógica para armazenar usuários no banco de dados com a senha hasheada.
- [ ] **Login de Usuário**:
  - Criar a rota `POST /login` para autenticação.
  - Validar as credenciais do usuário.
  - Gerar um token JWT para usuários autenticados.
- [ ] **Middleware de Autenticação**:
  - Criar um middleware que valida o token JWT presente no cabeçalho das requisições.
  - Proteger rotas que exigem autenticação.

### **3. Implementação das Funcionalidades de Refeição**

- [ ] **Registrar Refeição**:
  - Criar a rota `POST /meals` para registrar refeições.
  - Associar a refeição ao usuário autenticado.
- [ ] **Editar Refeição**:
  - Criar a rota `PUT /meals/:id` para editar uma refeição.
  - Verificar se a refeição pertence ao usuário autenticado.
- [ ] **Apagar Refeição**:
  - Criar a rota `DELETE /meals/:id` para deletar uma refeição.
  - Verificar se a refeição pertence ao usuário autenticado.
- [ ] **Listar Refeições**:
  - Criar a rota `GET /meals` para listar todas as refeições do usuário.
- [ ] **Visualizar Refeição**:
  - Criar a rota `GET /meals/:id` para obter detalhes de uma refeição específica.

### **4. Implementação das Métricas**

- [ ] **Recuperar Métricas**:
  - Criar a rota `GET /metrics` para calcular e retornar as métricas do usuário.
  - Implementar a lógica para calcular a melhor sequência de refeições dentro da dieta.

### **5. Validações e Segurança**

- [ ] **Validações de Entrada**:
  - Implementar validações nos dados recebidos pelas rotas (ex: campos obrigatórios, formatos válidos).
- [ ] **Hashing de Senhas**:
  - Utilizar uma biblioteca como o bcrypt para hashear senhas antes de armazená-las.
- [ ] **Proteção de Dados Sensíveis**:
  - Garantir que informações sensíveis não sejam expostas nas respostas da API.

### **6. Testes Automatizados (Vitest)**

- [ ] **Configuração do Vitest**:
  - Configurar o ambiente de testes com Vitest.
- [ ] **Escrita de Testes**:
  - Escrever testes para as rotas de usuários e autenticação.
  - Escrever testes para as rotas de refeições.
  - Escrever testes para a lógica de cálculo de métricas.
- [ ] **Cobertura de Testes**:
  - Garantir que as principais funcionalidades sejam cobertas pelos testes.

## **Considerações Finais**

- **Documentação da API**: Considere documentar os endpoints da API para facilitar o uso e manutenção futura.
- **Tratamento de Erros**: Implemente um mecanismo consistente de tratamento e retorno de erros.
- **Boas Práticas**: Mantenha o código organizado e seguindo as convenções estabelecidas pelo ESLint.

## **Recursos Úteis**

- **Fastify Documentation**: [https://www.fastify.io/docs/latest/](https://www.fastify.io/docs/latest/)
- **Knex Documentation**: [http://knexjs.org/](http://knexjs.org/)
- **SQLite Documentation**: [https://www.sqlite.org/docs.html](https://www.sqlite.org/docs.html)
- **JWT Introduction**: [https://jwt.io/introduction](https://jwt.io/introduction)
- **bcrypt Documentation**: [https://github.com/kelektiv/node.bcrypt.js/](https://github.com/kelektiv/node.bcrypt.js/)