
const FieldDateTime = require('../base/baseFieldDateTime');

//everething after 1900 is converted and saved as daysCount, thus it's not a string but number
class Datetime extends FieldDateTime {
    constructor(type, key) {
        super(type, key);
        this.positionX = 0;
        this.positionY = 0
    }
    updateValidator(validatorSheetArr) {
        this.validatorObj = this.getBaseValidator();
        this.validatorObj['type'] = 'date';
        this.validatorObj['operator'] = 'notEqual';
        this.validatorObj['formula1'] = this.timeEpochExcel;
        return validatorSheetArr;
    }
    fixValueLocal(date) {
        return this.getYear(date) + '-' + this.getMonth(date) + '-' + this.getDay(date) + ' ' + this.getHours(date) + ':' + this.getMinutes(date);
    }
}
module.exports = Datetime;