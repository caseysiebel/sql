const sqlite3 = require('sqlite3').verbose();

//let db = new sqlite3.Database('sample.db', sqlite3.OPEN_READWRITE, (err) => {
let db = new sqlite3.Database('./sample.db', /*sqlite3.OPEN_READWRITE,*/ (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Connected to the database.');
});

const users_schema = "'First Name', 'Last Name', 'Middle Initial', 'Email', 'Street Address', 'Zip Code', 'Joined Date', 'UUID'";

module.exports = (data) => {
  db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS users(${ users_schema })`, (err) => {
      if (err) {
        console.error(err);
      } 
      else {
        console.log('Created the table or it exists');
      }
    });

    data.forEach((row) => {
      db.run(
        `INSERT INTO users (${ users_schema }) VALUES ($first, $last, $middle, $email, $address, $zip, $joined, $uuid)`,
        {
          $first: row['First Name'],
          $last: row['Last Name'],
          $middle: row['Middle Initial'],
          $email: row['Email'],
          $address: row['Street Address'],
          $zip: row['Zip Code'],
          $joined: row['Joined Date'],
          $uuid: row['UUID']
        },
        (err) => {
          if (err) {
            console.error('Insert', err);
          }  
          else {
            console.log('Succcesfully instered');
          }
        } 
      );
    });
    db.all('SELECT * FROM users', (err, data) => {
      console.log('');
      console.log('data', data);
    });
  });

  db.close((err) => {
    if (err) {
      console.error(err.message);
    }
    else {
      console.log('Close the database connection.');
    }
  });
};
