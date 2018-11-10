import stampit from '@stamp/it';
import BaseLayoutComponent from '../BaseLayoutComponent/BaseLayoutComponent';
import SelectComponent from '../SelectComponent/SelectComponent';

export default stampit(BaseLayoutComponent, {
  init({component}) {
    this.values = component.values;
    this.label = component.label;
    this.questions = component.questions;
  },
  methods: {
    render(sheet) {
      const r = sheet.range(this.position.range);

      r.forEach(this.setOutsideBorder).style({fill: 'BBF3CC'});
      r.startCell().relativeCell(0, 1).value(this.label);
      this.renderBlock(r);
    },
    renderBlock(range) {
      const sheet = range.sheet();
      let start = range.startCell().relativeCell(BaseLayoutComponent.marginWidth / 2,
        BaseLayoutComponent.marginLength / 2);
      const endColumn = range.endCell().columnNumber() + BaseLayoutComponent.marginLength / -2;
      let end = sheet.row(start.rowNumber() + BaseLayoutComponent.baseWidth - 1).cell(endColumn);

      this.questions.forEach(question => {
        const label = question.label;
        const value = question.value;
        const key = [this.key, value];
        const labelPosition = 'top';
        const radioRange = start.rangeTo(end).address();
        const position = {
          range: radioRange,
          col: start.columnNumber(),
          row: start.rowNumber()
        };
        const shape = {
          cols: end.columnNumber() - start.columnNumber() + 1,
          rows: end.rowNumber() - start.rowNumber() + 1
        };
        const component = {label, position, shape, key, values: this.values, labelPosition};

        SelectComponent({ component, specialComponent: true }).render(sheet);
        start = start.relativeCell(BaseLayoutComponent.baseWidth + 1, 0);
        end = sheet.row(start.rowNumber() + BaseLayoutComponent.baseWidth - 1).cell(endColumn);
      });
    }
  }
});
