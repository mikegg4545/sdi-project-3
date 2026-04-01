exports.up = function (knex) {
  return knex.schema.alterTable("assets", (table) => {
    table
      .integer("category_id")
      .unsigned()
      .references("id")
      .inTable("categories")
      .onDelete("CASCADE");
  });
};

exports.down = function (knex) {
  return knex.schema.alterTable("assets", (table) => {
    table.dropColumn("category_id");
  });
};
