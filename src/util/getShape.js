import { getRows } from './getRows';
import { getColumns } from './getColumns';
import { getRatios } from './getRatios';

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

  const keyComp = 'components';
  const keyCols = 'columns';
  const keyRows = 'rows';

  const { [keyComp]: a, [keyCols]: b, [keyRows]: c, ...rest } = comps; // eslint-disable-line no-unused-vars

  const rowCount = getRows(comps);
  const colCount = getColumns(comps);
  const ratios = getRatios(comps);

  return {
    ...rest,
    shape: {
      rows: rowCount,
      cols: colCount,
      ratios
    }
  };
}
