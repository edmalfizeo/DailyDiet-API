import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('user_recipes', table => {
        table.uuid('id').primary();
        table.uuid('user_id').notNullable().references('id').inTable('users');
        table.string('name').notNullable();
        table.string('description').notNullable();
        table.text('meal_time').notNullable();
        table.boolean('is_diet').notNullable();
    })
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('user_recipes');
}

