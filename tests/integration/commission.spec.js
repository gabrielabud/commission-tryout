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

  describe('GET /transactions', () => {
    context('SUCCESS: Send GET request to list the transaction created', () => {
      it('should return the transaction ', (done) => {
        chai.request(server)
          .get('/commission')
          .end((err, res) => {
            should.not.exist(err);
            res.status.should.eql(200);
            res.body[0].should.have.properties({
              sum: '300.00'
            });
            done();
          });
      });
    });
  });
});
