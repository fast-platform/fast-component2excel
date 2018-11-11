import stampit from '@stamp/it';
import FieldsetComponent from '../FieldsetComponent/FieldsetComponent';

export default stampit(FieldsetComponent, {
  init({component}) {
    this.legend = null;
  }
});
