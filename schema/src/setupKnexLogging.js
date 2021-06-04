const reportSQL = require('./reportSQL');
const { QUERY_ERROR, QUERY_SUCCESS } = require('./constants');

function setupKnexLogging(knex, logger) {
  const inflight_sql = {};
  return knex
    // .on('query', (querySpec) => {
    //   querySpec.start = Date.now();
    //   inflight_sql[querySpec.__knexUid] = querySpec;
    // })
    // .on('query-response', (response, querySpec, builder) => {
    //   const request = inflight_sql[querySpec.__knexUid];
    //   if (request) {
    //     delete inflight_sql[querySpec.__knexUid];
    //     reportSQL({status: QUERY_SUCCESS, querySpec: request, logger});
    //   }
    // })
    .on('query-error', (err, querySpec) => {
      const request = inflight_sql[querySpec.__knexUid];
      if (request) {
        delete inflight_sql[querySpec.__knexUid];
        reportSQL({status: QUERY_ERROR, error: err, querySpec: request, logger});
      }
    });
};

module.exports = setupKnexLogging;