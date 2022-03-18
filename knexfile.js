module.exports = {
  development: {
    client: 'pg',
    connection: 'postgres://localhost:5432/payments',
    migrations: {
      directory: `${__dirname}/src/db/migrations`,
    },
    seeds: {
      directory: `${__dirname}/src/db/seeds`,
    },
  },
  test: {
    client: 'pg',
    connection: 'postgres://localhost:5432/payments_test',
    migrations: {
      directory: `${__dirname}/src/db/migrations`,
    },
    seeds: {
      directory: `${__dirname}/src/db/seeds`,
    },
  },
};
