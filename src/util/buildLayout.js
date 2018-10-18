import { getShape } from './getShape';
import expandColumns from './expandColumns';
import convertLayoutToExcelCoord from './convertLayoutToExcelCoord';

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
      for (const col of comp.columns) {
        col.type = 'column';
      }
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

export default async function buildLayout(json) {
  let form = [];
  let layout = {};

  for (const comp of json.components) {
    if (comp.type === 'button') break;

    const shape = await getShape(comp);

    if (comp.hasOwnProperty('components')) {
      shape.components = await getComponents(comp.components);
    }

    if (comp.hasOwnProperty('columns')) {
      for (const col of comp.columns) {
        col.type = 'column';
      }
      shape.columns = await getComponents(comp.columns);
    }

    if (comp.type === 'table') {
      shape.rows = await getRowComponents(comp.rows);
    }

    form.push(shape);
  }

  layout = {...getDimensions(form), components: form};

  layout.type = 'form';

  await expandColumns(layout.components, layout.shape.cols);
  await convertLayoutToExcelCoord(layout);

  return layout;
}
