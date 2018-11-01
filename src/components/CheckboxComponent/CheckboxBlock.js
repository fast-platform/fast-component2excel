import stampit from '@stamp/it';
import BaseComponent from '../BaseComponent/BaseComponent';

export default stampit(BaseComponent, {
  props: {
    label: ''
  },
  statics: {
    baseWidth: 2,
    baseLength: 2
  },
  init({component}) {
    console.log(component);
    this.label = component.label;
  },
  methods: {
    render(sheet) {
      const values = '"' + '    X    ,    O    ' + '"';

      const r = sheet.range(this.position.range);

      /**
       * Styling
       */
      r.forEach(this.setOutsideBorder);

      const selectStartCell = r.startCell();
      const selectEndCell = r.endCell().relativeCell(-1, 0);
      const selectRange = selectStartCell.rangeTo(selectEndCell);

      selectRange.merged(true)
        .style({fill: 'ffff00', horizontalAlignment: 'center'})
        .forEach(this.setOutsideBorder)
        .value('    O    ')
        .dataValidation({
          type: 'list',
          showErrorMessage: true,
          error: 'Must be a member of the list',
          errorTitle: 'Incorrect value',
          formula1: values
        });

      const labelStartCell = selectStartCell.relativeCell(1, 0);
      const labelEndCell = selectEndCell.relativeCell(1, 0);
      const labelRange = labelStartCell.rangeTo(labelEndCell);

      labelRange.merged(true)
        .style({fill: 'ffffff', horizontalAlignment: 'center'})
        .forEach(this.setOutsideBorder)
        .value(this.label);
    }
  }
});
