const dbq = require('../db/queries');

async function transactionsTurnoverMonthly(date) {
  try {
    console.log('controllers commission')
    const response = await dbq.transactionsTurnoverMonthly({ tableName: 'transactions', date });
    return response;
  } catch (error) {
    console.log('Error in transactions controller #listByDate');
    throw error;
  }
}

module.exports = {
  transactionsTurnoverMonthly
};
