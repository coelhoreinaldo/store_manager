const chai = require('chai');
const { expect } = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

chai.use(sinonChai);
const { allProductsFromService, productByIdFromService, productByIdFromServiceNotFound, allProductsFromServiceNotFound, newProductByIdFromModel, productFromServiceCreated, productFromServiceSuccessful, productFromServiceDeleted, productFromServiceNotFound } = require('../mocks/products.mock');
const { productsService } = require('../../../src/services');
const { productsController } = require('../../../src/controllers');

describe('The PRODUCTS CONTROLLER LAYER', function () {
  describe('GET endpoint', function () {
    it('should list all products', async function () {
      sinon.stub(productsService, 'findAll').resolves(allProductsFromService);

      const req = {
        params: {},
        body: {},
      };
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      };

      await productsController.findAll(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(allProductsFromService.data);
    });

    it('should list a product by ID', async function () {
      sinon.stub(productsService, 'findById').resolves(productByIdFromService);

      const req = {
        params: { id: 1 },
        body: {},
      };
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      };

      await productsController.findById(req, res);
      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(productByIdFromService.data);
    });

    it('should return an error when there are no products', async function () {
      sinon.stub(productsService, 'findAll').resolves(allProductsFromServiceNotFound);

      const req = {
        params: {},
        body: {},
      };
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      };

      await productsController.findAll(req, res);

      expect(res.status).to.have.been.calledWith(404);
      expect(res.json).to.have.been.calledWith(allProductsFromServiceNotFound.data);
    });

    it('should return an error when the ID does not exist', async function () {
      sinon.stub(productsService, 'findById').resolves(productByIdFromServiceNotFound);

      const req = {
        params: { id: 99 },
        body: {},
      };
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      };

      await productsController.findById(req, res);
      expect(res.status).to.have.been.calledWith(404);
      expect(res.json).to.have.been.calledWith(productByIdFromServiceNotFound.data);
    });
  });

  describe('POST endpoint', function () {
    it('should register a new product', async function () {
      sinon.stub(productsService, 'insert').resolves(productFromServiceCreated);

      const req = {
        params: {},
        body: { name: 'Monitor' },
      };

      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      };

      await productsController.insert(req, res);

      expect(res.status).to.have.been.calledWith(201);
      expect(res.json).to.have.been.calledWith(newProductByIdFromModel);
    });
  });
  describe('PUT endpoint', function () {
    it('should edit data of an existent product', async function () {
      sinon.stub(productsService, 'update').resolves(productFromServiceSuccessful);

      const inputData = { name: 'Bola de futebol' };
      const id = 1;
      const req = {
        params: { id },
        body: { inputData },
      };

      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      };

      await productsController.update(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(productFromServiceSuccessful.data);
    });
  });
  describe('DELETE endpoint', function () {
    it('should delete a product', async function () {
      sinon.stub(productsService, 'deleteProduct').resolves(productFromServiceDeleted);

      const id = 1;

      const req = {
        params: { id },
        body: {},
      };

      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
        end: sinon.stub(),
      };

      await productsController.deleteProduct(req, res);
      expect(res.status).to.have.been.calledWith(204);
    });
    it('should return an error if product doesnt exists', async function () {
      sinon.stub(productsService, 'deleteProduct').resolves(productFromServiceNotFound);

      const id = 99;

      const req = {
        params: { id },
        body: {},
      };

      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
        end: sinon.stub(),
      };

      await productsController.deleteProduct(req, res);
      expect(res.status).to.have.been.calledWith(404);
      expect(res.json).to.have.been.calledWith({ message: 'message' });
    });
  });
  afterEach(function () { return sinon.restore(); });
});