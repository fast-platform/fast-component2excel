function countColumnObjectRows(columns) {
  let columnRows = [];

  for (const column of columns) {
    columnRows.push(getRows(column.components, 0));
  }

  return Math.max(...columnRows);
}

export function getRows(tree, rows) {
  for (const comp of tree) {
    console.log(comp);
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
        rows = rows + comp.numRows;
      } else if (comp.type === 'fieldset') {
        rows = getRows(comp.components, rows);
      } else {
        rows = getRows(comp.components, rows);
      }
    }
  }

  return rows;
}
