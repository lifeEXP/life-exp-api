
exports.up = function(knex) {
  return knex.schema.createTable('expense', tbl=>{
    tbl.increments()
    tbl.varchar('name').notNullable()
    tbl.varchar('description')
    tbl.decimal('payment').notNullable()
    tbl.enu('payment_frequency', ['weekly', 'bi-weekly', 'monthly', 'annualy']).notNullable().defaultsTo('monthly')
    tbl.varchar('owner').notNullable().references('username').inTable('user').onDelete('CASCADE').onUpdate('CASCADE')
    tbl.timestamp('created_at').defaultsTo(knex.fn.now())
    tbl.timestamp('updated_last').defaultsTo(knex.fn.now())
  })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('expense')
};
