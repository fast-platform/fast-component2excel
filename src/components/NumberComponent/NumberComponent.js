import stampit from '@stamp/it';
import TextFieldComponent from '../TextFieldComponent/TextFieldComponent';

export default stampit(TextFieldComponent, {
  methods: {
    setValidation() {
      this.inputField.dataValidation({
        type: 'custom',
        showErrorMessage: true,
        error: this.errorLabel,
        errorTitle: 'Incorrect type of value',
        formula1: `ISNUMBER(${this.inputField.address()})`
      });

    }
  }
});
