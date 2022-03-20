const dbq = require('../db/queries');

const transactionsTurnoverMonthly = async ({ clientID, date }) => {
  try {
    const response = await dbq.transactionsTurnoverMonthly({ tableName: 'transactions', date, clientID });
    return response;
  } catch (error) {
    console.log('Error in transactions controller #transactionsTurnoverMonthly');
    throw new Error(`${error.message}`);
  }
};

module.exports = {
  transactionsTurnoverMonthly,
};
