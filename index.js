'use strict';

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
const port = 9000

const insert = require('./connect');

router.post('/', upload.single('file'), (req, res) => {
  const fileRows = [];

  csv.fromPath(req.file.path)
    .on("data", (data) => {
      fileRows.push(data);
    })
    .on("end", () => {
      insert(fileRows);
      fs.unlinkSync(req.file.path);
      res.end();
    })
});

app.use('/upload-csv', router);

function startServer() {
  server.listen(port, () => {
    console.log('Express server listening on ', port);
    console.log('')
  });
}

setImmediate(startServer);
