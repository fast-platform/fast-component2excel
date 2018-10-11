import { getRows } from './getRows';
import { getColumns } from './getColumns';

export async function getShape(json) {
  const components = json.type === 'form' ? json.components : json;

  let comps = [];

  if (json.type === 'form') {
    for (let comp of components) {
      if (comp.type !== 'button') {
        comps.push(comp);
      }
    }
  } else {
    comps = components;
  }

  const rowCount = getRows(comps);
  const colCount = getColumns(comps);

  return {
    'rows': rowCount,
    'cols': colCount
  };
}
