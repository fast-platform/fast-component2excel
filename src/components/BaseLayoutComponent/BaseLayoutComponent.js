import stampit from '@stamp/it';
import BaseComponent from '../BaseComponent/BaseComponent';

export default stampit(BaseComponent, {
  statics: {
    marginWidth: 2,
    marginLength: 2
  },
  props: {
    extraPadding: 0,
    label: ''
  },
  init({component}) {
    this.extraPadding = component.extraPadding | this.extraPadding;
    this.label = component.label;
  },
  methods: {
    render() {
      console.log('render BaseLayoutComponent');
    }
  }
});
