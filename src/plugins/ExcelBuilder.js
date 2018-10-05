import stampit from '@stamp/it';
import XlsxPopulate from 'xlsx-populate';
import Download from 'fast-downloads';

const MIME_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';

export default stampit({
  init({json, shape, range}) {
    this.json = json;
    this.shape = shape;
    this.range = range;
  },
  methods: {
    async buildWorkbook() {
      XlsxPopulate.fromBlankAsync()
        .then(workbook => {
          // Modify the workbook.
          workbook.sheet('Sheet1').cell('A1').value('This is neat!');

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
    }
  }
});
