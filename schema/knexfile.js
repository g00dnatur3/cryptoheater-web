const knexStringcase = require('knex-stringcase');

//mysql -uroot -p0987654321
//mysql -umine -pshitblackwall

const config = () => knexStringcase({
  client: 'mysql',
  connection: {
    host: 'localhost',
    //user: 'root',
    user: 'mine',
    //password: '0987654321',
    password: 'shitblackwall',
    database: 'warlock',
    timezone: 'UTC',
    dateStrings: true
  },
  useNullAsDefault: true,
  pool: { min: 0, max: 20 }
})

/**
 * Connection objects for various environments.
 */
module.exports = {
  getKnex: (logger) => require('./src/getKnex')(config(), logger)
};
