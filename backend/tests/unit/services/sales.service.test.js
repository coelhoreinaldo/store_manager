const { expect } = require('chai');
const sinon = require('sinon');
const { salesModel, productsModel } = require('../../../src/models');
const { allSalesFromModel, allSalesFromService, salesByIdFromModel, salesByIdFromService, saleIdFromModel, newSaleFromService, deletedSaleFromDb, updatedSaleFromDb, allSalesUpdatedFromModel, updatedSaleFromModel } = require('../mocks/sales.mock');
const { salesService } = require('../../../src/services');
const { allProductsFromService } = require('../mocks/products.mock');

describe('The SALES SERVICE LAYER', function () {
  describe('GET endpoint', function () {
    it('should list all sales', async function () {
      sinon.stub(salesModel, 'findAll').resolves(allSalesFromModel);

      const responseService = await salesService.findAll();

      expect(responseService).to.be.an('object');
      expect(responseService.data).to.be.deep.equal(allSalesFromService.data);
      expect(responseService.status).to.be.equal(allSalesFromService.status);
    });

    it('should list a sale by ID', async function () {
      sinon.stub(salesModel, 'findById').resolves(salesByIdFromModel);

      const inputId = 1;
      const responseService = await salesService.findById(inputId);

      expect(responseService).to.be.an('object');
      expect(responseService.data).to.be.deep.equal(salesByIdFromService.data);
      expect(responseService.status).to.be.equal(salesByIdFromService.status);
    });

    it('should return a error when there are no sales', async function () {
      sinon.stub(salesModel, 'findAll').resolves(undefined);

      const responseService = await salesService.findAll();
      expect(responseService).to.be.an('object');
      expect(responseService.data).to.be.deep.equal({ message: 'There are no sales' });
    });

    it('should return an error when the ID does not exist', async function () {
      sinon.stub(salesModel, 'findById').resolves([]);

      const responseService = await salesService.findById(99);

      expect(responseService).to.be.an('object');
      expect(responseService.data).to.be.deep.equal({ message: 'Sale not found' });
    });
  });
  describe('POST endpoint', function () {
    it('should register a new sale', async function () {
      sinon.stub(productsModel, 'findById')
        .onFirstCall()
        .resolves(allProductsFromService.data[0])
        .onSecondCall()
        .resolves(allProductsFromService.data[1]);

      sinon.stub(salesModel, 'insert').resolves(saleIdFromModel);

      const inputData = [
        { productId: 1, quantity: 1 },
        { productId: 2, quantity: 2 },
      ];

      const insertIdResponse = await salesService.insert(inputData);

      expect(insertIdResponse.status).to.be.equal('CREATED');
      expect(insertIdResponse.data).to.be.deep.equal(newSaleFromService);
    });

    it('should return an error when ID does not exist', async function () {
      sinon.stub(productsModel, 'findById')
        .onFirstCall()
        .resolves(undefined)
        .onSecondCall()
        .resolves(allProductsFromService.data[1]);
      const inputData = [
        { productId: 99, quantity: 1 },
        { productId: 2, quantity: 2 },
      ];

      const responseService = await salesService.insert(inputData);

      expect(responseService.status).to.be.equal('NOT_FOUND');
      expect(responseService.data).to.be.deep.equal({ message: 'Product not found' });
    });

    it('should return an error when fields are not completed', async function () {
      const inputData = [
        { productId: 1, quantity: -1 },
        { productId: 2, quantity: 2 },
      ];

      const responseService = await salesService.insert(inputData);

      expect(responseService.status).to.be.equal('INVALID_VALUE');
      expect(responseService.data).to.be.deep.equal({ message: '"quantity" must be greater than or equal to 1' });
    });
  });
  describe('DELETE endpoint', function () {
    it('should delete a sale', async function () {
      sinon.stub(salesModel, 'findById').resolves(salesByIdFromModel);
      sinon.stub(salesModel, 'deleteSale').resolves(deletedSaleFromDb);

      const id = 1;
      const serviceData = await salesService.deleteSale(id);

      expect(serviceData.status).to.be.equal('DELETED');
    });
    it('should return an error if sale doesnt exists', async function () {
      sinon.stub(salesModel, 'findById').resolves([]);

      const id = 1;
      const serviceData = await salesService.deleteSale(id);

      expect(serviceData.status).to.be.equal('NOT_FOUND');
    });
  });

  describe('PUT endpoint', function () {
    it('should edit a sale\'s quantity', async function () {
      sinon.stub(salesModel, 'findById').resolves(salesByIdFromModel);
      sinon.stub(salesModel, 'updateQuantity').resolves(updatedSaleFromDb);
      sinon.stub(salesModel, 'findAll').resolves(allSalesUpdatedFromModel);

      const saleId = 1;
      const productId = 2;
      const quantity = { quantity: 4 };

      const responseService = await salesService.updateQuantity(saleId, productId, quantity);

      expect(responseService.status).to.be.equal('SUCCESSFUL');
      expect(responseService.data).to.be.deep.equal(updatedSaleFromModel);
    });

    it('should return a error if quantity is invalid', async function () {
      const saleId = 1;
      const productId = 2;
      const quantity = { quantity: 0 };

      const responseService = await salesService.updateQuantity(saleId, productId, quantity);

      expect(responseService.status).to.be.equal('INVALID_VALUE');
      expect(responseService.data).to.be.deep.equal({ message: '"quantity" must be greater than or equal to 1' });
    });
    it('should return a error if sale doesnt exist', async function () {
      sinon.stub(salesModel, 'findById').resolves([]);

      const saleId = 99;
      const productId = 2;
      const quantity = { quantity: 4 };

      const responseService = await salesService.updateQuantity(saleId, productId, quantity);

      expect(responseService.status).to.be.equal('NOT_FOUND');
      expect(responseService.data).to.be.deep.equal({ message: 'Sale not found' });
    });
    it('should return a error if product doesnt exist on sale', async function () {
      sinon.stub(salesModel, 'findById').resolves(salesByIdFromModel);

      const saleId = 1;
      const productId = 44;
      const quantity = { quantity: 4 };

      const responseService = await salesService.updateQuantity(saleId, productId, quantity);

      expect(responseService.status).to.be.equal('NOT_FOUND');
      expect(responseService.data).to.be.deep.equal({ message: 'Product not found in sale' });
    });
  });

  afterEach(function () { return sinon.restore(); });
});