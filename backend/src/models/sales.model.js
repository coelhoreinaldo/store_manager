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
  return connection.execute(query, [saleId]);
};

// const findBySaleIdAndProductId = async (saleId, productId) => {
//   const query = `SELECT DISTINCT(s.date), sp.sale_id, sp.product_id, sp.quantity 
//   FROM sales AS s INNER JOIN sales_products AS sp
//   WHERE sale_id = ? AND product_id = ?;`;
//   const [[sale]] = await connection.execute(query, [saleId, productId]);
//   return camelize(sale);
// };

const updateQuantity = async (saleId, productId, quantity) => {
  const query = 'UPDATE sales_products SET quantity = ? WHERE sale_id = ? AND product_id = ?';
  return connection.execute(query, [...Object.values(quantity), saleId, productId]);
  // const formattedObject = await findBySaleIdAndProductId(saleId, productId);
  // console.log(formattedObject);
  // return formattedObject;
};

module.exports = {
  findAll,
  findById,
  insert,
  deleteSale,
  updateQuantity,
};