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

const salesByIdFromServiceNotFound = {
  status: 'NOT_FOUND', data: { message: 'Sale not found' },
};

const newSaleIdFromDB = { insertId: 3 };
const newSaleIdFromModel = 3;

const newSaleFromModel = [
  {
    productId: 1,
    quantity: 1,
  },
  {
    productId: 2,
    quantity: 5,
  },
];

module.exports = {
  allSalesFromModel,
  salesByIdFromModel,
  allSalesFromService,
  salesByIdFromService,
  allSalesFromServiceNotFound,
  salesByIdFromServiceNotFound,
  newSaleIdFromDB,
  newSaleIdFromModel,
  newSaleFromModel,
};