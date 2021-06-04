  // do something smart here...
  function reportSQL({status, error, querySpec, logger}) {
    const stop = Date.now();
    const time = stop - querySpec.start;
    logger.log(stop, status, querySpec.sql);
    if (querySpec.bindings) {
      logger.log(stop, status, 'Bindings:', querySpec.bindings);
    }
    if (error) {
      logger.log(stop, status, 'SQL Error:', error.message);
    }
    logger.log(stop, status, 'That took', time, 'ms');
  };

  module.exports = reportSQL;