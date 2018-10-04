function countColumnObjectCols(columns) {
  const columnCols = [];

  for (const col of columns) {
    columnCols.push(getColumns(col.components));
  }

  return columnCols.reduce((a, b) => a + b, 0);
}

function countTableCols(rows) {
  const maxCols = [];

  for (const row of rows) {
    let colsPerRow = 0;

    for (const cell of row) {
      colsPerRow = colsPerRow + getColumns(cell.components);
    }

    maxCols.push(colsPerRow);
  }

  return Math.max(...maxCols);
}

export function getColumns(tree) {
  const cols = [];

  for (const comp of tree) {
    if (
      (comp.type !== 'table') &
      (comp.type !== 'columns') &
      (comp.type !== 'datagrid') &
      (comp.type !== 'editgrid') &
      (comp.type !== 'fieldset')
    ) {
      cols.push(1);
    } else {
      if (comp.type === 'fieldset') {
        cols.push(getColumns(comp.components));
      } else if (comp.type === 'columns') {
        cols.push(countColumnObjectCols(comp.columns));
      } else if (comp.type === 'editgrid') {
        cols.push(getColumns(comp.components));
      } else if (comp.type === 'datagrid') {
        cols.push(getColumns(comp.components));
      } else if (comp.type === 'table') {
        cols.push(countTableCols(comp.rows));
      } else {
        cols.push(getColumns(comp.components));
      }
    }
  }

  return Math.max(...cols);
};
