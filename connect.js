const sqlite3 = require('sqlite3').verbose();

const users_schema = require('./users_schema');

console.log('users_schema', users_schema);

module.exports = (data, callback) => {
  const db = new sqlite3.Database('./sample.db', (err) => {
    if (err) {
      console.error(err.message);
    }
    else { 
      db.serialize(() => {
        db.run(`CREATE TABLE IF NOT EXISTS users(${ users_schema })`, (err) => {
          if (err) {
            console.error('A:', err);
          } 
          else {
            let columns;
            let values = '';
            data.forEach((row, i) => {
              const rowStr = `'${ row.join(`', '`) }'`;
              if (i === 0) {
                columns = rowStr;
              } 
              else if (i === data.length - 1){
                values += `(${rowStr})`
              }
              else {
                values += `(${rowStr}), `
              }
            });
            db.run(
              `INSERT OR IGNORE INTO users (${ columns }) VALUES ${ values }`,
              (err) => {
                if (err) {
                  console.error('B:', err);
                  console.log('VALUES', values)
                }  
                else {
                  console.log('Succcesfully instered');
                }
              } 
            );
            db.all('SELECT * FROM users', (err, users) => {
              callback(users);
            });
            db.close((err) => {
              if (err) {
                console.error(err.message);
              }
              else {
                console.log('Close the database connection.');
              }
            })
          }
        });
      });
    }
  });
};
