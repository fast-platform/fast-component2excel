import stampit from '@stamp/it';
import NumberComponent from '../NumberComponent/NumberComponent';

export default stampit(NumberComponent, {
  methods: {
    setFormat() {
      this.errorLabel = 'Not a currency number';
      this.inputField.style('numberFormat', '[$$-en-US]#,##0.0');
    }
  }
});
