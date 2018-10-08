import stampit from '@stamp/it';
import BaseComponent from '../BaseComponent/BaseComponent';

export default stampit(BaseComponent, {
  methods: {
    render() {
      console.log('render TextFieldComponent');
    }
  }
});
