import stampit from '@stamp/it';
import BaseComponent from '../BaseComponent/BaseComponent';

export default stampit(BaseComponent, {
  statics: {
    marginWidth: 2,
    marginLength: 2
  },
  methods: {
    render() {
      console.log('render BaseLayoutComponent');
    }
  }
});
