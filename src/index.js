const express = require('express');
const transactions = require('./routes/transactions');
const commission = require('./routes/commission');

const app = express();
const port = 3000;

app.use(express.json());
app.get('/', (req, res) => res.send('Hello to Commission Calculation API'));

app.use('/', transactions);
app.use('/', commission);

module.exports = {
  app,
  run: () => app.listen(port, () => console.log(`Commission Calculation API listening on port ${port}!`)),
};
