import stampit from '@stamp/it';
import TextFieldComponent from '../TextFieldComponent/TextFieldComponent';
import specialSaveInputField from '../../util/specialSaveInputField';

export default stampit(TextFieldComponent, specialSaveInputField, {
  init({component}) {
    this.values = component.data && component.data.values;
  },
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
      if (this.specialComponent) {
        this.specialSaveInputField(this.inputField, this.key);
      }
    }
  }
});
