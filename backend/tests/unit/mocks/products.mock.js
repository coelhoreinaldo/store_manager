const allProductsFromModelDB = [
  {
    id: 1,
    name: 'Martelo de Thor',
  },
  {
    id: 2,
    name: 'Traje de encolhimento',
  },
  {
    id: 3,
    name: 'Escudo do Capitão América',
  },
];

const productByIdFromModelDB = {
  id: 1,
  name: 'Martelo de Thor',
};

const allProductsFromService = {
  status: 'SUCCESSFUL',
  data: [
    { id: 1, name: 'Martelo de Thor' },
    { id: 2, name: 'Traje de encolhimento' },
    { id: 3, name: 'Escudo do Capitão América' },
  ],
};

const productByIdFromService = { status: 'SUCCESSFUL', data: { id: 1, name: 'Martelo de Thor' } };

const allProductsFromServiceNotFound = {
  status: 'NOT_FOUND', data: { message: 'There are no products' },
};

const productByIdFromServiceNotFound = {
  status: 'NOT_FOUND', data: { message: 'Product not found' },
};

const productIdFromDB = { insertId: 4 };
const productIdFromModel = 4;

const newProductByIdFromModel = {
  id: 4,
  name: 'Monitor',
};

const productFromServiceCreated = {
  status: 'CREATED',
  data: newProductByIdFromModel,
};
// const productFromServiceInvalidValue = {
//   status: 'INVALID_VALUE',
//   data: { message: 'message' },
// };
// const productFromServiceNotFound = {
//   status: 'NOT_FOUND',
//   data: { message: 'message' },
// };
// const productFromServiceConflict = {
//   status: 'CONFLICT',
//   data: { message: 'message' },
// };
// const productFromServiceSuccessful = {
//   status: 'SUCCESSFUL',
//   data: updatedTravelFromModel,
// };

module.exports = {
  allProductsFromModelDB,
  productByIdFromModelDB,
  allProductsFromService,
  productByIdFromService,
  allProductsFromServiceNotFound,
  productByIdFromServiceNotFound,
  productIdFromDB,
  productIdFromModel,
  newProductByIdFromModel,
  productFromServiceCreated,
};