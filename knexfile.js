module.exports = {
  development: {
    client: 'sqlite3',
    connection: {
      filename: './data/lfexp.db3'
    },
    useNullAsDefault:true,
    migrations:{
      directory:'./data/migrations'
    },
    seeds:{
      directory:'./data/seeds'
    },
    pool:{
      afterCreate:(conn,done)=>{
        conn.run('PRAGMA foreign_keys = ON', done);
      }
    }
  },
  testing: {
    client: 'sqlite3',
    connection: {
      filename: './data/_test_/test.db3'
    },
    useNullAsDefault:true,
    migrations:{
      directory:'./data/_test_/migrations'
    },
    seeds:{
      directory:'./data/_test_/seeds'
    },
    pool:{
      afterCreate:(conn,done)=>{
        conn.run('PRAGMA foreign_keys = ON', done);
      }
    }
  }

};
