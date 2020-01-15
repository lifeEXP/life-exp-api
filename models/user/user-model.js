const db = require('../../data/dbConfig')

module.exports = {
    addExp,
    addInfo
}

async function addExp(info_owner, exp_amount) {
    return db('user_information').where({ info_owner }).first()
        .then((_info) => {
            console.log('********************************=>', _info)
            var level_up = false

            function exp_requiredToLVL(exp_to_lvl_up, cur_lvl) {
                if (cur_lvl === 1) {
                    cur_lvl = 2
                }
                return ((100 + (exp_to_lvl_up / 5)) * cur_lvl)
            }

            const amm_req = _info.exp + exp_amount
            let rem = 0
            if (amm_req >= _info.exp_to_lvl_up) {
                console.log(amm_req)
                console.log('LEVEL UP!')
                level_up = true
                rem = amm_req - _info.exp_to_lvl_up
            }

            const newExp = {
                // ..._info,
                exp: level_up ? (0 + amm_req) : _info.exp + exp_amount,
                level: level_up ? _info.level + 1 : _info.level,
                exp_to_lvl_up: level_up ? Math.floor(exp_requiredToLVL(_info.exp_to_lvl_up, _info.level)) : _info.exp_to_lvl_up

            }
            console.log(':: exp: ', newExp.exp)
            console.log('::: ', newExp.exp)

            level_up = false
            return db('user_information').update(newExp).where({info_owner})
        })
}

// this is a really hacky way to add a info flag to all 
// users as they are created... 
async function addInfo(username) {
    const newUser = {
        info_owner: username
    }
    return db('user_information').insert(newUser)
    // return findById(id)
}