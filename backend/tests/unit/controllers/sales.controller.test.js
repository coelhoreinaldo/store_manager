const chai = require('chai');
const { expect } = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

chai.use(sinonChai);
const { allSalesFromService, salesByIdFromService, salesByIdFromServiceNotFound, allSalesFromServiceNotFound } = require('../mocks/sales.mock');
const { salesService } = require('../../../src/services');
const { salesController } = require('../../../src/controllers');

describe('The SALES CONTROLLER LAYER', function () {
  it('should list all sales', async function () {
    sinon.stub(salesService, 'findAll').resolves(allSalesFromService);

    const req = {
      params: {},
      body: {},
    };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    await salesController.findAll(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(allSalesFromService.data);
  });

  it('should list a sale by ID', async function () {
    sinon.stub(salesService, 'findById').resolves(salesByIdFromService);

    const req = {
      params: { id: 1 },
      body: {},
    };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    await salesController.findById(req, res);
    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(salesByIdFromService.data);
  });

  it('should return an error when there are no sales', async function () {
    sinon.stub(salesService, 'findAll').resolves(allSalesFromServiceNotFound);

    const req = {
      params: {},
      body: {},
    };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    await salesController.findAll(req, res);

    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).to.have.been.calledWith(allSalesFromServiceNotFound.data);
  });

  it('should return an error when the ID does not exist', async function () {
    sinon.stub(salesService, 'findById').resolves(salesByIdFromServiceNotFound);

    const req = {
      params: { id: 99 },
      body: {},
    };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    await salesController.findById(req, res);
    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).to.have.been.calledWith(salesByIdFromServiceNotFound.data);
  });

  afterEach(function () { return sinon.restore(); });
});