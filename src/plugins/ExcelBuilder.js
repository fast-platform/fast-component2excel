import stampit from '@stamp/it';
import XlsxPopulate from 'xlsx-populate';
import Download from 'fast-downloads';

// import TextFieldComponent from '../components/TextFieldComponent/TextFieldComponent';

const MIME_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';

export default stampit({
  props: {
    json: {},
    shape: [],
    range: []
  },
  init({json = this.json, shape = this.shape, range = this.range}) {
    this.json = json;
    this.shape = shape;
    this.range = range;
  },
  methods: {
    async buildWorkbook() {
      XlsxPopulate.fromBlankAsync()
        .then(workbook => {
          const sheet = workbook.sheet(0);

          for (const comp of this.json.components) {
            this.renderComponent(comp, sheet);
          }
          // Modify the workbook.
          // workbook.sheet('Sheet1').cell('A1').value('This is neat!');

          // Write to file
          workbook.outputAsync().then((blob) => {
            Download.file({
              content: blob,
              fileName: 'out.xlsx',
              mimeType: MIME_TYPE
            }).then(() => {
              return true;
            });
          });
        });
    },
    renderComponent(c, sheet) {
      const value = [
        ['Label'],
        ['']
      ];

      sheet.cell('A1').value(value);

      return null;
    }
  }
});
