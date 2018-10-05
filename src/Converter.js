import { getShape } from './util/getShape';
import ExcelBuilder from './plugins/ExcelBuilder';
import stampit from '@stamp/it';

export default stampit({
  methods: {
    async convertJsonToFile(json) {
      const shape = getShape(json);

      // calculateUsedRange()
      const range = '';

      console.log('calling this.toExcel');
      const workbook = await this.toExcel(json, shape, range);

      return workbook;
    },

    async toExcel(json, shape, range) {
      console.log('toExcel', json);
      const XlsxBuilder = ExcelBuilder({json, shape, range});
      const workbook = await XlsxBuilder.buildWorkbook();

      return workbook;
    }
  }
})();
