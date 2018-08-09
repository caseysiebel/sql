const cols = [
  'First Name',
  'Middle Initial',
  'Last Name',
  'Street Address',
  'Email',
  'Zip Code',
  'Joined Date',
  'UUID'
];

let queryCols = '';

module.exports = (data) => {
  let columns;
  let values = '';
  let queryCols = '';
  const numRows = data.length;
  data.forEach((row, i) => {
    let rowValue = '';
    cols.forEach((col, j) => {
      if(row[col]) {
        rowValue += `'${ row[col] }'`;
        if (j !== cols.length - 1) {
          rowValue += ', ';
        }
        if (i === 0) {
          queryCols += col;
          if (j !== cols.length - 1) {
            queryCols += ', ';
          }
        }
      }
    })
    values += `(${ rowValue })`;
    if (i !== numRows - 1) {
      values += ', ';
    }
  })
  return [ queryCols,  values ];
}
