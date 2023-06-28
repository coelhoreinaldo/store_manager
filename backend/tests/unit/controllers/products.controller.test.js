const chai = require('chai');
const { expect } = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

chai.use(sinonChai);
const { allProductsFromService, productByIdFromService, productByIdFromServiceNotFound, allProductsFromServiceNotFound } = require('../mocks/products.mock');
const { productsService } = require('../../../src/services');
const { productsController } = require('../../../src/controllers');

describe('The PRODUCTS CONTROLLER LAYER', function () {
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

  afterEach(function () { return sinon.restore(); });
});