import { getRows } from './getRows';
import { getColumns } from './getColumns';

export function getShape(json) {
  const components = json.components;

  let comps = [];

  for (let comp of components) {
    if (comp.type !== 'button') {
      comps.push(comp);
    }
  }

  console.log(comps);

  const rowCount = getRows(comps, 0);
  const colCount = getColumns();

  console.log(comps, rowCount, colCount);
}
