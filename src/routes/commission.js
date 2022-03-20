const express = require('express');

const router = express.Router();
const { calculateCommission } = require('../controllers/commission');

router.post(
  '/commission',
  async (req, res, next) => {
    try {
      const {
        date, amount, currency, client_id: clientID,
      } = req.body;
      const commission = await calculateCommission({
        date, amount: parseFloat(amount), currency, clientID,
      });
      const response = { amount: commission, currency: 'EUR' };
      res.status(200).json(response);
      return next();
    } catch (error) {
      return next(error);
    }
  },
);

module.exports = router;
