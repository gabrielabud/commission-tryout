const dbq = require('../db/queries');

async function create({
  date, amount, currency, clientID,
}) {
  try {
    const response = await dbq.createTransaction({
      date, amount, currency, clientID,
    });
    return response;
  } catch (error) {
    console.log('Error in transactions controller #create');
    throw error;
  }
}

async function list() {
  try {
    const response = await dbq.list('transactions');
    return response;
  } catch (error) {
    console.log('Error in transactions controller #list');
    throw error;
  }
}

async function listByClientID(clientID) {
  try {
    const response = await dbq.listByClientID({ tableName: 'transactions', clientID });
    return response;
  } catch (error) {
    console.log('Error in transactions controller #listByClientID');
    throw error;
  }
}

module.exports = {
  create,
  list,
  listByClientID,
};
