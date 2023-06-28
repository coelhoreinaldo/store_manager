const camelize = require('camelize');
const connection = require('./connection');

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

module.exports = { findAll, findById };