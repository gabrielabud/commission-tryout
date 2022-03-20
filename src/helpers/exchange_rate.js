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

const amountCurrencyConverted = async ({ amount, currency, date }) => {
  if (currency === 'EUR') {
    return amount;
  }
  try {
    const exchangeRate = await getExchangeRate({ currency, date });
    const amountConverted = amount / exchangeRate;
    return { amountConverted, exchangeRate };
  } catch (error) {
    throw new Error(`${error.message}`);
  }
};

module.exports = {
  amountCurrencyConverted,
};

// const response =  async () => {
//   const kiki = await amountCurrencyConverted({amount: 1000, date: '2022-02-01', currency: 'USD'})
//   console.log('kiki', kiki);
// }
// response()
