const dbq = require('../db/queries');

const create = async ({
  date, amount, currency, clientID,
}) => {
  try {
    const response = await dbq.createTransaction({
      date, amount, currency, clientID,
    });
    return response;
  } catch (error) {
    console.log('Error in transactions controller #create');
    throw new Error(`${error.message}`);
  }
};

const list = async () => {
  try {
    const response = await dbq.list('transactions');
    return response;
  } catch (error) {
    console.log('Error in transactions controller #list');
    throw new Error(`${error.message}`);
  }
};

const listByClientID = async (clientID) => {
  try {
    const response = await dbq.listByClientID({ tableName: 'transactions', clientID });
    return response;
  } catch (error) {
    console.log('Error in transactions controller #listByClientID');
    throw new Error(`${error.message}`);
  }
};

module.exports = {
  create,
  list,
  listByClientID,
};
