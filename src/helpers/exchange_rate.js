const fetch = require('node-fetch');

const getExchangeRate = async ({ currency, date }) => {
  try {
    const response = await fetch(`https://api.exchangerate.host/${date}`);
    const data = await response.json();
    return data.rates[currency];
  } catch (error) {
    throw new Error(`${error.message}`);
  }
};

const amountEURConverted = async ({ amount, currency, date }) => {
  if (currency === 'EUR') {
    return { amountEUR: amount, exchangeRate: 1 };
  }
  try {
    const exchangeRate = await getExchangeRate({ currency, date });
    const amountEUR = amount / exchangeRate;
    return { amountEUR, exchangeRate };
  } catch (error) {
    throw new Error(`${error.message}`);
  }
};

module.exports = {
  amountEURConverted,
  getExchangeRate,
};
