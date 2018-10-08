import { getShape } from './util/getShape';
// import { buildShape } from './util/buildShape';
import ExcelBuilder from './plugins/ExcelBuilder';
import stampit from '@stamp/it';

export default stampit({
  methods: {
    async convertJsonToFile(json) {
      const shape = await getShape(json);

      console.log(shape);

      // calculateUsedRange()
      console.log(json);
      // const range = await buildShape(json, shape);
      const range = '';

      // console.log(range);

      const workbook = await this.toExcel(json, shape, range);

      return workbook;
    },

    async toExcel(json, shape, range) {
      const XlsxBuilder = ExcelBuilder({json, shape, range});
      const workbook = await XlsxBuilder.buildWorkbook();

      return workbook;
    }
  }
})();
