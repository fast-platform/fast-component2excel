import stampit from '@stamp/it';
import TextFieldComponent from '../TextFieldComponent/TextFieldComponent';

export default stampit(TextFieldComponent, {
  methods: {
    setFormat() {
      this.inputField.style('numberFormat', ';;;**');
    }
  }
});
