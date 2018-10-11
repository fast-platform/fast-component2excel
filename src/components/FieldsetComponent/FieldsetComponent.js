import stampit from '@stamp/it';
import BaseLayoutComponent from '../BaseLayoutComponent/BaseLayoutComponent';

export default stampit(BaseLayoutComponent, {
  methods: {
    render() {
      console.log('render FieldsetComponent');
    }
  }
});
