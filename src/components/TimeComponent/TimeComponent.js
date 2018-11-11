import stampit from '@stamp/it';
import NumberComponent from '../NumberComponent/NumberComponent';

export default stampit(NumberComponent, {
  init({component}) {
    this.format = component.format; // TO-DO transform moment.js format to excel format if possible
  },
  methods: {
    setFormat() {
      this.errorLabel = 'Not a time';
      this.inputField.value(new Date()).style('numberFormat', this.format + ';@');
    }
  }
});
