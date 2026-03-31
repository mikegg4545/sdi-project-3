exports.up = function (knex) {
  return knex.schema.createTable("assets", (table) => {
    table.increments("id").primary();
    table.string("name").notNullable();
    table.string("symbol").notNullable();
    table.string("category").notNullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("assets");
};
