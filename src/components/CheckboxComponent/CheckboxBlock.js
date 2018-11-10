import stampit from '@stamp/it';
import BaseComponent from '../BaseComponent/BaseComponent';
import specialSaveInputField from '../../util/specialSaveInputField';
import { VARIABLES_NAME } from '../../plugins/JsonBuilder';

export default stampit(BaseComponent, specialSaveInputField, {
  props: {
    label: ''
  },
  statics: {
    baseWidth: 2,
    baseLength: 2
  },
  init({component, specialComponent}) {
    this.label = component.label;
    this.specialComponent = specialComponent;
    this.key = component.key;
  },
  methods: {
    render(sheet) {
      const values = '"' + 'TRUE,FALSE' + '"';

      const r = sheet.range(this.position.range);

      /**
       * Styling
       */
      r.forEach(this.setOutsideBorder);

      const selectStartCell = r.startCell();
      const selectEndCell = r.endCell().relativeCell(-1, 0);
      const selectRange = selectStartCell.rangeTo(selectEndCell);

      selectRange.merged(true)
        .style({fill: 'ffffff', horizontalAlignment: 'center'})
        .forEach(this.setOutsideBorder)
        .value(false)
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
        .style({fill: 'ffff00', horizontalAlignment: 'center'})
        .forEach(this.setOutsideBorder)
        .value(this.label);
      const workbook = sheet.workbook();

      if (!this.specialComponent) {

        workbook.definedName(this.key, selectRange);
        let previousData = JSON.parse(workbook.definedName(VARIABLES_NAME))[0];

        previousData[this.key] = this.key;
        const stringData = JSON.stringify([previousData]);

        workbook.definedName(VARIABLES_NAME, stringData);
      } else {
        this.specialSaveInputField(selectRange, this.key);
      }

    }
  }
});
