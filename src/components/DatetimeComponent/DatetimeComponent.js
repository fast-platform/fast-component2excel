import stampit from '@stamp/it';
import NumberComponent from '../NumberComponent/NumberComponent';

export default stampit(NumberComponent, {
  methods: {
    setFormat() {
      this.errorLabel = 'Not a date';
      this.inputField.value(new Date()).style('numberFormat', 'm/d/yy h:mm;@');
    }
  }
});
