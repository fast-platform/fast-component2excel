function cols() {
  const ALPHABET = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P',
    'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

  console.log(ALPHABET);
}

function rows(row) {
  if (row === 0) {
    return row + 2;
  }

  return null;
}

export default function rowsColsToExcel(row, shape) {
  // const r = rows(row);
  // const c = cols(row);
};
