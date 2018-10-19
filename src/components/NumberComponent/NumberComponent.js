import stampit from '@stamp/it';
import BaseComponent from '../BaseComponent/BaseComponent';

export default stampit(BaseComponent, {
  methods: {
    render(sheet) {
      console.log('render NumberComponent', this.position);
    }
  }
});
