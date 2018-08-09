const columns = [
  'First Name',
  'Middle Initial',
  'Last Name',
  'Street Address',
  'Email',
  'Zip Code',
  'Joined Date',
  'UUID'
];

module.exports = (rows) => {
  let queryColumns = '';
  let values = '';
  const numRows = rows.length;
  rows.forEach((row, i) => {
    let rowValue = '';
    columns.forEach((column, j) => {
      if(row[column]) {
        rowValue += `'${ row[column] }'`;
        if (j !== columns.length - 1) {
          rowValue += ', ';
        }
        if (i === 0) {
          queryColumns += `'${ column }'`;
          if (j !== columns.length - 1) {
            queryColumns += ', ';
          }
        }
      }
    });
    values += `(${ rowValue })`;
    if (i !== numRows - 1) {
      values += ', ';
    }
  })
  return [ queryColumns, values ];
}
