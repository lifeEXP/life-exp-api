
exports.up = function (knex) {
    return knex.schema.createTable('user', tbl => {
        tbl.increments()
        //AUTH information
        tbl.varchar('email', 255)
            .notNullable()
            .unique()
        tbl.varchar('username', 255)
            .notNullable()
            .unique()
        tbl.varchar('password', 255)
            .notNullable()
       
        //DB information
        tbl.timestamp('created_at').defaultsTo(knex.fn.now())
        tbl.timestamp('updated_last').defaultsTo(knex.fn.now())
    })
};

exports.down = function (knex) {
    return knex.schema.dropTableIfExists('user')
};
