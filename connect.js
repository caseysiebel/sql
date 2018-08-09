const sqlite3 = require('sqlite3').verbose();

const users_schema = "'First Name' TEXT, 'Last Name' TEXT, 'Middle Initial' CHARACTER, 'Email' TEXT, 'Street Address' TEXT, 'Zip Code' TEXT, 'Joined Date' TEXT, 'UUID' INTEGER PRIMARY KEY";

let columns;

module.exports = (data, callback) => {
  const db = new sqlite3.Database('./sample.db', (err) => {
    if (err) {
      console.error(err.message);
    }
    else { 
      db.serialize(() => {
        db.run(`CREATE TABLE IF NOT EXISTS users(${ users_schema })`, (err) => {
          if (err) {
            console.error(err);
          } 
          else {
            let values = '';
            data.forEach((row, i) => {
              const rowStr = `'${ row.join(`', '`) }'`;
              if (i === 0) {
                columns = rowStr;
              } 
              else if (i === data.length - 2){
                values += `(${rowStr}), `
              }
              else {
                values += `(${rowStr})`
              }
            });
            db.run(
              `REPLACE INTO users (${ columns }) VALUES ${ values }`,
              (err) => {
                if (err) {
                  console.error(err);
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
