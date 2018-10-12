function toColumnName(num) {
  let final = '';

  for (let ret = '', a = 1, b = 26; (num -= a) >= 0; a = b, b *= 26) {
    ret = String.fromCharCode(parseInt((num % b) / a, 10) + 65) + ret;
    final = ret;
  }

  return final;
}

function rowColToExcel(row, col) {
  return String(toColumnName(col + 1)) + String(row + 1);
};

function rangeStringFormatter(row1, col1, row2, col2) {
  return (
    rowColToExcel(row1, col1) +
    ':' +
    rowColToExcel(row2, col2)
  );
}

export default async function convertLayoutToExcel(layout) {
  layout.position = {
    row: 1,
    col: 1,
    range: rangeStringFormatter(1, 1, layout.shape.rows, layout.shape.cols)
  };

  return layout;
};
