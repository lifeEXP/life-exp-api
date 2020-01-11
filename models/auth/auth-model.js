const db = require('../../data/dbConfig')

module.exports = {
    find,
    findBy,
    findById,
    remove,
    update,
    add
}

//finds all users in the database...
//IS_SENSITIVE --- !!! DO NOT USE FOR AUTH
function find() {
    return db('user').select('id', 'username', 'email', 'EXP')
}
//finds user by either username or email
//use for auth 
function findBy(filter) {
    return db('user').where(function () {
        this
            .where({ username: filter })
            .orWhere({ email: filter })
    }).first()
}

function findById(id) {
    return db('user').where({ id }).first()
}

async function add(user) {
    const [id] = await db('user').insert(user)

    return findById(id)
}

async function remove(id) {
    const [_id] = await db('user').where({ id }).del()
    return findById(_id)
}
//UPDATE will allow the user to update his/her personal profile with the 
async function update(id, changes) {
    const [_id] = await db('user').where({ id }).update(changes)
    return findById(_id)
}