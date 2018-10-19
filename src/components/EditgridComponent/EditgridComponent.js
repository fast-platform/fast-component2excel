import stampit from '@stamp/it';
import BaseLayoutComponent from '../BaseLayoutComponent/BaseLayoutComponent';

export default stampit(BaseLayoutComponent, {
  methods: {
    render(sheet) {
      console.log('render EditgridComponent', this.position);
    }
  }
});
