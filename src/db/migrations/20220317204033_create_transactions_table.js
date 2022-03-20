exports.up = (knex) => knex.schema
  .createTable('transactions', (table) => {
    table.increments('id').primary();
    table.date('date').notNullable();
    table.decimal('amount', 10, 2);
    table.decimal('amount_eur', 10, 2);
    table.decimal('exchange_rate', 10, 6).notNullable();
    table.string('currency', 3).notNullable();
    table.integer('client_id').notNullable();
  });

exports.down = (knex) => knex.schema
  .dropTable('transactions');
