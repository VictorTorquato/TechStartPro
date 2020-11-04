
exports.up = function(knex) {
    return knex.schema.createTable('product_category', function (table) {
        table.increments('id').primary();
        table.int('product_id').notNullable();
        table.int('category_id').notNullable();
        table.foreign('product_id').references('product.id')
        table.foreign('category_id').references('category.id')
      });
};

exports.down = function(knex) {
    return knex.schema.dropTable('product_category');
};
