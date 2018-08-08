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
  console.log('-----------------', data)
  db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS users(${ users_schema })`, (err) => {
      if (err) {
        console.error(err);
      } 
      else {
        console.log('Created the table or it exists');
      }
    });
    db.run(
      `INSERT INTO users (${ users_schema }) VALUES ($first, $last, $middle, $email, $address, $zip, $joined, $uuid)`,
      {
        $first: data['First Name'],
        $last: data['Last Name'],
        $middle: data['Middle Initial'],
        $email: data['Email'],
        $address: data['Street Address'],
        $zip: data['Zip Code'],
        $joined: data['Joined Date'],
        $uuid: data['UUID']
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
