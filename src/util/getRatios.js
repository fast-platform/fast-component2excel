// import BaseComponent from '../components/BaseComponent/BaseComponent';
// import BaseLayoutComponent from '../components/BaseLayoutComponent/BaseLayoutComponent';
// import isObject from './isObject';
import { getColumns } from './getColumns';

export function getRatios(comp, first = true) {
  if (
    (comp.type !== 'table') &
    (comp.type !== 'columns') &
    (comp.type !== 'datagrid')
  ) {
    return getColumns(comp);
  } else if (comp.type === 'table') {
    let maxs = [];

    for (let index = 0; index < comp.rows[0].length; index++) {
      const max = comp.rows.reduce((a, row) => Math.max(a, ...row[index].components.map(c => getColumns(c))), 0);

      maxs.push(max);
    }
    return maxs;
  }
  return [];
}
