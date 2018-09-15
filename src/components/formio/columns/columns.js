const BaseParentColumns = require('../base/baseParentColumns');

//no need to override SheetArr creation since we just stack 'rows' like in 'BaseParentList'
class Columns extends BaseParentColumns {
    constructor(type, key) {
        super(type, key);
        this.positionX = 0;
        this.positionY = 0;
    }
}
module.exports = Columns;