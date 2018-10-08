import rowsColsToExcel from './rowsColsToExcel';

export async function buildShape(tree, shape, structure = [], row = 0) {
  for (const comp of tree.components) {
    if (
      (comp.type !== 'datagrid') &
      (comp.type !== 'columns') &
      (comp.type !== 'table') &
      (comp.type !== 'editgrid') &
      (comp.type !== 'fieldset')) {
      structure.push({type: comp.type, range: rowsColsToExcel(row, shape)});
    } else {
      if (comp.type === 'fieldset') {
        structure.push({type: comp.type, children: await buildShape(comp)});
      }
    }
  }

  return structure;
};
