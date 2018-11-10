import stampit from '@stamp/it';
import NumberComponent from '../NumberComponent/NumberComponent';

export default stampit(NumberComponent, {
  methods: {
    setFormat() {
      this.errorLabel = 'Not a number';
      this.inputField.style('numberFormat', '[<=9999999]###-####;(###) ###-####');
    }
  }
});
