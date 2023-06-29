const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');

const app = require('../../src/app');
const connection = require('../../src/models/connection');
const { productByIdFromModelDB } = require('../unit/mocks/products.mock');

const { expect, use } = chai;

use(chaiHttp);

describe('Products ENDPOINTS', function () {
  it('should list all products at GET /products', async function () {
    sinon.stub(connection, 'execute').resolves([[productByIdFromModelDB]]);
    const response = await chai
      .request(app)
      .get('/products/1');

    expect(response.status).to.equal(200);
    expect(response.body).to.deep.equal(productByIdFromModelDB);
  });
  afterEach(sinon.restore);
});