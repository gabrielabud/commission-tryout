const knex = require('./knex');
const moment = require('moment');

async function createTransaction({ date, amount, currency, clientID }) {
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
}

async function listByClientID({
  tableName, clientID,
}) {
  try {
    const response = await knex.select().from(`${tableName}`).where({ client_id: clientID });
    return response;
  } catch (error) {
    console.log('Error in knex queries #listtByClientID', `with following error message: ${error.message}`);
    throw new Error(`${error.message}`);
  }
}

async function list(tableName) {
  try {
    const response = await knex.select().from(`${tableName}`);
    return response;
  } catch (error) {
    console.log('Error in knex queries #list', `with following error message: ${error.message}`);
    throw new Error(`${error.message}`);
  }
}

async function transactionsTurnoverMonthly({ tableName, date }) {
  try {
    const firstOfMonth =  moment(date).startOf('month').format('YYYY-MM-DD'); 
    const lastOfMonth =  moment(date).endOf('month').format('YYYY-MM-DD');
    const response = await knex.select().from(`${tableName}`).where('date', '>=', firstOfMonth).where('date', '<=', lastOfMonth).sum('amount');
    return response;
  } catch (error) {
    console.log('Error in knex queries #list', `with following error message: ${error.message}`);
    throw new Error(`${error.message}`);
  }
}

module.exports = {
  createTransaction,
  listByClientID,
  list,
  transactionsTurnoverMonthly
};
