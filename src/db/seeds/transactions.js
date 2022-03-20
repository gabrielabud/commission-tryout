exports.seed = async function (knex) {
  await knex('transactions').del();
  await knex('transactions').insert([
    {
      date: '2021-01-03', amount: 500, currency: 'EUR', client_id: 1, amount_eur: 500, exchange_rate: 1,
    },
    {
      date: '2021-01-04', amount: 499, currency: 'EUR', client_id: 1, amount_eur: 500, exchange_rate: 1,
    },
    {
      date: '2021-01-05', amount: 100, currency: 'EUR', client_id: 1, amount_eur: 500, exchange_rate: 1,
    },
    {
      date: '2021-02-03', amount: 500, currency: 'EUR', client_id: 4, amount_eur: 500, exchange_rate: 1,
    },
    {
      date: '2021-01-03', amount: 500, currency: 'EUR', client_id: 5, amount_eur: 500, exchange_rate: 1,
    },
    {
      date: '2021-01-04', amount: 499, currency: 'EUR', client_id: 5, amount_eur: 499, exchange_rate: 1,
    },
    {
      date: '2021-01-03', amount: 500, currency: 'EUR', client_id: 6, amount_eur: 500, exchange_rate: 1,
    },
    {
      date: '2021-01-04', amount: 499, currency: 'EUR', client_id: 6, amount_eur: 500, exchange_rate: 1,
    },
    {
      date: '2021-01-05', amount: 100, currency: 'EUR', client_id: 6, amount_eur: 500, exchange_rate: 1,
    },
    {
      date: '2021-01-06', amount: 1.00, currency: 'EUR', client_id: 6, amount_eur: 500, exchange_rate: 1,
    },
    {
      date: '2021-01-03', amount: 200, currency: 'EUR', client_id: 102, amount_eur: 200, exchange_rate: 1,
    },
    {
      date: '2021-01-04', amount: 300, currency: 'EUR', client_id: 102, amount_eur: 300, exchange_rate: 1,
    },
    {
      date: '2021-01-05', amount: 800, currency: 'USD', client_id: 102, amount_eur: 500, exchange_rate: '1.229681',
    },
  ]);
};
