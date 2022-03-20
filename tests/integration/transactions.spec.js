process.env.NODE_ENV = 'test';
const chai = require('chai');
const chaiHttp = require('chai-http');

chai.use(chaiHttp);
chai.use(require('chai-properties'));

const should = chai.should();

const server = require('../../src').app;
const knex = require('../../src/db/knex');

describe('routes: transactions', () => {
  beforeEach(() => knex.migrate.rollback()
    .then(() => knex.migrate.latest())
    .then(() => knex.seed.run()));

  afterEach(() => knex.migrate.rollback());

  describe('POST /transactions', () => {
    context('SUCCESS: Send POST request to create a transaction', () => {
      it('should return the transaction resource created', (done) => {
        chai.request(server)
          .post('/transactions')
          .set('Content-Type', 'application/json')
          .send({
            date: '2021-01-17',
            amount: '700.00',
            currency: 'EUR',
            client_id: 50,
          })
          .end((err, res) => {
            should.not.exist(err);
            res.status.should.eql(200);
            res.type.should.eql('application/json');
            const returnDate = new Date(res.body[0].date);
            res.body[0].date = `${returnDate.getFullYear()}-${(returnDate.getMonth() + 1).toString().padStart(2, '0')}-${returnDate.getDate().toString().padStart(2, '0')}`;
            res.body[0].should.have.properties({
              date: '2021-01-17',
              amount: '700.00',
              currency: 'EUR',
              client_id: 50,
            });
            res.body[0].should.have.property('id');
            res.body.should.have.length(1);
            done();
          });
      });
    });
  });
});
