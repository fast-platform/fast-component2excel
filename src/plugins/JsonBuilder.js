import stampit from '@stamp/it';

const VARIABLES_NAME = 'INPUT_DATA_FORMIO';

export { VARIABLES_NAME };

export default stampit({
  init({workbook}) {
    this.data = {};
    this.workbook = workbook;
    this.checkObject = this.checkObject.bind(this);
    this.recusiveCheck = this.recusiveCheck.bind(this);
  },
  methods: {
    checkObject(value) {
      return (typeof value === 'object');
    },
    recusiveCheck(object) {
      const { checkObject, recusiveCheck, workbook } = this;
      let data = {};

      for (let key in object) {
        if (checkObject(object[key])) {
          data[key] = recusiveCheck(object[key]);
        } else {
          data[key] = workbook.definedName(object[key]);
        }
      }
      return data;
    },
    buildJson(string) {
      const dataAddress = JSON.parse(string)[0];

      const data = this.recusiveCheck(dataAddress);

      return { data };
    },
    main() {
      const string = this.workbook.definedName(VARIABLES_NAME);

      return this.buildJson(string);
    }
  }
});
