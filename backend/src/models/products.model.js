const camelize = require('camelize');
const connection = require('./connection');
const { getFormattedColumnNames,
  getFormattedPlaceholders,
  getFormattedUpdateColumns } = require('../utils/generateFormattedQuery');

const findAll = async () => {
  const [products] = await connection.execute('SELECT * FROM products ORDER BY id');
  return camelize(products);
};

const findById = async (productId) => {
  const [[product]] = await connection.execute('SELECT * FROM products WHERE id = ?', [productId]);
  return camelize(product);
};

const insert = async (product) => {
  const columns = getFormattedColumnNames(product);
  const placeholders = getFormattedPlaceholders(product);
  const query = `INSERT INTO products (${columns}) VALUE (${placeholders})`;
  const [{ insertId }] = await connection.execute(query, [...Object.values(product)]);

  return insertId;
};

const update = async (productId, product) => {
  const columns = getFormattedUpdateColumns(product);
  const query = `UPDATE products SET ${columns} WHERE id = ?;`;
  return connection.execute(query, [...Object.values(product), productId]);
};

module.exports = { findAll, findById, insert, update };