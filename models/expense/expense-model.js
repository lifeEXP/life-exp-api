const db = require('../../data/dbConfig')

module.exports = {
find, findBy, findById, add, remove, update
}

function find() {
    return db('expense')
}

// find by either the expense owner or find by the title of the expense..
// allows for searching of expenses if there are a ton..
function findBy(owner) {
    return db('expense as e')
    .where({ owner })
    .select('e.id','e.name', 'e.payment','e.description', 'e.owner')
}

//returns the select expense for a better look at it later or for updating..
//or for returning the given updated item to add it back to store...
function findById(id) {
    return db('expense').where({ id }).first()
}

//adds and returns the item.. to simplfy the front end calculations and state Management
async function add(expense) {
    //await on a response from the add to the database.. we expect that it give us an id..
    const [id] = await db('expense').insert(expense)
    //find it and return it
    return findById(id)
}

//remove the tartet expense... for some reason we need it to dissapear.. so bye bye
async function remove(id) {
    return db('expense').del().where({ id })
}

async function update(id, changes) {
    return db('expense').where({ id }).update(changes)
}
