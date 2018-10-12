import stampit from '@stamp/it';

export default stampit({
  props: {
    cell: 'A1',
    label: '',
    labelPosition: 'top',
    value: ''
  },
  init({
    cell = this.cell,
    label = this.label,
    labelPosition = this.labelPosition,
    value = this.value
  }) {
    this.cell = cell;
    this.label = label;
    this.labelPosition = labelPosition;
    this.value = value;
  },
  statics: {
    baseWidth: 3,
    baseLength: 6
  }
});
