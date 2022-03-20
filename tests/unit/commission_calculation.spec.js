const chai = require('chai');
const { calculateFinalCommission } = require('../../src/helpers/commission_calculation');

chai.should();

describe('#calculateFinalCommission', () => {
  it('should return commission for client with discount', () => {
    const commission = calculateFinalCommission({ amount: 2000, clientID: 42, turnover: 999 });
    commission.should.eql(0.05);
  });

  it('should return commission for client with both discount and high current month turnover', () => {
    const commission = calculateFinalCommission({ amount: 2000, clientID: 2, turnover: 1050 });
    commission.should.eql(0.03);
  });

  it('should return commission for standard client and no high current month turnover', () => {
    const commission = calculateFinalCommission({ amount: 500, clientID: 3, turnover: 700 });
    commission.should.eql(2.5);
  });

  it('should return high turnoever commission for standard client with low amount transaction', () => {
    const commission = calculateFinalCommission({ amount: 1, clientID: 3, turnover: 1200 });
    commission.should.eql(0.03);
  });

  it('should return minimum commission for standard client with low amount transaction', () => {
    const commission = calculateFinalCommission({ amount: 1, clientID: 3, turnover: 950 });
    commission.should.eql(0.05);
  });
});
