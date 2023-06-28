const { expect } = require('chai');
const sinon = require('sinon');
const connection = require('../../../src/models/connection');
const { productsModel } = require('../../../src/models');
const { allProducts, productById } = require('../mocks/products.mock');

describe('The PRODUCTS MODEL LAYER', function () {
  it('should list all products', async function () {
    sinon.stub(connection, 'execute').resolves([allProducts]);

    const responseModel = await productsModel.findAll();

    expect(responseModel).to.be.deep.equal(allProducts);
    expect(responseModel).to.be.an('array');
    expect(responseModel).to.have.lengthOf(3);
  });

  it('should list product by id', async function () {
    sinon.stub(connection, 'execute').resolves([[productById]]);

    const inputId = 1;
    const responseModel = await productsModel.findById(inputId);

    expect(responseModel).to.be.deep.equal(responseModel);
    expect(responseModel).to.be.an('object');
    expect(responseModel).to.have.property('id');
  });
  afterEach(function () { return sinon.restore(); });
});