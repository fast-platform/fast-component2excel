
const Field = require('../base/baseField');

class Email extends Field {
    constructor(type, key) {
        super(type, key);
        this.positionX = 0;
        this.positionY = 0;
    }
    updateValidator(validatorSheetArr) {
        this.validatorObj = this.getBaseValidator();
        let thisCell = this.getValueCellName();
        this.validatorObj['type'] = 'custom';
        this.validatorObj['formula1'] = '=ISNUMBER(MATCH("*@*.???",' + thisCell + ',0))';
        return validatorSheetArr;
    }
}
module.exports = Email;