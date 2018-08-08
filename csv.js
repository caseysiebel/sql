const insert = require('./connect');
const csv = require('fast-csv');
let count = 0;
const rows = [];

csv
  .fromPath("data.csv", {headers: true})
  .on("data", function(data){
    rows.push(data);
  })
  .on("end", function(){
    insert(rows);
  });
