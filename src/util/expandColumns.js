import BaseLayoutComponent from '../components/BaseLayoutComponent/BaseLayoutComponent';

function stretchInRatio(max, i, array) {
  const upper = max * array[i];

  const lower = array.reduce((a, b) => a + b, 0);

  return (upper / lower) | 0;
}
export default async function expandColumns(layout, maxCols) {
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
      await expandColumns(comp.components, length / comp.components.length); // probablemente mismo problema
    } else if (comp.type === 'columns') {
      const divisible = (maxCols - BaseLayoutComponent.marginLength) % comp.columns.length;
      let length = maxCols - BaseLayoutComponent.marginLength;

      if (divisible !== 0) {
        comp.extraPadding = divisible;
        length = length - divisible;
      }

      await expandColumns(comp.columns, length / comp.columns.length); // probablemente mismo problema
    } else if (comp.type === 'table') {
      console.log(comp.shape.ratios);
      for (const row of comp.rows) {
        let length = maxCols - BaseLayoutComponent.marginLength;
        const divisible = length % row.length;

        if (divisible !== 0) {
          comp.extraPadding = divisible;
          length = length - divisible;
        }

        for (const [i, cell] of row.entries()) {
          await expandColumns(cell.components, stretchInRatio(length, i, comp.shape.ratios)); // problema acá
        }
      }
    } else if (comp.hasOwnProperty('components')) {
      await expandColumns(comp.components, maxCols);
    }
  }
};
