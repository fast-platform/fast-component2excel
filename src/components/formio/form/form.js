const BaseParentList = require('../base/baseParentList');

class Form extends BaseParentList {
    constructor(typeIn, keyIn) {
        super(typeIn, keyIn);
        this.validatorsSheetArr = null;
        this.useTitleUnder = 'title';
        this.hasTitle = true;
    }
}
module.exports = Form;