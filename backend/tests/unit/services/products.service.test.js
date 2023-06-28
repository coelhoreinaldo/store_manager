const { expect } = require('chai');
const sinon = require('sinon');
const { productsModel } = require('../../../src/models');
const { allProductsFromModelDB, allProductsFromService, productByIdFromModelDB, productByIdFromService } = require('../mocks/products.mock');
const { productsService } = require('../../../src/services');

describe('The PRODUCTS SERVICE LAYER', function () {
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

  afterEach(function () { return sinon.restore(); });
});