
exports.up = function(knex) {
  return knex.schema.createTable('income', tbl=>{
      tbl.increments()
      tbl.varchar('title').notNullable()
      tbl.varchar('description')
      tbl.decimal('pay_per_hour').notNullable()
      tbl.decimal('hours_worked_per_week').notNullable()
      tbl.varchar('owner').notNullable().references('username').inTable('user').onDelete('CASCADE').onDelete('CASCADE')
      tbl.timestamp('created_at').defaultsTo(knex.fn.now())
      tbl.timestamp('updated_last').defaultsTo(knex.fn.now())
  })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('income')
};
