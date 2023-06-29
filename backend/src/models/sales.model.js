const camelize = require('camelize');
const connection = require('./connection');
const { getFormattedColumnNames,
  getFormattedPlaceholders } = require('../utils/generateFormattedQuery');

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
  const insertPromises = sales
    .map((product) => {
      const columns = getFormattedColumnNames(product);
      const placeholders = getFormattedPlaceholders(product);
      const query = `INSERT INTO sales_products (${columns}, sale_id) VALUES (${placeholders}, ?)`;
      return connection.execute(query, [...Object.values(product), saleId]);
    });
  await Promise.all(insertPromises);
};

const insert = async (sales) => {
  const query = 'INSERT INTO sales () VALUES ()';
  const [{ insertId }] = await connection.execute(query, []);
  await saveProducts(sales, insertId);

  return insertId;
};

const deleteSale = async (saleId) => {
  const query = 'DELETE FROM sales WHERE id = ?';
  console.log(await connection.execute(query, [saleId]));
  return connection.execute(query, [saleId]);
};

module.exports = { findAll, findById, insert, deleteSale };