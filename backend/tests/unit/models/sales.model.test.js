const { expect } = require('chai');
const sinon = require('sinon');
const connection = require('../../../src/models/connection');
const { salesModel } = require('../../../src/models');
const { allSalesFromModel, salesByIdFromModel, saleIdFromDB, newSaleFromModel, saleIdFromModel, deletedSaleFromDb } = require('../mocks/sales.mock');

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
    it('should register a new sale', async function () {
      sinon.stub(connection, 'execute')
        .onFirstCall()
        .resolves([saleIdFromDB])
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
      expect(insertIdResponse).to.be.equal(saleIdFromModel);
    });
  });

  describe('DELETE endpoint', function () {
    it('should delete a product', async function () {
      sinon.stub(connection, 'execute').resolves(deletedSaleFromDb);

      const inputId = 1;
      const responseData = await salesModel.deleteSale(inputId);
      console.log(responseData);

      expect(responseData[0].affectedRows).to.be.equal(1);
    });
  });
  afterEach(function () { return sinon.restore(); });
});