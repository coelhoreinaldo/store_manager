const { expect } = require('chai');
const sinon = require('sinon');
const connection = require('../../../src/models/connection');
const { salesModel } = require('../../../src/models');
const { allSalesFromModel, salesByIdFromModel, newSaleIdFromDB, newSaleFromModel, newSaleIdFromModel } = require('../mocks/sales.mock');

describe('The SALES MODEL LAYER', function () {
  describe('GET endpoint', function () {
    it('should list all sales', async function () {
      sinon.stub(connection, 'execute').resolves([allSalesFromModel]);

      const responseModel = await salesModel.findAll();

      expect(responseModel).to.be.deep.equal(allSalesFromModel);
      expect(responseModel).to.be.an('array');
      expect(responseModel).to.have.lengthOf(3);
    });

    it('should list sale by ID', async function () {
      sinon.stub(connection, 'execute').resolves([salesByIdFromModel]);

      const inputId = 1;
      const responseModel = await salesModel.findById(inputId);

      expect(responseModel).to.be.deep.equal(responseModel);
      expect(responseModel).to.be.an('array');
      expect(responseModel[0]).to.have.property('productId');
    });
  });

  describe('POST endpoint', function () {
    it('should register a new product', async function () {
      sinon.stub(connection, 'execute')
        .onFirstCall()
        .resolves([newSaleIdFromDB])
        .onSecondCall()
        .resolves([newSaleFromModel[0]])
        .onThirdCall()
        .resolves([newSaleFromModel[1]]);

      const inputData = [
        {
          productId: 1,
          quantity: 1,
        },
        {
          productId: 2,
          quantity: 5,
        },
      ];

      const insertIdResponse = await salesModel.insert(inputData);

      expect(insertIdResponse).to.be.a('number');
      expect(insertIdResponse).to.be.equal(newSaleIdFromModel);
    });
  });
  afterEach(function () { return sinon.restore(); });
});