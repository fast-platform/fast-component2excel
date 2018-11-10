import stampit from '@stamp/it';
import BaseLayoutComponent from '../BaseLayoutComponent/BaseLayoutComponent';

export default stampit(BaseLayoutComponent, {
  methods: {
    render(sheet) {
      const r = sheet.range(this.position.range);

      r.style({fill: 'FCE4D6'}).forEach(this.setOutsideBorder);

      r.startCell().relativeCell(0, 1 + this.extraPadding / 2).value(this.label);
    }
  }
});
