import stampit from '@stamp/it';
import BaseComponent from '../BaseComponent/BaseComponent';

export default stampit(BaseComponent, {
  props: {
    label: '',
    labelPosition: '',
    prefix: '',
    suffix: '',
    description: '',
    validate: {}
  },
  init({component}) {
    this.label = component.label;
    this.labelPosition = component.labelPosition;
    this.prefix = component.prefix;
    this.suffix = component.suffix;
    this.description = component.description;
    this.validate = component.validate;
  },
  methods: {
    render(sheet) {
      const r = sheet.range(this.position.range);

      console.log(r);

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
       * Styling
       */
      r.style({fill: 'E7E6E6'}).forEach(this.setOutsideBorder);

    },
    setDescription(r) {
      if (this.description) {
        r.startCell().relativeCell(this.shape.rows - 1, 1).value(this.description);
      }
    },
    setInputField(r) {
    },
    setPrefixSuffix(r) {
      let rowOffset = (this.description.length > 0 & this.labelPosition === 'bottom') ? 1 : 0;
      const rowPosition = ((this.shape.rows - 1) / 2);

      if (this.prefix) {
        r.startCell().relativeCell(rowPosition - rowOffset, 1).value(this.prefix);
      }

      if (this.suffix) {
        r.endCell().relativeCell(-(rowPosition + rowOffset), -1).value(this.suffix);
      }
    },
    setLabel(r) {
      switch (this.labelPosition) {
        case 'top':
          r.startCell().relativeCell(0, 1).value(this.label);
          break;

        case 'left-left':
          r.startCell().relativeCell((this.shape.rows - 1) / 2, 0).value(this.label);
          break;

        case 'left-right':
          r.startCell().relativeCell((this.shape.rows - 1) / 2, 0).value(this.label);
          break;

        case 'right-left':
          r.endCell().relativeCell(-((this.shape.rows - 1) / 2), 0).value(this.label);
          break;

        case 'right-right':
          r.endCell().relativeCell(-((this.shape.rows - 1) / 2), 0).value(this.label);
          break;

        case 'bottom':
          if (!this.description) {
            r.startCell().relativeCell(this.shape.rows - 1, 1).value(this.label);
          } else {
            r.startCell().relativeCell((this.shape.rows - 1) / 2, 1).value(this.label);
          }
          break;
      }
    }
  }
});
