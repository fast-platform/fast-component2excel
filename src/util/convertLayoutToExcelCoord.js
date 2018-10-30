import positionBuilder from './positionBuilder';

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
}

export function rangeStringFormatter(row1, col1, row2, col2) {
  return rowColToExcel(row1, col1) + ':' + rowColToExcel(row2, col2);
}

function convertComponentToExcelCoord(component, previousComponent, parentComponent, tableFirstInRow = false) {
  if (previousComponent === parentComponent) {
    if (previousComponent.type === 'form') {
      component.position = positionBuilder(component, previousComponent, 'firstInForm');
    } else {
      const style = (parentComponent.type === 'column') ?
        'firstInColumn' : 'firstInLayout';

      component.position = positionBuilder(component, previousComponent, style);
    }
  } else {
    if (
      (parentComponent.type !== 'datagrid') &
      (parentComponent.type !== 'columns') &
      (parentComponent.type !== 'panel') &
      (parentComponent.type !== 'table')
    ) {
      component.position = positionBuilder(component, previousComponent, 'below');
    } else if (parentComponent.type === 'datagrid') {
      component.position = positionBuilder(component, previousComponent, 'aside');
    } else if (parentComponent.type === 'columns') {
      component.position = positionBuilder(component, previousComponent, 'aside');
    } else if (parentComponent.type === 'table') {
      if (!tableFirstInRow) {
        component.position = positionBuilder(component, previousComponent, 'aside');
      } else {
        component.position = positionBuilder(component, previousComponent, 'firstInRow', parentComponent);
      }
    }
  }

  if (
    (component.type === 'fieldset') |
    (component.type === 'datagrid') |
    (component.type === 'editgrid') |
    (component.type === 'column') |
    (component.type === 'panel')
  ) {
    previousComponent = component;
    for (const comp of component.components) {
      previousComponent = convertComponentToExcelCoord(comp, previousComponent, component);
    }
  } else if (component.type === 'columns') {
    previousComponent = component;
    for (const col of component.columns) {
      previousComponent = convertComponentToExcelCoord(col, previousComponent, component);
    }
  } else if (component.type === 'table') {
    previousComponent = component;

    for (const row of component.rows) {
      tableFirstInRow = true;
      for (const cell of row) {
        cell.type = 'column';
        previousComponent = convertComponentToExcelCoord(cell, previousComponent, component, tableFirstInRow);
        tableFirstInRow = false;
      }
    }
  }
  return component;
}

export default async function convertLayoutToExcelCoord(layout) {
  layout.position = positionBuilder(layout, {}, 'base');

  let previousComponent = layout;
  const parentComponent = layout;

  for (const comp of layout.components) {
    previousComponent = convertComponentToExcelCoord(comp, previousComponent, parentComponent);
  }

  return layout;
}
