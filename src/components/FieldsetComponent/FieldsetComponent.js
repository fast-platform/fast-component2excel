import stampit from '@stamp/it';
import BaseLayoutComponent from '../BaseLayoutComponent/BaseLayoutComponent';

export default stampit(BaseLayoutComponent, {
  props: {
    legend: ''
  },
  init({component}) {
    this.legend = component.legend;
  },
  methods: {
    render(sheet) {
      const r = sheet.range(this.position.range);

      r.startCell().relativeCell(0, 1).value(this.legend);

      r.forEach(this.setOutsideBorder).style({fill: 'DDEBF7'});
    }
  }
});
