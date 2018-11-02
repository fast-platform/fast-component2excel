import stampit from '@stamp/it';
import BaseLayoutComponent from '../BaseLayoutComponent/BaseLayoutComponent';
import CheckboxBlock from '../CheckboxComponent/CheckboxBlock';

export default stampit(BaseLayoutComponent, {
  init({component}) {
    this.values = component.values;
  },
  methods: {
    render(sheet) {
      const r = sheet.range(this.position.range);

      r.forEach(this.setOutsideBorder).style({fill: 'E7E6E6'});
      this.calculateCells(r);
    },
    calculateCells(r) {
      const sheet = r.sheet();
      const start = r.startCell().relativeCell(CheckboxBlock.baseWidth / 2, CheckboxBlock.baseLength / 2);
      const end = r.endCell().relativeCell(CheckboxBlock.baseWidth / -2, CheckboxBlock.baseLength / -2);
      const maxCols = end.columnNumber() - start.columnNumber() + 1;
      let length = maxCols;
      const divisible = length % this.values.length;

      length = length - divisible;

      length = length / this.values.length;
      let cell = start;

      this.values.forEach(value => {
        this.renderBlock(length, sheet, cell, value);
        cell = cell.relativeCell(0, length);
      });

    },
    renderBlock(length, sheet, cell, value) {
      const start = cell;
      const end = cell.relativeCell(1, length - 1);
      const range = start.rangeTo(end);
      const cols = length;
      const rows = 4;
      const shape = {cols, rows};
      const label = value.label;
      const position = {
        range: range.address(),
        col: start.columnNumber(),
        row: start.rowNumber()
      };
      const component = {label, position, shape};

      CheckboxBlock({ component }).render(sheet);
    }
  }
});
