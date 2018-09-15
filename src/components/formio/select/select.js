const FieldSelect = require('../base/baseFieldSelect');

class Select extends FieldSelect {
    constructor(typeIn, keyIn) {
        super(typeIn, keyIn);

        this.positionX = 0;
        this.positionY = 0;
    }
    getSheetArrLocal(isExport, validatorsSheetArr) {
        let replaceKeyWithLabel = true;
        return super.getSheetArrLocal(isExport, validatorsSheetArr, replaceKeyWithLabel);
    }
}
module.exports = Select;