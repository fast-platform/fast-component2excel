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

function rangeStringFormatter(row1, col1, row2, col2) {
  return rowColToExcel(row1, col1) + ':' + rowColToExcel(row2, col2);
}

async function convertComponentToExcelCoord(component, previousComponent, parentComponent) {
  if (previousComponent === parentComponent) {
    console.log(parentComponent);

    component.position = {
      row: previousComponent.position.row,
      col: previousComponent.position.col,
      range: rangeStringFormatter(
        previousComponent.position.row,
        previousComponent.position.col,
        component.shape.rows,
        component.shape.cols
      )
    };
  } else {
    if (
      (parentComponent.type !== 'fieldset') &
      (parentComponent.type !== 'datagrid') &
      (parentComponent.type !== 'editgrid') &
      (parentComponent.type !== 'panel') &
      (parentComponent.type !== 'table')
    ) {
      component.position = {
        row: previousComponent.position.row + previousComponent.shape.rows,
        col: previousComponent.position.col,
        range: rangeStringFormatter(
          previousComponent.position.row + previousComponent.shape.rows,
          previousComponent.position.col,
          previousComponent.position.row + previousComponent.shape.rows + component.shape.rows - 1,
          component.shape.cols
        )
      };
    }
  }

  return component;
}

export default async function convertLayoutToExcelCoord(layout) {
  layout.position = {
    row: 1,
    col: 1,
    range: rangeStringFormatter(1, 1, layout.shape.rows, layout.shape.cols)
  };

  let previousComponent = layout;
  const parentComponent = layout;

  for (const comp of layout.components) {
    previousComponent = await convertComponentToExcelCoord(comp, previousComponent, parentComponent);
  }

  console.log(layout);

  return layout;
}
