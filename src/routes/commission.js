const express = require('express');

const router = express.Router();
const { transactionsTurnoverMonthly } = require('../controllers/commission');
const { create } = require('../controllers/transactions');
const { calculateFinalCommission } = require('../helpers/commission_calculation');

router.post(
  '/commission',
  async (req, res, next) => {
    try {
      const {
        date, amount, currency, client_id: clientID,
      } = req.body;
      const turnover = await transactionsTurnoverMonthly({ clientID, date });
      const newTransaction = await create({
        date, amount: parseFloat(amount), currency, clientID,
      });
      const commission = calculateFinalCommission({ amount, turnover, clientID });
      const response = { amount: commission, currency: 'EUR' };
      res.status(200).json(response);
      return next();
    } catch (error) {
      return next(error);
    }
  },
);

module.exports = router;
