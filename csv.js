const csv = require('fast-csv');
let count = 0;
const rows = [];

csv
  .fromPath("data.csv", {headers: true})
  .on("data", function(data){
    //console.log(++count);

    console.log('-=========02-3-03e', data);
    rows.push(data);
    //console.log(data);
    //console.log('');
  })
  .on("end", function(){
    //console.log(rows);
    console.log('finished');
    console.log('');
  });


module.export = rows
console.log('rows', rows);
