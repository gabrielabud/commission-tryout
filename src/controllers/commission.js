const dbq = require('../db/queries');
const { create } = require('./transactions');
const { amountEURConverted } = require('../helpers/exchange_rate');
const { calculateFinalCommission } = require('../helpers/commission_calculation');

const calculateCommission = async ({
  date, amount, currency, clientID,
}) => {
  try {
    const turnoverEUR = await dbq.transactionsTurnoverMonthly({ tableName: 'transactions', date, clientID });
    const newTransaction = await create({
      date, amount, currency, clientID,
    });
    const { amountEUR } = await amountEURConverted({ amount, currency, date });
    const commission = calculateFinalCommission({ amount: amountEUR, turnover: turnoverEUR, clientID });
    return commission;
  } catch (error) {
    console.log('Error in transactions commission controller #calculateCommission');
    throw new Error(`${error.message}`);
  }
};

module.exports = {
  calculateCommission,
};
