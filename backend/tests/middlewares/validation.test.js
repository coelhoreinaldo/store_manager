const chai = require('chai');
const { expect } = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const validateProduct = require('../../src/middlewares/validateProduct');
const { newSaleFromModel } = require('../unit/mocks/sales.mock');
const validateSale = require('../../src/middlewares/validateSale');
const validateQuantity = require('../../src/middlewares/validateQuantity');

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

      await validateProduct(req, res, next);

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

      await validateProduct(req, res, next);

      expect(res.status).to.have.been.calledWith(400);
      expect(res.json).to.have.been.calledWith({ message: '"name" is required' });
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

      await validateSale(req, res, next);
      expect(next).to.have.been.calledWith();
    });

    it('should return an error when fields are not completed', async function () {
      const next = sinon.stub().returns();
      const badInput = [
        { productId: 1, quantity: 2 },
        { quantity: 3 },
      ];
      const req = {
        body: badInput,
      };
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      };

      await validateSale(req, res, next);

      expect(res.status).to.have.been.calledWith(400);
      expect(res.json).to.have.been.calledWith({ message: '"productId" is required' });
    });
  });

  describe('The validateQuantity', function () {
    it('should validate quantity', async function () {
      const next = sinon.stub().returns();

      const req = {
        params: {},
        body: { quantity: 3 },
      };

      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      };

      await validateQuantity(req, res, next);
      expect(next).to.have.been.calledWith();
    });
    it('should return a error when quantity is undefined', async function () {
      const next = sinon.stub().returns();

      const req = {
        params: {},
        body: {},
      };

      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      };

      await validateQuantity(req, res, next);

      expect(res.status).to.have.been.calledWith(400);
    });
  });
  afterEach(function () { return sinon.restore(); });
});
