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

const saleIdFromDB = { insertId: 3 };
const saleIdFromModel = 3;

const newSaleFromModel = [
  {
    productId: 1,
    quantity: 1,
  },
  {
    productId: 2,
    quantity: 2,
  },
];

const newSaleFromService = {
  id: 3,
  itemsSold: [
    {
      productId: 1,
      quantity: 1,
    },
    {
      productId: 2,
      quantity: 2,
    },
  ],
};

const saleFromServiceCreated = {
  status: 'CREATED',
  data: newSaleFromService,
};

const deletedSaleFromDb = [
  {
    fieldCount: 0,
    affectedRows: 1,
    insertId: 0,
    info: '',
    serverStatus: 2,
    warningStatus: 0,
  },
  undefined,
];

const saleFromServiceDeleted = {
  status: 'DELETED',
  data: { message: 'message' },
};

const saleFromServiceNotFound = {
  status: 'NOT_FOUND',
  data: { message: 'message' },
};

const updatedSaleFromDb = [
  {
    fieldCount: 0,
    affectedRows: 1,
    insertId: 0,
    info: 'Rows matched: 1  Changed: 1  Warnings: 0',
    serverStatus: 2,
    warningStatus: 0,
    changedRows: 1,
  },
  undefined,
];

const updatedSaleFromModel = {
  date,
  saleId: 1,
  productId: 2,
  quantity: 4,
};

const allSalesUpdatedFromModel = [
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
    quantity: 4,
  },
  {
    date,
    saleId: 2,
    productId: 3,
    quantity: 15,
  },
];

const saleFromServiceSuccessful = {
  status: 'SUCCESSFUL',
  data: updatedSaleFromModel,
};

module.exports = {
  allSalesFromModel,
  salesByIdFromModel,
  allSalesFromService,
  salesByIdFromService,
  allSalesFromServiceNotFound,
  salesByIdFromServiceNotFound,
  saleIdFromDB,
  saleIdFromModel,
  newSaleFromModel,
  newSaleFromService,
  saleFromServiceCreated,
  deletedSaleFromDb,
  saleFromServiceDeleted,
  saleFromServiceNotFound,
  updatedSaleFromDb,
  updatedSaleFromModel,
  allSalesUpdatedFromModel,
  saleFromServiceSuccessful,
};