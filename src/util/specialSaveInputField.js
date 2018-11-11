import stampit from '@stamp/it';
import { VARIABLES_NAME } from '../plugins/JsonBuilder';

function getRandomID() {
  return 'ID' + (Math.random().toString(36) + '00000000000000000').slice(2, 13) +
    (Math.random().toString(36) + '00000000000000000').slice(2, 13);
}
export default stampit({
  methods: {
    specialSaveInputField(inputField, key) {
      const workbook = inputField.workbook();
      const ID = getRandomID();
      let previousData = JSON.parse(workbook.definedName(VARIABLES_NAME))[0];
      const parent = previousData[key[0]];
      let toSave = {};

      workbook.definedName(ID, inputField);

      if (parent) {
        toSave = parent;
      }

      previousData[key[0]] = {...toSave, [key[1]]: ID};

      const stringData = JSON.stringify([previousData]);

      workbook.definedName(VARIABLES_NAME, stringData);
    }
  }
});
