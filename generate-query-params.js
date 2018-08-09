module.exports = (data) => {
  let columns;
  let values = '';
  data.forEach((row, i) => {
    const rowStr = `'${ row.join(`', '`) }'`;
    if (i === 0) {
      columns = rowStr;
    } 
    else if (i === data.length - 1){
      values += `(${rowStr})`
    }
    else {
      values += `(${rowStr}), `
    }
  });
  return [ columns, values ];
}
