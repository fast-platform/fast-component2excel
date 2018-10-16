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

async function convertComponentToExcelCoord(component, previousComponent, parentComponent) {
  if (previousComponent === parentComponent) {
    if (previousComponent.type === 'form') {
      component.position = await positionBuilder(component, previousComponent, 'firstInForm');
    } else {
      component.position = await positionBuilder(component, previousComponent, 'firstInLayout');
    }
  } else {
    if (
      (parentComponent.type !== 'datagrid') &
      (parentComponent.type !== 'editgrid') &
      (parentComponent.type !== 'panel') &
      (parentComponent.type !== 'table')
    ) {
      component.position = await positionBuilder(component, previousComponent, 'below');
    }
  }

  if (
    (component.type === 'fieldset') |
    (component.type === 'datagrid') |
    (component.type === 'editgrid') |
    (component.type === 'panel')
  ) {
    previousComponent = component;
    for (const comp of component.components) {
      previousComponent = await convertComponentToExcelCoord(comp, previousComponent, component);
    }
  }
  return component;
}

export default async function convertLayoutToExcelCoord(layout) {
  layout.position = await positionBuilder(layout, {}, 'base');

  let previousComponent = layout;
  const parentComponent = layout;

  for (const comp of layout.components) {
    previousComponent = await convertComponentToExcelCoord(comp, previousComponent, parentComponent);
  }

  return layout;
}
