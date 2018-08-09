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

module.exports = (data) => {
  let columns;
  let values = '';
  const numRows = data.length;
  data.forEach((row, i) => {
    let rowValue = '';
    cols.forEach((col, j) => {
      rowValue += `${ `'${ row[col] }'` || null }`;
      if (j !== cols.length - 1) {
        rowValue += ', ';
      }
    })
    values += `(${ rowValue })`;
    if (i !== numRows - 1 && numRows !== 1) {
      values += ', ';
    }
  })
  return [ cols.map(col => `'${col}'`) , values ];
}
