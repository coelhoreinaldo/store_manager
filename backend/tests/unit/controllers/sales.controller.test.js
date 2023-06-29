const chai = require('chai');
const { expect } = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

chai.use(sinonChai);
const { allSalesFromService, salesByIdFromService, salesByIdFromServiceNotFound, allSalesFromServiceNotFound, newSaleFromModel, saleFromServiceCreated, saleFromServiceDeleted, saleFromServiceNotFound } = require('../mocks/sales.mock');
const { salesService } = require('../../../src/services');
const { salesController } = require('../../../src/controllers');
const mapStatusHTTP = require('../../../src/utils/mapStatusToHTTP');

describe('The SALES CONTROLLER LAYER', function () {
  describe('GET endpoint', function () {
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
  });

  describe('POST endpoint', function () {
    it('should register a new sale', async function () {
      sinon.stub(salesService, 'insert').resolves(saleFromServiceCreated);

      const req = {
        params: {},
        body: newSaleFromModel,
      };

      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      };

      await salesController.insert(req, res);

      expect(res.status).to.have.been.calledWith(201);
      expect(res.json).to.have.been.calledWith(saleFromServiceCreated.data);
    });
    it('should return status 500', function () {
      const response = mapStatusHTTP('SERVIDOR');
      expect(response).to.be.equal(500);
    });
  });
  describe('DELETE endpoint', function () {
    it('should delete a sale', async function () {
      sinon.stub(salesService, 'deleteSale').resolves(saleFromServiceDeleted);

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

      await salesController.deleteSale(req, res);
      expect(res.status).to.have.been.calledWith(204);
    });
    it('should return an error if sale doesnt exists', async function () {
      sinon.stub(salesService, 'deleteSale').resolves(saleFromServiceNotFound);

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

      await salesController.deleteSale(req, res);
      expect(res.status).to.have.been.calledWith(404);
      expect(res.json).to.have.been.calledWith({ message: 'message' });
    });
  });

  afterEach(function () { return sinon.restore(); });
});