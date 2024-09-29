import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('users', (table) => {
        table.uuid('id').primary().notNullable(); // Campo ID com UUID
        table.string('name').notNullable(); // Nome do usuário
        table.string('email').notNullable().unique(); // Email único
        table.string('password').notNullable(); // Senha
        table.timestamps(true, true); // Colunas created_at e updated_at
      });
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('users');
}

