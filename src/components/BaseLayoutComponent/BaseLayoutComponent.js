import stampit from '@stamp/it';
import BaseComponent from '../BaseComponent/BaseComponent';

export default stampit(BaseComponent, {
  statics: {
    paddingWidth: 2,
    paddingLength: 2
  },
  methods: {
    render() {
      console.log('render BaseLayoutComponent');
    }
  }
});
