import stampit from '@stamp/it';
import NumberComponent from '../NumberComponent/NumberComponent';

export default stampit(NumberComponent, {
  methods: {
    setFormat() {
      this.inputField.value(new Date()).style('numberFormat', 'm/d/yy h:mm;@');
    }
  }
});
