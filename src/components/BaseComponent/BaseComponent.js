import stampit from '@stamp/it';

export default stampit({
  props: {
    position: {}
  },
  init({component}) {
    this.position = component.position;
    this.shape = component.shape;
  },
  statics: {
    baseWidth: 3,
    baseLength: 6
  },
  methods: {
    render(sheet) {
      console.log('render baseComponent');
    },
    setOutsideBorder(...args) {
      const [cell, range] = [args[0], args[3]];

      cell.style('border', {
        top: (cell.rowNumber() === range._minRowNumber),
        bottom: (cell.rowNumber() === range._maxRowNumber),
        left: (cell.columnNumber() === range._minColumnNumber),
        right: (cell.columnNumber() === range._maxColumnNumber)
      });
    }
  }
});
