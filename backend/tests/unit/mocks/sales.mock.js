const date = '2023-06-28T20:59:11.000Z';

const allSalesFromModel = [
  {
    date,
    saleId: 1,
    productId: 1,
    quantity: 5,
  },
  {
    date,
    saleId: 1,
    productId: 2,
    quantity: 10,
  },
  {
    date,
    saleId: 2,
    productId: 3,
    quantity: 15,
  },
];

const salesByIdFromModel = [
  {
    date,
    productId: 1,
    quantity: 5,
  },
  {
    date,
    productId: 2,
    quantity: 10,
  },
];

const allSalesFromService = { status: 'SUCCESSFUL', data: allSalesFromModel };
const salesByIdFromService = { status: 'SUCCESSFUL', data: salesByIdFromModel };

const allSalesFromServiceNotFound = {
  status: 'NOT_FOUND', data: { message: 'There are no sales' },
};

const saleByIdFromServiceNotFound = {
  status: 'NOT_FOUND', data: { message: 'Sale not found' },
};

module.exports = {
  allSalesFromModel,
  salesByIdFromModel,
  allSalesFromService,
  salesByIdFromService,
  allSalesFromServiceNotFound,
  saleByIdFromServiceNotFound,
};