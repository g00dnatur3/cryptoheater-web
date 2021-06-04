const TABLES = require('../tables');

const createPageCacheTable = async (knex) => (
  !(await knex.schema.hasTable(TABLES.PAGE_CACHE)) &&
  knex.schema.createTable(TABLES.PAGE_CACHE, table => {
    // config
    table.engine("InnoDB");
    table.charset("utf8mb4");
    table.collate("utf8mb4_unicode_ci");
    // columns
    table.increments('id').primary();
    table.string('url', 256).notNull();
    table.text('results_json').notNull();
    // index
    table.unique(['url']);
  })
);

const createBadLinksTable = async (knex) => (
  !(await knex.schema.hasTable(TABLES.BAD_LINKS)) &&
  knex.schema.createTable(TABLES.BAD_LINKS, table => {
    // config
    table.engine("InnoDB");
    table.charset("utf8mb4");
    table.collate("utf8mb4_unicode_ci");
    // columns
    table.increments('id').primary();
    table.string('magnet_link_hash', 64).notNull();
    table.integer('retries').unsigned().defaultTo(0)
    // index
    table.unique(['magnet_link_hash']);
  })
);

const createVideosTable = async (knex) => (
  !(await knex.schema.hasTable(TABLES.VIDEOS)) &&
  knex.schema.createTable(TABLES.VIDEOS, table => {
    // config
    table.engine("InnoDB");
    table.charset("utf8mb4");
    table.collate("utf8mb4_unicode_ci");
    // columns
    table.increments('id').primary();
    table.string('magnet_link', 4096).notNull();
    table.string('magnet_link_hash', 64).notNull();
    table.integer('seeders').unsigned().notNull();
    table.integer('leechers').unsigned().notNull();
    table.string('codecs', 256).notNull();
    table.string('name', 128).notNull();
    table.string('name_search', 128).notNull();
    table.integer('size').unsigned().notNull();
    table.integer('width').unsigned().notNull();
    table.integer('height').unsigned().notNull();
    table.text('screenshot');
    // index
    table.index(['magnet_link_hash']);
    table.index(['magnet_link_hash', 'name_search']);
    table.index(['seeders']);
    table.index(['codecs']);
    table.index(['name_search']);
    table.unique(['name', 'magnet_link_hash']);
  })
);

const createUsersTable = async (knex) => (
  !(await knex.schema.hasTable(TABLES.USERS)) &&
  knex.schema.createTable(TABLES.USERS, table => {
    // config
    table.engine("InnoDB");
    table.charset("utf8mb4");
    table.collate("utf8mb4_unicode_ci");
    // columns
    table.increments('id').primary();
    table.string('email', 64)
    table.string('mobile', 16)
    table.string('password', 64).notNullable();
    table.boolean('is_mobile_verified').defaultTo(false)
    table.boolean('is_email_verified').defaultTo(false)
    // table.string('country', 32);
    // table.string('region', 32);
    // table.string('account_type', 16);
    // index
    table.unique(['email']);
    table.unique(['mobile']);
    // crud times
    table.datetime('create_time').defaultTo(knex.fn.now());
    table.datetime('delete_time')
  })
);

const createVerificationsTable = async (knex) => (
  !(await knex.schema.hasTable(TABLES.VERIFICATIONS)) &&
  knex.schema.createTable(TABLES.VERIFICATIONS, table => {
    // config
    table.engine("InnoDB");
    table.charset("utf8mb4");
    table.collate("utf8mb4_unicode_ci");
    // columns
    table.increments('id').primary();
    table.integer('user_id').unsigned().references('id').inTable(TABLES.USERS).notNull();
    table.boolean('is_mobile').notNull();
    table.boolean('is_email').notNull();
    table.datetime('expire_time').notNull();
    table.datetime('send_time').defaultTo(knex.fn.now());
    table.string('verification_code').notNull();
    // index
    // crud times
    table.datetime('create_time').defaultTo(knex.fn.now());
    table.datetime('delete_time')
  })
);

exports.up = async (knex) => {
  await createUsersTable(knex);
  await createVerificationsTable(knex);
  await createVideosTable(knex);
  await createBadLinksTable(knex);
  await createPageCacheTable(knex);
};

exports.down = knex => {
  return Promise.resolve(true);
  // Probably don't ever want to do this :)
  /*
  return knex.schema
    .dropTable("clientperf_budgets")
  */
};