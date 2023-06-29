const { expect } = require('chai');
const sinon = require('sinon');
const { productsModel } = require('../../../src/models');
const { allProductsFromModelDB, allProductsFromService, productByIdFromModelDB, productByIdFromService, productIdFromModel, newProductByIdFromModel, updatedProductFromDB, updatedProductFromModel } = require('../mocks/products.mock');
const { productsService } = require('../../../src/services');

describe('The PRODUCTS SERVICE LAYER', function () {
  describe('GET endpoint', function () {
    it('should list all products', async function () {
      sinon.stub(productsModel, 'findAll').resolves(allProductsFromModelDB);

      const responseService = await productsService.findAll();

      expect(responseService).to.be.an('object');
      expect(responseService.data).to.be.deep.equal(allProductsFromService.data);
      expect(responseService.status).to.be.equal(allProductsFromService.status);
    });

    it('should list a product by ID', async function () {
      sinon.stub(productsModel, 'findById').resolves(productByIdFromModelDB);

      const inputId = 1;
      const responseService = await productsService.findById(inputId);

      expect(responseService).to.be.an('object');
      expect(responseService.data).to.be.deep.equal(productByIdFromService.data);
      expect(responseService.status).to.be.equal(productByIdFromService.status);
    });

    it('should return a error when there are no products', async function () {
      sinon.stub(productsModel, 'findAll').resolves(undefined);

      const responseService = await productsService.findAll();
      expect(responseService).to.be.an('object');
      expect(responseService.data).to.be.deep.equal({ message: 'There are no products' });
    });

    it('should return an error when the ID does not exist', async function () {
      sinon.stub(productsModel, 'findById').resolves(undefined);

      const responseService = await productsService.findById(99);

      expect(responseService).to.be.an('object');
      expect(responseService.data).to.be.deep.equal({ message: 'Product not found' });
    });
  });

  describe('POST endpoint', function () {
    it('should register a new product', async function () {
      sinon.stub(productsModel, 'insert').resolves(productIdFromModel);
      sinon.stub(productsModel, 'findById').resolves(newProductByIdFromModel);

      const inputData = { name: 'Monitor' };
      const insertIdResponse = await productsService.insert(inputData);

      expect(insertIdResponse.status).to.be.equal('CREATED');
      expect(insertIdResponse.data).to.be.equal(newProductByIdFromModel);
    });

    it('should return a error when given a name with less than 5 characters', async function () {
      const inputData = { name: 'sol' };

      const responseService = await productsService.insert(inputData);

      expect(responseService.status).to.be.equal('INVALID_VALUE');
      expect(responseService.data).to.be.deep.equal({ message: '"name" length must be at least 5 characters long' });
    });
  });

  describe('PUT endpoint', function () {
    it('should edit data of an existent product', async function () {
      sinon.stub(productsModel, 'findById').onFirstCall().resolves(productByIdFromModelDB)
        .onSecondCall()
        .resolves(updatedProductFromModel);
      sinon.stub(productsModel, 'update').resolves(updatedProductFromDB);

      const inputData = { name: 'Bola de futebol' };
      const paramsId = 1;
      const responseService = await productsService.update(paramsId, inputData);

      expect(responseService.status).to.be.equal('SUCCESSFUL');
      expect(responseService.data).to.be.equal(updatedProductFromModel);
    });
    it('should return an error if product doesnt exists', async function () {
      sinon.stub(productsModel, 'findById').resolves(undefined);

      const inputData = { name: 'Bola de futebol' };
      const paramsId = 44;
      const responseService = await productsService.update(paramsId, inputData);

      expect(responseService.status).to.be.equal('NOT_FOUND');
    });

    it('should return an error when fields are not completed', async function () {
      sinon.stub(productsModel, 'findById').resolves(productByIdFromModelDB);

      const inputData = { name: '' };
      const paramsId = 1;
      const responseService = await productsService.update(paramsId, inputData);

      expect(responseService.status).to.be.equal('INVALID_VALUE');
      expect(responseService.data).to.be.deep.equal({ message: '"name" is not allowed to be empty' });
    });
  });

  afterEach(function () { return sinon.restore(); });
});