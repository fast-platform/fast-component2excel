import stampit from '@stamp/it';
import NumberComponent from '../NumberComponent/NumberComponent';

export default stampit(NumberComponent, {
  init({component}) {
    this.format = component.format;
  },
  methods: {
    setFormat() {
      this.errorLabel = 'Not a time';
      this.inputField.value(new Date()).style('numberFormat', this.format + ';@');
    }
  }
});
