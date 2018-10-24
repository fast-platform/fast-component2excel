import BaseLayoutComponent from '../components/BaseLayoutComponent/BaseLayoutComponent';

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
      for (const row of comp.rows) {
        let length = maxCols - BaseLayoutComponent.marginLength;
        const divisible = length % row.length;

        if (divisible !== 0) {
          comp.extraPadding = divisible;
          length = length - divisible;
        }

        for (const cell of row) {
          await expandColumns(cell.components, length / row.length); // problema acá
        }
      }
    } else if (comp.hasOwnProperty('components')) {
      await expandColumns(comp.components, maxCols);
    }
  }
};
