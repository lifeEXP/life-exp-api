const db = require('../../data/dbConfig')

module.exports = {
    addExp,
    addInfo
}

async function addExp(info_owner, exp_amount) {
    return db('user_information').where({ info_owner }).first()
        .then((_info) => {

            var level_up = false
            
            function exp_requiredToLVL(exp_to_lvl_up, cur_lvl) {
                if (cur_lvl === 1) {
                    cur_lvl = 2
                }
                return ((100 + (exp_to_lvl_up / 5)) * cur_lvl)
            }


            if (_info.exp + exp_amount >= _info.exp_to_lvl_up) {
                console.log('LEVEL UP!')
                level_up = true
            }

            console.log('previous exp: ', _info.exp)
            const newExp = {
                ..._info,
                exp: level_up ? 0 : _info.exp + exp_amount,
                level: level_up ? _info.level + 1 : _info.level,
                exp_to_lvl_up: level_up ? Math.floor(exp_requiredToLVL(_info.exp_to_lvl_up, _info.level)) : _info.exp_to_lvl_up

            }
         
            level_up = false
            return db('user_information').update(newExp)
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