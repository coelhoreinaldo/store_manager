const { expect } = require('chai');
const sinon = require('sinon');
const connection = require('../../../src/models/connection');
const { productsModel } = require('../../../src/models');
const { allProductsFromModelDB, productByIdFromModelDB, productIdFromDB, productIdFromModel } = require('../mocks/products.mock');

describe('The PRODUCTS MODEL LAYER', function () {
  describe('GET endpoint', function () {
    it('should list all products', async function () {
      sinon.stub(connection, 'execute').resolves([allProductsFromModelDB]);

      const responseModel = await productsModel.findAll();

      expect(responseModel).to.be.deep.equal(allProductsFromModelDB);
      expect(responseModel).to.be.an('array');
      expect(responseModel).to.have.lengthOf(3);
    });

    it('should list product by ID', async function () {
      sinon.stub(connection, 'execute').resolves([[productByIdFromModelDB]]);

      const inputId = 1;
      const responseModel = await productsModel.findById(inputId);

      expect(responseModel).to.be.deep.equal(responseModel);
      expect(responseModel).to.be.an('object');
      expect(responseModel).to.have.property('id');
    });
  });

  describe('POST endpoint', function () {
    it('should register a new product', async function () {
      sinon.stub(connection, 'execute').resolves([productIdFromDB]);

      const inputData = { name: 'Monitor' };
      const insertIdResponse = await productsModel.insert(inputData);

      expect(insertIdResponse).to.be.a('number');
      expect(insertIdResponse).to.be.equal(productIdFromModel);
    });
  });
  afterEach(function () { return sinon.restore(); });
});