const schema = require('../knexfile');
const knex = schema.getKnex();

;(async () => {
  await knex.migrate.latest();
  process.exit(0);
})()
  .catch(err => {
    console.log(err);
    process.exit(1);
  });