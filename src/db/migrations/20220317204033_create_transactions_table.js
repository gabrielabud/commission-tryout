exports.up = (knex) => knex.schema
  .createTable('transactions', (table) => {
    table.increments('id').primary();
    table.date('date').notNullable();
    table.decimal('amount', null, 2);
    table.string('currency', 3).notNullable();
    table.integer('client_id').notNullable();
    table.timestamps();
  });

exports.down = (knex) => knex.schema
  .dropTable('transactions');
