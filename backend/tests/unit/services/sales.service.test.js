const { expect } = require('chai');
const sinon = require('sinon');
const { salesModel } = require('../../../src/models');
const { allSalesFromModel, allSalesFromService, salesByIdFromModel, salesByIdFromService } = require('../mocks/sales.mock');
const { salesService } = require('../../../src/services');

describe('The SALES SERVICE LAYER', function () {
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

  afterEach(function () { return sinon.restore(); });
});