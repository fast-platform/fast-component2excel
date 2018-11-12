import stampit from '@stamp/it';
import XlsxPopulate from 'xlsx-populate';
import Download from 'fast-downloads';

// import TextFieldComponent from '../components/TextFieldComponent/TextFieldComponent';
import ComponentFactory from '../components/ComponentFactory';
import { VARIABLES_NAME } from './JsonBuilder';

const MIME_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';

export default stampit({
  props: {
    layout: {}
  },
  init({layout = this.layout}) {
    this.layout = layout;
    this.renderComponent = this.renderComponent.bind(this);
    this.renderChildrens = this.renderChildrens.bind(this);
  },
  methods: {
    async buildWorkbook() {
      const workbook = await XlsxPopulate.fromBlankAsync();

      workbook.definedName(VARIABLES_NAME, JSON.stringify([{}]));
      const sheet = workbook.sheet(0).name('Form').gridLinesVisible(false);

      for (const comp of this.layout.components) {
        this.renderComponent(comp, sheet);
      }

      // Write to file
      const blob = await workbook.outputAsync();

      await Download.file({
        content: blob,
        fileName: 'form.xlsx',
        mimeType: MIME_TYPE
      });
      return true;
    },
    renderComponent(comp, sheet) {
      ComponentFactory(comp).render(sheet);
      this.renderChildrens(comp, sheet);
    },
    renderChildrens(component, sheet) {
      if (component.type === 'table') {
        component.rows.forEach(columns => columns.forEach(cell => {
          cell.components.forEach(comp => this.renderComponent(comp, sheet));
        }));
      } else if (component.type === 'fieldset' | component.type === 'panel') {
        component.components.forEach(comp => this.renderComponent(comp, sheet));
      } else if (component.type === 'columns') {
        component.columns.forEach(column => column.components.forEach(comp => {
          this.renderComponent(comp, sheet);
        }));
      }
    }
  }
});
