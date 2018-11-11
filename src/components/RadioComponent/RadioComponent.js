import stampit from '@stamp/it';
import SelectComponent from '../SelectComponent/SelectComponent';

export default stampit(SelectComponent, {
  init({component}) {
    this.values = component.values;
  }
});
