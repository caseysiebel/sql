const http = require('http');
const fs = require('fs');

const express = require('express');
const multer = require('multer');
const csv = require('fast-csv');

const Router = express.Router;
const upload = multer({ dest: 'tmp/csv/' });
const app = express();
const router = new Router();
const server = http.createServer(app);
const port = 9000;

const insertData = require('./insert-data');

const columns = [
  "First Name", 
  "Last Name", 
  "Middle Initial", 
  "Email TEXT",
  "Street Address",
  "Zip Code", 
  "Joined Date", 
  "UUID"
];

console.log(columns)

router.post('/', upload.single('users'), (req, res) => {
  const fileRows = [];

  const respondWithUsers = (users) => {
    res.json(users);
  };

  console.log('HELLO')
  csv.fromPath(req.file.path, { headers: true })
    .on("data", (data) => {
      console.log(data)
      console.log(typeof data)
      fileRows.push(data);
    })
    .on("end", () => {
      insertData(fileRows, respondWithUsers);
      fs.unlinkSync(req.file.path);
    });
});

app.use('/upload-users', router);

// Create database diectory
if(!fs.existsSync('./db')){
  fs.mkdirSync('./db');
}

server.listen(port, () => {
  console.log('Express server listening on', port);
});

