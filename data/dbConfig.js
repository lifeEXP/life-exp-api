const knex = require('knex');


const config = require('../knexfile.js');

const dbEnv = process.env.DB_ENV;

const db =  knex(config[dbEnv])

module.exports = db