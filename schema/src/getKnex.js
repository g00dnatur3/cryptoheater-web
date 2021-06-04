
const setupKnexLogging = require('./setupKnexLogging');  
const KNEX = require('knex');
  
/**
 * Returns a knex connection object based on environment.
 *
 * @param {object?} config kinex config
 * @param {Object?} logger object with a 'log' method for sql query logging
 * @return {knex} knex connection object
 */
function getKnex(config, logger) {
  const log = logger || { log: console.log.bind(console) };
  const knex = KNEX(config);
  return setupKnexLogging(knex, log);
};

module.exports = getKnex;
