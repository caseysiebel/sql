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
      values += `('${ row[cols[0]] | null }', '${ row[cols[1]] | null}', '${ row[cols[2]] | null }', '${ row[cols[3]] | null }', '${ row[cols[4]] | null }', '${ row[cols[5]] | null }', '${ row[cols[6]] | null }', '${ row[cols[7]] | null }')`;
    }
    else {
      values += `('${ row[cols[0]] | null }', '${ row[cols[1]] | null}', '${ row[cols[2]] | null }', '${ row[cols[3]] | null }', '${ row[cols[4]] | null }', '${ row[cols[5]] | null }', '${ row[cols[6]] | null }', '${ row[cols[7]] | null }'), `;
    }
  })
  return [ cols.map(col => `'${col}'`) , values ];
}
