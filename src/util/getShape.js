import { getRows } from './getRows';
import { getColumns } from './getColumns';

export async function getShape(json) {
  const components = json.components;

  let comps = [];

  for (let comp of components) {
    if (comp.type !== 'button') {
      comps.push(comp);
    }
  }

  const rowCount = getRows(comps);
  const colCount = getColumns(comps);

  return {
    'rows': rowCount,
    'cols': colCount
  };
}
