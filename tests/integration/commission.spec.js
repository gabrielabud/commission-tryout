process.env.NODE_ENV = 'test';
const chai = require('chai');
const chaiHttp = require('chai-http');

chai.use(chaiHttp);
chai.use(require('chai-properties'));

const should = chai.should();
const server = require('../../src').app;
const knex = require('../../src/db/knex');

describe('routes: commission', () => {
  beforeEach(() => knex.migrate.rollback()
    .then(() => knex.migrate.latest())
    .then(() => knex.seed.run()));

  afterEach(() => knex.migrate.rollback());

  describe('POST /commission', () => {
    context('SUCCESS: Send POST request to calculate commission', () => {
      it('client with a discount transaction EUR: should return the commision amount and currency', (done) => {
        chai.request(server)
          .post('/commission')
          .set('Content-Type', 'application/json')
          .send({
            date: '2021-01-02',
            amount: '2000.00',
            currency: 'EUR',
            client_id: 42,
          })
          .end((err, res) => {
            should.not.exist(err);
            res.status.should.eql(200);
            res.type.should.eql('application/json');
            res.body.should.have.properties({
              amount: 0.05,
              currency: 'EUR',
            });
            done();
          });
      });

      it('client with a discount transaction USD: should return the commision amount and currency', (done) => {
        chai.request(server)
          .post('/commission')
          .set('Content-Type', 'application/json')
          .send({
            date: '2021-01-02',
            amount: '2000.00',
            currency: 'EUR',
            client_id: 42,
          })
          .end((err, res) => {
            should.not.exist(err);
            res.status.should.eql(200);
            res.type.should.eql('application/json');
            res.body.should.have.properties({
              amount: 0.05,
              currency: 'EUR',
            });
            done();
          });
      });

      it('USD transaction: should return the commision amount and currency', (done) => {
        chai.request(server)
          .post('/commission')
          .set('Content-Type', 'application/json')
          .send({
            date: '2021-01-01',
            amount: '2000.00',
            currency: 'USD',
            client_id: 115,
          })
          .end((err, res) => {
            should.not.exist(err);
            res.status.should.eql(200);
            res.type.should.eql('application/json');
            res.body.should.have.properties({
              amount: 8.21,
              currency: 'EUR',
            });
            done();
          });
      });

      it('RON transaction: should return the commision amount and currency', (done) => {
        chai.request(server)
          .post('/commission')
          .set('Content-Type', 'application/json')
          .send({
            date: '2021-01-01',
            amount: '15000.00',
            currency: 'RON',
            client_id: 115,
          })
          .end((err, res) => {
            should.not.exist(err);
            res.status.should.eql(200);
            res.type.should.eql('application/json');
            res.body.should.have.properties({
              amount: 15.46,
              currency: 'EUR',
            });
            done();
          });
      });

      it('default pricing: should return the commision amount and currency for default', (done) => {
        chai.request(server)
          .post('/commission')
          .set('Content-Type', 'application/json')
          .send({
            date: '2021-01-03',
            amount: '500.00',
            currency: 'EUR',
            client_id: 3,
          })
          .end((err, res) => {
            should.not.exist(err);
            res.status.should.eql(200);
            res.type.should.eql('application/json');
            res.body.should.have.properties({
              amount: 2.50,
              currency: 'EUR',
            });
            done();
          });
      });

      /* DATABASE ALREADY SEEDED WITH:
        { date: '2021-02-03', amount: 500, currency: 'EUR', client_id: 4}
      */
      it('default pricing: should return the commision amount and currency', (done) => {
        chai.request(server)
          .post('/commission')
          .set('Content-Type', 'application/json')
          .send({
            date: '2021-01-04',
            amount: '499.00',
            currency: 'EUR',
            client_id: 4,
          })
          .end((err, res) => {
            should.not.exist(err);
            res.status.should.eql(200);
            res.type.should.eql('application/json');
            res.body.should.have.properties({
              amount: 2.50,
              currency: 'EUR',
            });
            done();
          });
      });

      /* DATABASE ALREADY SEEDED WITH:
        { date: '2021-01-03', amount: 500, currency: 'EUR', client_id: 5 }
        { date: '2021-01-04', amount: 499, currency: 'EUR', client_id: 5 }
      */
      it('default pricing with current monthly turnover 999: should return the commision amount and currency', (done) => {
        chai.request(server)
          .post('/commission')
          .set('Content-Type', 'application/json')
          .send({
            date: '2021-01-05',
            amount: '100',
            currency: 'EUR',
            client_id: 5,
          })
          .end((err, res) => {
            should.not.exist(err);
            res.status.should.eql(200);
            res.type.should.eql('application/json');
            res.body.should.have.properties({
              amount: 0.50,
              currency: 'EUR',
            });
            done();
          });
      });

      /* DATABASE ALREADY SEEDED WITH:
        { date: '2021-01-03', amount: 500, currency: 'EUR', client_id: 1 },
        { date: '2021-01-04', amount: 499, currency: 'EUR', client_id: 1 },
        { date: '2021-01-05', amount: 100, currency: 'EUR', client_id: 1 }
      */
      it('high turnover discount: should return the commision amount and currency', (done) => {
        chai.request(server)
          .post('/commission')
          .set('Content-Type', 'application/json')
          .send({
            date: '2021-01-06',
            amount: '1.00',
            currency: 'EUR',
            client_id: 1,
          })
          .end((err, res) => {
            should.not.exist(err);
            res.status.should.eql(200);
            res.type.should.eql('application/json');
            res.body.should.have.properties({
              amount: 0.03,
              currency: 'EUR',
            });
            done();
          });
      });

      /* DATABASE ALREADY SEEDED WITH:
        { date: '2021-01-03', amount: 500, currency: 'EUR', client_id: 6 },
        { date: '2021-01-04', amount: 499, currency: 'EUR', client_id: 6 },
        { date: '2021-01-05', amount: 100, currency: 'EUR', client_id: 6 },
        { date: '2021-01-06', amount: 1.00, currency: 'EUR', client_id: 6 }
      */
      it('default pricing with high turnover only the previous month: should return the commision amount and currency', (done) => {
        chai.request(server)
          .post('/commission')
          .set('Content-Type', 'application/json')
          .send({
            date: '2021-02-01',
            amount: '500',
            currency: 'EUR',
            client_id: 6,
          })
          .end((err, res) => {
            should.not.exist(err);
            res.status.should.eql(200);
            res.type.should.eql('application/json');
            res.body.should.have.properties({
              amount: 2.5,
              currency: 'EUR',
            });
            done();
          });
      });

      /* DATABASE ALREADY SEEDED WITH:
        { date: '2021-01-03', amount: 200, currency: 'EUR', client_id: 102 },
        { date: '2021-01-04', amount: 300, currency: 'EUR', client_id: 102 },
        { date: '2021-01-05', amount: 800, currency: 'USD', client_id: 102 }
      */
      it('high turnover discount for transactions in multiple currency: should return the commision amount and currency', (done) => {
        chai.request(server)
          .post('/commission')
          .set('Content-Type', 'application/json')
          .send({
            date: '2021-01-06',
            amount: '2.00',
            currency: 'USD',
            client_id: 102,
          })
          .end((err, res) => {
            should.not.exist(err);
            res.status.should.eql(200);
            res.type.should.eql('application/json');
            res.body.should.have.properties({
              amount: 0.03,
              currency: 'EUR',
            });
            done();
          });
      });
    });
  });
});
