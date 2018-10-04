function countColumnObjectRows(columns) {
  let columnRows = [];

  for (const column of columns) {
    columnRows.push(getRows(column.components, 0));
  }

  return Math.max(...columnRows);
}

function countTableObjectRows(rows) {
  console.log('rows', rows);

  const tableRows = [];

  for (const row of rows) {
    const rowMax = [];

    for (const cell of row) {
      if (cell.components.length > 0) {
        rowMax.push(getRows(cell.components, 0));
      } else {
        rowMax.push(0);
      }
    }

    console.log('row', rowMax);

    tableRows.push(Math.max(...rowMax));
    console.log('max', tableRows);
  }

  console.log('reduced sum', tableRows.reduce((a, b) => a + b, 0));

  return tableRows.reduce((a, b) => a + b, 0);
}

export function getRows(tree, rows) {
  for (const comp of tree) {
    console.log(comp.type);
    if (
      (comp.type !== 'datagrid') &
      (comp.type !== 'columns') &
      (comp.type !== 'table') &
      (comp.type !== 'editgrid') &
      (comp.type !== 'fieldset')
    ) {
      rows = rows + 1;
    } else {
      if (comp.type === 'datagrid' || comp.type === 'editgrid') {
        rows = rows + 1;
      } else if (comp.type === 'columns') {
        rows = rows + countColumnObjectRows(comp.columns);
      } else if (comp.type === 'table') {
        // rows = rows + comp.numRows;
        rows = rows + countTableObjectRows(comp.rows);
      } else if (comp.type === 'fieldset') {
        rows = getRows(comp.components, rows);
      } else {
        rows = getRows(comp.components, rows);
      }
    }
  }

  return rows;
}
