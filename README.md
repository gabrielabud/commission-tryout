# Task Specification

Create a RESTful API with an endpoint for transaction commission calculation. The API must use JSON format for requests and responses. More details in 


### Commission calculation rules

The **lowest** commission shall be used if there are **multiple** rules matching.

**Rule #1: Default pricing**

By default the price for every transaction is `0.5%` but not less than `0.05€`.

**Rule #2: Client with a discount**

Transaction price for the client with ID of `42` is  `0.05€` (*unless other rules set lower commission*).

**Rule #3: High turnover discount**

Client after reaching transaction turnover of `1000.00€` (per month) gets a discount and transaction commission is `0.03€` for the following transactions.

# Instructions 
- $ npm install
- $ psql  <br />
    -->  CREATE DATABASE payments;  <br />
     -->  CREATE DATABASE payments_test;
- $ knex migrate:latest <br />
  --> for running the database migrations on the development database 'payments'
- $ knex migrate:latest --env test <br />
  -> for running the db migrations on the test database 'payments_test'
- $ npm run start <br />
  --> for running the server

- $ npm run test:integration <br /> 
  --> for running the integrations tests.
  The seed data for the tests it's located at ./src/db/seeds 

- $ npm run test:unit <br /> 
  --> for running the unit tests.

# Technologies
- The API is build using Node.js and Express server framework

- The database is PostgresSQL, having used Knex for querying the database

- request-promise HTTP request which has support for Promise

- For integration testing I have used Mocha(test framework running on Node.js), Chai(BDD / TDD assertion library), Chai-Properties(properties matcher for chai) and  Chai-HTTP(making the http requests)

# Design

## Database Schema

I have only defined the transactions table. If I had more time, I would have also defined a client and commission table. ONE CLIENT has MANY TRANSACTIONS. ONE TRANSACTION can only have ONE CLIENT as iniator.
For more details on the database schema please consult the migrations file located at 
  ./src/db/migrations/20220317204033_create_transactions_table.js



# REST API Architecture

The API follows a restful architectural style

- POST /commission --> to calculate commission

- POST /transactions --> to create a transaction resource


# Important issues not yet addressed in the challenge due to time constrains: 
- created a swagger for documenting the API
- used a middleware to validate the swagger files
- add more unit and integration testing;
- implement a more transparent and effcient error handling, which surfaces more details about the error.
- implemented a logger


- It took me approximately 4 hours to complete the task.