exports.seed = async function (knex) {
  await knex('transactions').del();
  await knex('transactions').insert([
    {
      date: '2021-01-01', amount: 100, currency: 'EUR', client_id: 9,
    },
    {
      date: '2021-01-03', amount: 200, currency: 'EUR', client_id: 10,
    },
    {
      date: '2021-02-01', amount: 500, currency: 'EUR', client_id: 11,
    },
  ]);
};
