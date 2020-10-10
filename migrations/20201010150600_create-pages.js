exports.up = knex => 
    knex.schema.createTable('pages', table => {
        table.string('page_name').primary();

        table.jsonb('page_data').default('{}');
    });

exports.down = knex => knex.schema.dropTable('pages');