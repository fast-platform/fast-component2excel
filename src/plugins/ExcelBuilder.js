import stampit from '@stamp/it';
import XlsxPopulate from 'xlsx-populate';
import Download from 'fast-downloads';

// import TextFieldComponent from '../components/TextFieldComponent/TextFieldComponent';
import ComponentFactory from '../components/ComponentFactory';

const MIME_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';

export default stampit({
  props: {
    layout: {}
  },
  init({layout = this.layout}) {
    this.layout = layout;
    this.renderComponent = this.renderComponent.bind(this);
  },
  methods: {
    async buildWorkbook() {
      XlsxPopulate.fromBlankAsync()
        .then(workbook => {
          const sheet = workbook.sheet(0);

          for (const comp of this.layout.components) {
            this.renderComponent(comp, sheet);
          }
          // Modify the workbook.
          // workbook.sheet('Sheet1').cell('A1').value('This is neat!');

          // Write to file
          workbook.outputAsync().then((blob) => {
            Download.file({
              content: blob,
              fileName: 'form.xlsx',
              mimeType: MIME_TYPE
            }).then(() => {
              return true;
            });
          });
        });
    },
    renderComponent(comp, sheet) {
      ComponentFactory(comp).render(sheet);
      this.hasChildrens(comp, sheet);
    },
    hasChildrens(component, sheet) {
      if (component.type === 'table') {
        component.rows.forEach(columns => columns.forEach(cell => {
          cell.components.forEach(comp => this.renderComponent(comp, sheet));
        }));

      }
    }
  }
});
