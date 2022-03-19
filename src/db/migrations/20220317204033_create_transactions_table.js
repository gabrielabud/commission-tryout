exports.up = (knex) => knex.schema
  .createTable('transactions', (table) => {
    table.increments('id').primary();
    table.datetime('date').notNullable();
    table.decimal('amount', 10, 2);
    table.string('currency', 3).notNullable();
    table.integer('client_id').notNullable();
  });

exports.down = (knex) => knex.schema
  .dropTable('transactions');
