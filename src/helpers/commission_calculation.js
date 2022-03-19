const mininumComissionAmount = 0.05;
const defaultCommissionPercentage = 0.5;
const discountClients = [42];
const discountClientCommission = 0.05;
const highTurnoverAmount = 1000;
const highTurnoverCommission = 0.03;

const defaultCommission = ({ amount }) => {
  const commissionAmount = amount * (defaultCommissionPercentage / 100);
  return commissionAmount > mininumComissionAmount ? commissionAmount : mininumComissionAmount;
};

const isDiscountClient = ({ clientID} ) => {
  const found = discountClients.some((element) => element === clientID);
  return found;
};

const isHighTurnoverClient = ({ amount }) => amount >= highTurnoverAmount;

const calculateCommission = ({ amount, clientID }) => {
  const commission = [ defaultCommission(amount) ];
  if (isHighTurnoverClient({ amount })) {
    commission.push(highTurnoverCommission);
  }
  if (isDiscountClient({ clientID })) {
    commision.push(discountClientCommission);
  }
  return Math.min(...commission);
};
  
console.log(defaultCommission({ amount: 500 }));
console.log(isDiscountClient({ clientID: 42}));
console.log("Calculate commision", calculateCommission({ amount: 1000, clientId: 7}));