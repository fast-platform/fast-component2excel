import BaseComponent from '../components/BaseComponent/BaseComponent';
import BaseLayoutComponent from '../components/BaseLayoutComponent/BaseLayoutComponent';

import isObject from './isObject';

function countColumnObjectCols(columns) {
  const columnCols = [];

  for (const col of columns) {
    columnCols.push(getColumns(col.components));
  }

  return sumArray(columnCols);
}

function countDatagridCols(tree) {
  const dataCols = [];

  for (const col of tree) {
    dataCols.push(getColumns(col));
  }

  return sumArray(dataCols);
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

function sumArray(array) {
  return array.reduce((a, b) => a + b, 0);
}

function checkType(comp, cols) {
  if (
    (comp.type !== 'table') &
    (comp.type !== 'columns') &
    (comp.type !== 'datagrid') &
    (comp.type !== 'editgrid') &
    (comp.type !== 'fieldset')
  ) {
    cols.push(BaseComponent.baseLength);
  } else {
    if (comp.type === 'fieldset') {
      cols.push(BaseLayoutComponent.paddingLength + getColumns(comp.components));
    } else if (comp.type === 'columns') {
      cols.push(BaseLayoutComponent.paddingLength + countColumnObjectCols(comp.columns));
    } else if (comp.type === 'editgrid') {
      console.log('editgrid', comp.components);
      cols.push(BaseLayoutComponent.paddingLength + getColumns(comp.components));
    } else if (comp.type === 'datagrid') {
      cols.push(BaseLayoutComponent.paddingLength + countDatagridCols(comp.components));
    } else if (comp.type === 'table') {
      cols.push(BaseLayoutComponent.paddingLength + countTableCols(comp.rows));
    } else {
      cols.push(getColumns(comp.components));
    }
  }

  return cols;
}

export function getColumns(tree, cols = []) {
  if (!isObject(tree)) {
    for (const comp of tree) {
      cols = checkType(comp, cols);
    }
  } else {
    cols = checkType(tree, cols);
  }

  return Math.max(...cols);
};
