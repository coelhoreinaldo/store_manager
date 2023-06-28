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

module.exports = {
  allProductsFromModelDB,
  productByIdFromModelDB,
  allProductsFromService,
  productByIdFromService,
};