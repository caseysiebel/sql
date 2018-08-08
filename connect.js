const sqlite3 = require('sqlite3').verbose();

const users_schema = "'First Name', 'Last Name', 'Middle Initial', 'Email', 'Street Address', 'Zip Code', 'Joined Date', 'UUID'";

let columns;

module.exports = (data) => {
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
            console.log('Created the table or it exists');
            data.forEach((row, i) => {
              const rowStr = `'${ row.join(`', '`) }'`;
              if (i === 0) {
                columns = rowStr;
              } 
              else {
                db.run(
                  `INSERT INTO users (${ columns }) VALUES (${ rowStr })`,
                  (err) => {
                    if (err) {
                      console.error(err);
                    }  
                    else {
                      console.log('Succcesfully instered');
                    }
                  } 
                );
              }
            });
            db.all('SELECT * FROM users', (err, data) => {
              console.log('');
              console.log('SELECT *', data);
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
