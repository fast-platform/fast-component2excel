import { getShape } from './getShape';
import BaseLayoutComponent from '../components/BaseLayoutComponent/BaseLayoutComponent';
import convertLayoutToExcel from './convertLayoutToExcel';

function getDimensions(layout) {
  return {
    shape: {
      rows: layout.reduce((a, b) => a + b.shape.rows, 0),
      cols: Math.max.apply(Math, layout.map((o) => o.shape.cols))
    }
  };
}

async function getComponents(components) {
  const array = [];

  for (const comp of components) {
    const shape = await getShape(comp);

    if (comp.hasOwnProperty('components')) {
      shape.components = await getComponents(comp.components);
    }

    if (comp.hasOwnProperty('columns')) {
      shape.columns = await getComponents(comp.columns);
    }

    if (comp.type === 'table') {
      shape.rows = await getRowComponents(comp.rows);
    }

    array.push(shape);
  }

  return array;
}

async function getRowComponents(rows) {
  const calculatedRows = [];

  for (const row of rows) {
    calculatedRows.push(await getComponents(row));
  }

  return calculatedRows;
}

async function expandColumns(layout, maxCols) {
  for (const comp of layout) {
    comp.shape.cols = maxCols;

    if (comp.type === 'fieldset' | comp.type === 'panel' | comp.type === 'editgrid') {
      await expandColumns(comp.components, maxCols - BaseLayoutComponent.marginLength);
    } else if (comp.type === 'datagrid') {
      const divisible = (maxCols - BaseLayoutComponent.marginLength) % comp.components.length;
      let length = maxCols - BaseLayoutComponent.marginLength;

      if (divisible !== 0) {
        comp.extraPadding = divisible;
        length = length - divisible;
      }
      await expandColumns(comp.components, length / comp.components.length);
    } else if (comp.type === 'columns') {
      const divisible = (maxCols - BaseLayoutComponent.marginLength) % comp.columns.length;
      let length = maxCols - BaseLayoutComponent.marginLength;

      if (divisible !== 0) {
        comp.extraPadding = divisible;
        length = length - divisible;
      }

      await expandColumns(comp.columns, length / comp.columns.length);
    } else if (comp.type === 'table') {
      console.log(maxCols);
      for (const row of comp.rows) {
        const divisible = (maxCols - BaseLayoutComponent.marginLength) % row.length;
        let length = maxCols - BaseLayoutComponent.marginLength;

        if (divisible !== 0) {
          comp.extraPadding = divisible;
          length = length - divisible;
        }

        for (const cell of row) {
          // console.log(cell.components);
          await expandColumns(cell.components, length / row.length);
        }
      }
    } else if (comp.hasOwnProperty('components')) {
      await expandColumns(comp.components, maxCols);
    }
  }
}

export default async function buildLayout(json) {
  let form = [];
  let layout = {};

  for (const comp of json.components) {
    const shape = await getShape(comp);

    if (comp.hasOwnProperty('components')) {
      shape.components = await getComponents(comp.components);
    }

    if (comp.hasOwnProperty('columns')) {
      shape.columns = await getComponents(comp.columns);
    }

    if (comp.type === 'table') {
      shape.rows = await getRowComponents(comp.rows);
    }

    form.push(shape);
  }

  layout = {...getDimensions(form), components: form};

  await expandColumns(layout.components, layout.shape.cols);
  await convertLayoutToExcel(layout);

  return layout;
}
