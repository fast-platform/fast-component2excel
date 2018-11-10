import stampit from '@stamp/it';
import TextFieldComponent from '../TextFieldComponent/TextFieldComponent';

export default stampit(TextFieldComponent, {
  methods: {
    setValidation() {
      const address = this.inputField.address();

      if (this.errorLabel == null) this.errorLabel = 'Must be a correct email address';
      this.inputField.dataValidation({
        type: 'custom',
        showErrorMessage: true,
        error: this.errorLabel,
        errorTitle: 'Incorrect type of value',
        formula1: `AND(ISNUMBER(SEARCH("@",${address})),ISNUMBER(SEARCH(".",${address})))`
      });

    }
  }
});
