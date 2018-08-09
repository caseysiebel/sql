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

const insert = require('./connect');

router.post('/', upload.single('users'), (req, res) => {
  const fileRows = [];

  const respondWithUsers = (users) => {
    res.json(users);
  };

  csv.fromPath(req.file.path)
    .on("data", (data) => {
      fileRows.push(data);
    })
    .on("end", () => {
      insert(fileRows, respondWithUsers);
      fs.unlinkSync(req.file.path);
    });
});

app.use('/upload-users', router);

if(!fs.existsSync('./db')){
  fs.mkdirSync('./db');
}

server.listen(port, () => {
  console.log('Express server listening on', port);
});

