import BaseComponent from '../components/BaseComponent/BaseComponent';
import BaseLayoutComponent from '../components/BaseLayoutComponent/BaseLayoutComponent';
import CheckboxBlock from '../components/CheckboxComponent/CheckboxBlock';

import isObject from './isObject';
import sumArray from './sumArray';

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
      colsPerRow += getColumns(cell.components);
    }

    maxCols.push(colsPerRow);
  }

  return Math.max(...maxCols);
}

function checkType(comp, cols) {
  if (
    (comp.type !== 'table') &
    (comp.type !== 'columns') &
    (comp.type !== 'datagrid') &
    (comp.type !== 'editgrid') &
    (comp.type !== 'fieldset') &
    (comp.type !== 'checkbox') &
    (comp.type !== 'selectboxes')
  ) {
    cols.push(BaseComponent.baseLength);
  } else {
    if (comp.type === 'fieldset') {
      cols.push(BaseLayoutComponent.marginLength + getColumns(comp.components));
    } else if (comp.type === 'columns') {
      cols.push(BaseLayoutComponent.marginLength + countColumnObjectCols(comp.columns));
    } else if (comp.type === 'editgrid') {
      cols.push(BaseLayoutComponent.marginLength + getColumns(comp.components));
    } else if (comp.type === 'datagrid') {
      cols.push(BaseLayoutComponent.marginLength + countDatagridCols(comp.components));
    } else if (comp.type === 'table') {
      cols.push(BaseLayoutComponent.marginLength + countTableCols(comp.rows));
    } else if (comp.type === 'checkbox') {
      cols.push(BaseLayoutComponent.marginLength + CheckboxBlock.baseLength);
    } else if (comp.type === 'selectboxes') {
      cols.push(BaseLayoutComponent.marginLength + comp.values.length * CheckboxBlock.baseLength);
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
