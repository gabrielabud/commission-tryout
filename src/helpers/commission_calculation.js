const mininumCommissionAmount = 0.05;
const defaultCommissionPercentage = 0.5;
const discountClients = [42];
const discountClientCommission = 0.05;
const highTurnoverAmount = 1000;
const highTurnoverCommission = 0.03;

const isDiscountClient = ({ clientID }) => {
  const found = discountClients.some((element) => element === clientID);
  return found;
};

const isHighTurnoverClient = ({ turnover }) => turnover >= highTurnoverAmount;

const calculateDefaultCommission = ({ amount }) => {
  const commissionAmount = amount * (defaultCommissionPercentage / 100);
  return commissionAmount > mininumCommissionAmount ? commissionAmount : mininumCommissionAmount;
};

const calculateDiscountClient = () => discountClientCommission;
const calculateHighTurnoverCommission = () => highTurnoverCommission;

const calculateFinalCommission = ({ amount, clientID, turnover }) => {
  const eligibleCommissions = [];
  eligibleCommissions.push(calculateDefaultCommission({ amount }));
  if (isHighTurnoverClient({ turnover })) {
    eligibleCommissions.push(calculateHighTurnoverCommission());
  }
  if (isDiscountClient({ clientID })) {
    eligibleCommissions.push(calculateDiscountClient());
  }
  const finalCommission = Math.min(...eligibleCommissions);
  return Math.round(finalCommission * 100) / 100;
};

module.exports = {
  calculateFinalCommission,
};

// console.log(isDiscountClient({ clientID: 42}));
// console.log("Calculate commision", calculateFinalCommission({ amount: 600, turnover: 900, clientID: 10}));
