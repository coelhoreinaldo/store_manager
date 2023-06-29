const chai = require('chai');
const { expect } = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const validateCreateProduct = require('../../src/middlewares/validateNewProduct');
const { newSaleFromModel } = require('../unit/mocks/sales.mock');
const validateCreateSale = require('../../src/middlewares/validateNewSale');

chai.use(sinonChai);

describe('The MIDDLEWARES', function () {
  describe('The validateNewProduct', function () {
    it('should register a new product', async function () {
      const next = sinon.stub().returns();

      const req = {
        params: {},
        body: { name: 'Monitor' },
      };

      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      };

      await validateCreateProduct(req, res, next);

      expect(next).to.have.been.calledWith();
    });

    it('should return an error when fields are not completed', async function () {
      const next = sinon.stub().returns();

      const req = {
        params: {},
        body: {},
      };

      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      };

      await validateCreateProduct(req, res, next);

      expect(res.status).to.have.been.calledWith(400);
    });
  });
  describe('The validateNewSale', function () {
    it('should register a new sale', async function () {
      const next = sinon.stub().returns();

      const req = {
        params: {},
        body: { ...newSaleFromModel },
      };

      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      };

      await validateCreateSale(req, res, next);
      expect(next).to.have.been.calledWith();
    });

    // it('should return an error when fields are not completed', async function () {
    //   const next = sinon.stub().returns();

    //   const badInput = [
    //     {
    //       quantity: 1,
    //     },
    //     {
    //       productId: 2,
    //       quantity: 2,
    //     },
    //   ];

    //   const req = {
    //     params: {},
    //     body: { ...badInput },
    //   };

    //   const res = {
    //     status: sinon.stub().returnsThis(),
    //     json: sinon.stub(),
    //   };

    //   await validateCreateProduct(req, res, next);
    //   expect(next).to.have.been.calledWith();
    //   sinon.assert.calledWith(res.status, 400);

    //   expect(res.status).to.have.been.calledWith(400);
    // });
  });

  afterEach(function () { return sinon.restore(); });
});