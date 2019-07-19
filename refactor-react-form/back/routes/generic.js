const express = require('express');
const db = require('../db');

/**
 * Send an error response
 */
const errorResponse = (res, err) => res.status(500).json({
  error: err.message,
  sql: err.sql,
});

/**
 * Send a 404 not found response
 */
const notFoundResponse = (res, message) => res.status(404).json({
  error: message,
});

/**
 * Create a "READ ALL" route handler for table
 */
const getAllHandler = table => async (req, res) => {
  try {
    const results = await db.queryAsync(
      `SELECT * FROM ${table}`,
    );
    return res.json(results);
  } catch (err) {
    return errorResponse(res, err);
  }
};

/**
 * Create a "READ ONE" route handler for table
 */
const getOneHandler = table => async (req, res) => {
  try {
    const results = await db.queryAsync(
      `SELECT * FROM ${table} WHERE id = ?`,
      req.params.id,
    );
    if (results.length === 0) {
      return notFoundResponse(res, `No record with id ${req.params.id}`);
    }
    return res.json(results[0]);
  } catch (err) {
    return errorResponse(res, err);
  }
};

/**
 * Create a "CREATE" route handler for table
 */
const createHandler = table => async (req, res) => {
  try {
    const status = await db.queryAsync(
      `INSERT INTO ${table} SET ?`,
      req.body,
    );
    const results = await db.queryAsync(
      `SELECT * FROM ${table} WHERE id = ?`,
      status.insertId,
    );
    return res.status(201).json(results[0]);
  } catch (err) {
    return errorResponse(res, err);
  }
};

/**
 * Create a "UPDATE" route handler for table
 */
const updateHandler = table => async (req, res) => {
  try {
    await db.query(
      `UPDATE ${table} SET ? WHERE id = ?`,
      [req.body, req.params.id],
    );

    const updated = await db.queryAsync(
      `SELECT * FROM ${table} WHERE id = ?`,
      req.params.id,
    );
    return res.json(updated[0]);
  } catch (err) {
    return errorResponse(res, err);
  }
};

/**
 * Create a "DELETE" route handler for table
 */
const deleteHandler = table => async (req, res) => {
  try {
    await db.queryAsync(
      `DELETE FROM ${table} WHERE id = ?`,
      req.params.id,
    );
    return res.sendStatus(204);
  } catch (err) {
    return errorResponse(res, err);
  }
};

const createRouter = (table) => {
  const router = express.Router();
  router
    .get('/', getAllHandler(table))
    .get('/:id', getOneHandler(table))
    .post('/', createHandler(table))
    .put('/:id', updateHandler(table))
    .delete('/:id', deleteHandler(table));
  return router;
};

module.exports = createRouter;
