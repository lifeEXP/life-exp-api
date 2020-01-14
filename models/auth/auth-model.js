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
function find() {
    return db('user as u')
        .join('user_information as i', 'i.info_owner', '=', 'u.username')
        .select(
            'u.id', 'u.username', 'u.email',
            'i.level', 'i.exp','i.exp_to_lvl_up',
        )
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