import buildLayout from './util/buildLayout';
import ExcelBuilder from './plugins/ExcelBuilder';
import stampit from '@stamp/it';

export default stampit({
  methods: {
    async convertJsonToFile(json) {
      const layout = await buildLayout(json);

      console.log(layout);

      const workbook = await this.toExcel(layout);

      return workbook;
    },

    async toExcel(layout) {
      const XlsxBuilder = ExcelBuilder({layout});
      const workbook = await XlsxBuilder.buildWorkbook();

      return workbook;
    }
  }
})();
