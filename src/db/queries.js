const moment = require('moment');
const knex = require('./knex');

const createTransaction = async ({
  date, amount, currency, clientID,
}) => {
  try {
    const response = await knex.insert({
      date,
      amount,
      currency,
      client_id: clientID,
    }).into('transactions').returning('*');
    return response;
  } catch (error) {
    console.log('Error in knex queries #createTransaction', `with following error message: ${error.message}`);
    throw new Error(`${error.message}`);
  }
};

const listByClientID = async ({
  tableName, clientID,
}) => {
  try {
    const response = await knex.select().from(`${tableName}`).where({ client_id: clientID });
    return response;
  } catch (error) {
    console.log('Error in knex queries #listtByClientID', `with following error message: ${error.message}`);
    throw new Error(`${error.message}`);
  }
};

const list = async (tableName) => {
  try {
    const response = await knex.select().from(`${tableName}`);
    return response;
  } catch (error) {
    console.log('Error in knex queries #list', `with following error message: ${error.message}`);
    throw new Error(`${error.message}`);
  }
};

const transactionsTurnoverMonthly = async ({ tableName, date, clientID }) => {
  try {
    const firstOfMonth = moment(date).startOf('month').format('YYYY-MM-DD');
    const lastOfMonth = moment(date).endOf('month').format('YYYY-MM-DD');
    const response = await knex.select().from(`${tableName}`)
      .where({ client_id: clientID })
      .where('date', '>=', firstOfMonth)
      .where('date', '<=', lastOfMonth)
      .sum('amount');
    return response[0].sum;
  } catch (error) {
    console.log('Error in knex queries #list', `with following error message: ${error.message}`);
    throw new Error(`${error.message}`);
  }
};

module.exports = {
  createTransaction,
  listByClientID,
  list,
  transactionsTurnoverMonthly,
};
