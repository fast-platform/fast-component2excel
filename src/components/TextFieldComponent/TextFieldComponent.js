import stampit from '@stamp/it';
import BaseComponent from '../BaseComponent/BaseComponent';

export default stampit(BaseComponent, {
  props: {
    label: '',
    labelPosition: '',
    prefix: '',
    suffix: '',
    description: '',
    errorLabel: 'Incorrect value.',
    inputField: {},
    validate: {}
  },
  init({component}) {
    if (component.description === undefined) component.description = '';
    this.label = component.label;
    this.labelPosition = component.labelPosition;
    this.prefix = component.prefix;
    this.suffix = component.suffix;
    this.description = component.description;
    this.errorLabel = component.errorLabel;
    this.validate = component.validate;
  },
  methods: {
    render(sheet) {
      const r = sheet.range(this.position.range);

      /**
       * Styling
       */
      r.style({fill: 'E7E6E6'}).forEach(this.setOutsideBorder);

      /**
       * Description
       */
      this.setDescription(r);

      /**
       * Label
       */
      this.setLabel(r);

      /**
       * Prefix and suffix
       */
      this.setPrefixSuffix(r);

      /**
       * Input field
       */
      this.setInputField(r);

      /**
       * format
       */
      this.setFormat();

      /**
       * Validation
       */
      this.setValidation();
    },
    setDescription(r) {
      if (this.description) {
        r.startCell().relativeCell(this.shape.rows - 1, 1).value(this.description);
      }
    },
    setInputField(r) {
      let colStartOffset = (this.prefix) ? 2 : 1;
      let colEndOffset = (this.suffix) ? 2 : 1;
      let rowStartOffset = (this.description.length > 0 & this.labelPosition === 'bottom') ? 0 : 1;
      let rowEndOffset = (this.description.length > 0 & this.labelPosition === 'bottom') ? 2 : 1;

      this.inputField = r.startCell().relativeCell(rowStartOffset, colStartOffset).rangeTo(
        r.endCell().relativeCell(-rowEndOffset, -colEndOffset)
      );

      this.inputField.merged(true).style({fill: 'ffffff', horizontalAlignment: 'left'}).forEach(this.setOutsideBorder);
      if (this.key) {
        const workbook = this.inputField.workbook();

        workbook.definedName(this.key, this.inputField);
      }
    },
    setPrefixSuffix(r) {
      let rowOffset = (this.description.length > 0 & this.labelPosition === 'bottom') ? 1 : 0;
      const rowPosition = ((this.shape.rows - 1) / 2);

      const style = {
        bold: true,
        horizontalAlignment: 'center',
        fill: 'F4B084',
        border: true
      };

      if (this.prefix) {
        r.startCell().relativeCell(rowPosition - rowOffset, 1).value(this.prefix)
          .style(style);
      }

      if (this.suffix) {
        r.endCell().relativeCell(-(rowPosition + rowOffset), -1).value(this.suffix)
          .style(style);
      }
    },
    setLabel(r) {
      switch (this.labelPosition) {
        case 'top':
          r.startCell().relativeCell(0, 1).value(this.label);
          break;

        case 'left-left':
          r.startCell().relativeCell((this.shape.rows - 1) / 2, 0).value(this.label)
            .style({horizontalAlignment: 'left'});
          break;

        case 'left-right':
          r.startCell().relativeCell((this.shape.rows - 1) / 2, 0).value(this.label)
            .style({horizontalAlignment: 'right'});
          break;

        case 'right-left':
          r.endCell().relativeCell(-((this.shape.rows - 1) / 2), 0).value(this.label)
            .style({horizontalAlignment: 'left'});
          break;

        case 'right-right':
          r.endCell().relativeCell(-((this.shape.rows - 1) / 2), 0).value(this.label)
            .style({horizontalAlignment: 'right'});
          break;

        case 'bottom':
          if (!this.description) {
            r.startCell().relativeCell(this.shape.rows - 1, 1).value(this.label);
          } else {
            r.startCell().relativeCell((this.shape.rows - 1) / 2, 1).value(this.label);
          }
          break;
      }
    },
    setValidation() {
    },
    setFormat() {
    }
  }
});
