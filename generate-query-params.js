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
    if (i === numRows - 1 || numRows === 1) {
      values += `('${ row[cols[0]] }', '${ row[cols[1]]}', '${ row[cols[2]] }', '${ row[cols[3]] }', '${ row[cols[4]] }', '${ row[cols[5]] }', '${ row[cols[6]] }', '${ row[cols[7]] }')`;
    }
    else {
      values += `('${ row[cols[0]] }', '${ row[cols[1]]}', '${ row[cols[2]] }', '${ row[cols[3]] }', '${ row[cols[4]] }', '${ row[cols[5]] }', '${ row[cols[6]] }', '${ row[cols[7]] }'), `;
    }
  })
  return [ cols.map(col => `'${col}'`) , values ];
}
