const express = require('express');

const router = express.Router();
const { transactionsTurnoverMonthly } = require('../controllers/commission');
console.log('routes')
router.get(
  '/commission',
  async (req, res, next) => {
    try {
      const response = await transactionsTurnoverMonthly('2021-01-07');
      res.status(200).json(response);
      return next();
    } catch (error) {
      return next(error);
    }
  },
);

module.exports = router;

