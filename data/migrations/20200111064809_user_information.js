
exports.up = function (knex) {
    return knex.schema.createTable('user_information', tbl => {
        tbl.increments()
        //SAAS information
        tbl.enu('status', ['member', 'bronze_member', 'silver_member', 'gold_member', 'platinum_member']).defaultsTo('member')
        tbl.integer('level').defaultsTo(1)
        tbl.integer('exp').defaultsTo(0)
        tbl.integer('exp_to_lvl_up').defaultsTo(120)
        tbl.varchar('info_owner')
            .unique()
            .notNullable()
            .references('username')
            .inTable('user')
            .onDelete('CASCADE')
            .onUpdate('CASCADE')
    })
};

exports.down = function (knex) {
    return knex.schema.dropTableIfExists('user_information')
};
