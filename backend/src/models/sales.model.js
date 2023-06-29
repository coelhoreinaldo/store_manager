const camelize = require('camelize');
const connection = require('./connection');
// const { getFormattedColumnNames,
// getFormattedPlaceholders } = require('../utils/generateFormattedQuery');

const findAll = async () => {
  const query = `SELECT s.date, sp.* FROM sales_products AS sp 
  INNER JOIN sales AS s ON sp.sale_id = s.id
  ORDER BY sp.sale_id, sp.product_id;`;
  const [sales] = await connection.execute(query);
  return camelize(sales);
};

const findById = async (saleId) => {
  const query = `SELECT s.date, sp.product_id, sp.quantity FROM sales AS s 
  INNER JOIN sales_products AS sp ON s.id = sp.sale_id
  WHERE s.id = ?
  ORDER BY sp.sale_id, sp.product_id;`;
  const [sales] = await connection.execute(query, [saleId]);

  return camelize(sales);
};

const saveProducts = async (sales, saleId) => {
  console.log(sales);
  const query = 'INSERT INTO sales_products (product_id, quantity, sale_id) VALUES (?, ?, ?)';
  const insertPromises = sales
    .map((product) => connection.execute(query, [product.productId, product.quantity, saleId]));
  await Promise.all(insertPromises);
};

const insert = async (sales) => {
  const query = 'INSERT INTO sales () VALUES ()';
  const [{ insertId }] = await connection.execute(query, []);
  await saveProducts(sales, insertId);

  return insertId;
};

// const vaiChegarAssim = [
//   {
//     productId: 1,
//     quantity: 1,
//   },
//   {
//     productId: 2,
//     quantity: 5,
//   },
// ];

module.exports = { findAll, findById, insert };