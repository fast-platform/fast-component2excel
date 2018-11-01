import stampit from '@stamp/it';
import TextFieldComponent from '../TextFieldComponent/TextFieldComponent';

export default stampit(TextFieldComponent, {
  methods: {
    setValidation() {
      const values = '"' + this.values.map(({value}) => value).toString() + '"';

      this.inputField.dataValidation({
        type: 'list',
        showErrorMessage: true,
        error: 'Must be a member of the list',
        errorTitle: 'Incorrect value',
        formula1: values
      });
    }
  }
});
