import buildLayout from './util/buildLayout';
import ExcelBuilder from './plugins/ExcelBuilder';
import XlsxPopulate from 'xlsx-populate';

import stampit from '@stamp/it';
import JsonBuilder from './plugins/JsonBuilder';

export default stampit({
  methods: {
    async convertJsonToFile(json) {
      const layout = buildLayout(json);

      console.log(layout);

      const workbook = await this.toExcel(layout);

      return workbook;
    },

    async toExcel(layout) {
      const XlsxBuilder = ExcelBuilder({layout});
      const workbook = await XlsxBuilder.buildWorkbook();

      return workbook;
    }
  },
  async convertExcelToJson(file) {
    const workbook = await XlsxPopulate.fromDataAsync(file);

    return JsonBuilder({ workbook }).main();
  }
})();
