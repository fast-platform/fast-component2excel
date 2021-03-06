import BaseLayoutComponent from '../components/BaseLayoutComponent/BaseLayoutComponent';
import sumArray from './sumArray';

function stretchInRatio(max, i, array) {
  const upper = max * array[i];

  const lower = sumArray(array);

  return (upper / lower) | 0;
}

export default function expandColumns(layout, maxCols) {
  for (const comp of layout) {
    comp.shape.cols = maxCols;

    if (comp.type === 'fieldset' | comp.type === 'panel' | comp.type === 'editgrid') {
      expandColumns(comp.components, maxCols - BaseLayoutComponent.marginLength);
    } else if (comp.type === 'datagrid') {
      const divisible = (maxCols - BaseLayoutComponent.marginLength) % comp.components.length;
      let length = maxCols - BaseLayoutComponent.marginLength;

      if (divisible !== 0) {
        comp.extraPadding = divisible;
        length = length - divisible;
      }
      expandColumns(comp.components, length / comp.components.length); // probablemente mismo problema
    } else if (comp.type === 'columns') {
      const divisible = (maxCols - BaseLayoutComponent.marginLength) % comp.columns.length;
      let length = maxCols - BaseLayoutComponent.marginLength;

      if (divisible !== 0) {
        comp.extraPadding = divisible;
        length = length - divisible;
      }

      expandColumns(comp.columns, length / comp.columns.length);
    } else if (comp.type === 'table') {
      for (const row of comp.rows) {
        const rowMax = [];
        let length = maxCols - BaseLayoutComponent.marginLength;
        // const divisible = length % row.length;

        // if (divisible !== 0) {
        //   comp.extraPadding = divisible;
        //   length = length - divisible;
        // }

        for (const [i, cell] of row.entries()) {
          const tableCols = stretchInRatio(length, i, comp.shape.ratios);

          expandColumns(cell.components, tableCols); // problema acá
          cell.shape.cols = cell.components.reduce((a, b) => Math.max(b.shape.cols, a), 0);
          cell.shape.rows = cell.components.reduce((a, b) => b.shape.rows + a, 0);
          cell.components.shape = {
            rows: cell.shape.rows,
            cols: cell.shape.cols
          };
          rowMax.push(cell.shape.rows);
        }
        const maxRows = Math.max(...rowMax);

        row.forEach(cell => {
          cell.shape.rows = maxRows;
        });
      }
    } else if (comp.hasOwnProperty('components')) {
      expandColumns(comp.components, maxCols);
    }
  }
};
