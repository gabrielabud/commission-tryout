const express = require('express');

const router = express.Router();
const { create } = require('../controllers/transactions');

router.post(
  '/transactions',
  async (req, res, next) => {
    try {
      const {
        date, amount, currency, client_id: clientID,
      } = req.body;
      const response = await create({
        date, amount: parseFloat(amount), currency, clientID,
      });
      res.status(200).json(response);
      return next();
    } catch (error) {
      return next(error);
    }
  },
);

module.exports = router;
