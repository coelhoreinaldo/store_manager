const { expect } = require('chai');
const sinon = require('sinon');
const connection = require('../../../src/models/connection');
const { salesModel } = require('../../../src/models');
const { allSalesFromModel, salesByIdFromModel } = require('../mocks/sales.mock');

describe('The SALES MODEL LAYER', function () {
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

  afterEach(function () { return sinon.restore(); });
});